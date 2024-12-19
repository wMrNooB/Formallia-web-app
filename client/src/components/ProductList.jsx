import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import ProductCard from "./ProductCard";
import axios from 'axios';


const ProductList = () => {
  const { id } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        if (location.pathname.startsWith('/category') && id) {
          response = await axios.get(`http://localhost:3000/category/${id}`);
        } else if (location.pathname === '/products') {
          response = await axios.get(`http://localhost:3000/products`);
        }else if (location.pathname === '/trending') {
          response = await axios.get(`http://localhost:3000/trending`);
        } else if (location.pathname === '/sale') {
          response = await axios.get(`http://localhost:3000/sale`);
        }
        setProducts(response?.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products.");
      }
    };

    fetchProducts();
  }, [id, location.pathname]);
  

      return (
        <div className="max-w-7xl mx-auto px-2 my-8 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-20 gap-y-10 justify-items-center">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      );
    };
export default ProductList;
