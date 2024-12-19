import React from 'react';
import {Link} from 'react-router-dom'
import { ArrowRight } from 'lucide-react';


const ShopCategories = () => {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 pt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Shop by Category</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Browse all categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3 flex flex-col justify-between h-full">
          <Link to="/category/1">
            <div className="relative rounded-lg overflow-hidden aspect-[5/4]">
              <img
                src='http://localhost:3000/uploads/homepagecat1.jpg'
                alt="New Arrivals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">Suits</h3>
                <button className="text-white">
                  Shop now
                </button>
              </div>
            </div>
            </Link>
          </div>
      
          <div className="md:col-span-2 flex flex-col gap-6 h-full">
         
            <div className="relative rounded-lg overflow-hidden aspect-[17/10]">
            <Link to="/category/3">
              <img
                src='http://localhost:3000/uploads/homepagecat2.jpg'
                alt="Accessories"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">Shoes</h3>
                <button className="text-white">
                  Shop now
                </button>
              </div>
              </Link>
            </div>
            
            <div className="relative rounded-lg overflow-hidden aspect-[17/10]">
            <Link to="/category/4">
              <img
                src='http://localhost:3000/uploads/homepagecat3.jpg'
                alt="Workspace"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="text-2xl font-semibold mb-2">Watches</h3>
                <button className="text-white">
                  Shop now
                </button>
              </div>
              </Link>
            </div>
            
          </div>
        </div>
      </div>
    );
  };
  

export default ShopCategories;