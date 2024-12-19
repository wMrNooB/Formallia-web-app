import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';

const Categories = (props) => {
  const [Categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-7 mt-6 mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-7 px-2 text-gray-900">{props.title}</h2>
        <Link
          to="/products"
          className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
        >
          Browse all categories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {Categories.map((category) => (
          <Link
            key={category.id}
            to={category.link}
            className="group relative overflow-hidden rounded-lg bg-gray-100 hover:opacity-75 transition-opacity"
          >
            <div className="aspect-[1/1] w-full mb-0"> 
              <img
                src={`http://localhost:3000${category.image}`}
                alt="category_image"
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            <div className="w-full bg-black h-12 flex items-center justify-center mt-0">
              <h3 className="text-lg font-medium text-white">{category.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
