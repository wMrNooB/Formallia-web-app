import React from 'react';
import { useLocation } from 'react-router-dom';

const CategoryBanner = () => {
  const location = useLocation();
  let category = { name: 'Category', image: 'https://via.placeholder.com/1920x1080?text=Category' };
  let textColorClass = 'text-white'; // Default text color

  if (location.pathname.includes('/category/')) {
    const id = location.pathname.split('/category/')[1];

    const categories = {
      1: {
        name: 'Suits',
        image: '/suits.jpg',
      },
      2: {
        name: 'Shirts',
        image: '/shirts.jpg',
      },
      3: {
        name: 'Shoes',
        image: '/shoes.jpg',
      },
      4: {
        name: 'Watches',
        image: '/watch.jpg',
      },
      5: {
        name: 'Accessories',
        image: '/accessories.jpg',
      },
    };

    category = categories[id] || category;
  } else if (location.pathname === '/trending') {
    category = {
      name: 'Trending',
      image: '/trending.jpg'
    };
  } else if (location.pathname === '/sale') {
    category = {
      name: 'ON SALE %',
      image: '/sale.jpg'
    };
    textColorClass = 'text-red-600'; // Apply red text for 'ON SALE'
  } else if (location.pathname === '/products') {
    category = {
      name: 'All Products',
      image: '/trending.jpg'
    };
  }

  return (
    <div
      className="mt-8 w-[70%] mx-auto h-72 rounded-lg overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url("http://localhost:3000/uploads/${category.image}")` }}
      
    >
      <div className="h-full w-full bg-black/30 flex items-center justify-center">
        <h1 className={`text-4xl font-bold ${textColorClass}`}>{category.name}</h1>
      </div>
    </div>
  );
};

export default CategoryBanner;
