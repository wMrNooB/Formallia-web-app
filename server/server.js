import express from 'express'; 
import mysql from 'mysql2';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database.');
});


app.post('/register', async (req, res) => {
    const { username, email, password, confirmPassword} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword],
            (err, results) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Database error' });
                }
                const userId = results.insertId;
                res.status(201).json({ 
                    message: 'User registered successfully', 
                    userId, 
                    username 
                });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
  }

  try {
      db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
          if (err || results.length === 0) {
              return res.status(401).json({ error: 'Invalid credentials' });
          }

          const user = results[0];
          const isMatch = await bcrypt.compare(password, user.password);
          if (!isMatch) {
              return res.status(401).json({ error: 'Invalid credentials' });
          }

          res.json({ message: 'Login successful', userId: user.id, username: user.username });
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


const checkUserLoggedIn = (req, res, next) => {
    const { userId } = req.body;
    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized. Please log in.' });
    }
    next();
};

app.post('/cart/add', checkUserLoggedIn, (req, res) => {
    const { userId, productId, quantity } = req.body;

    if (!productId || !quantity) {
        return res.status(400).json({ error: 'Product ID and quantity are required' });
    }

    const query = `
      INSERT INTO cart (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + ?
    `;

    db.query(query, [userId, productId, quantity, quantity], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database error' });
        }

        res.status(200).json({ message: 'Product added to cart successfully' });
    });
});
  

app.delete('/cart/:userId/product/:productId', async (req, res) => {
    const { userId, productId } = req.params;
    
    try {
      const result = await db.execute(
        'DELETE FROM Cart WHERE user_id = ? AND product_id = ?', 
        [userId, productId]
      );
  
      res.status(200).json({ message: 'Product removed from cart' });
    } catch (error) {
      console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  });
  
  

  app.get('/cart/:userId', (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    const query = `
        SELECT 
            products.id, 
            products.name, 
            products.price, 
            products.image, 
            products.color,
            cart.quantity 
        FROM cart 
        JOIN products 
        ON cart.product_id = products.id 
        WHERE cart.user_id = ?`;

    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Failed to fetch cart items" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Cart is empty" });
        }

        res.status(200).json(results);
    });
});



app.get('/products', (req, res) => {
    const q = "SELECT * FROM products";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const q = `SELECT p.id, p.name, p.description, p.price,p.fabricCare, p.color, p.image, pi.image_url
               FROM products p
               LEFT JOIN product_images pi ON p.id = pi.product_id
               WHERE p.id = ?`;

    db.query(q, [productId], (err, data) => {
        if (err) return res.json(err);
        if (data.length === 0) return res.status(404).json({ message: "Product not found" });

        res.json({
            product: data[0],
            images: data.map(item => item.image_url)
        });
    });
});

app.get('/trending', (req, res) => {
    const q = "SELECT * FROM products WHERE trending IS NOT NULL";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});

app.get('/sale', (req, res) => {
    const q = "SELECT * FROM products WHERE discount IS NOT NULL";
    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);
        return res.json(data);
    });
});
app.get('/categories', (req, res) => {
    const q = "SELECT * FROM categories";
    db.query(q, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
app.get('/category/:id', (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT * 
        FROM products 
        WHERE category_id = ?`;

    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Server error' });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No products found for this category' });
        }

        res.status(200).json(results);
    });
});



app.get('/', (req, res) => {
    res.send('Server is running! Images can be accessed at /uploads');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
