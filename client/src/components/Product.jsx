import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import {toast} from 'react-toastify';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Product = ( ) => {
  const { productId } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/products/${productId}`);
        setProduct(response.data.product);
        setImages(response.data.images);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [productId]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };
  const Rating = () => (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">4.2</span>
      <div className="flex text-yellow-400">
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current" />
        <Star className="w-4 h-4 fill-current text-gray-200" />
      </div>
      <Link to="" className=" block text-sm text-blue-600 hover:text-blue-700">
        See all 128 reviews
      </Link>
    </div>);
    
    const handleAddToBag = async () => {
      const userId = localStorage.getItem("userId");
  
      if (!userId) {
        toast.warn("Please log in to add items to your bag.");
        return;
      }
  
      try {
        const response = await axios.post("http://localhost:3000/cart/add", {
          userId,
          productId,
          quantity: 1,
        });
        toast.success('Product added to the bag!',{position: "top-center"});
      } catch (error) {
        toast.error("Failed to add product to cart",{position: "top-center",  style:{
          width: '400px'},});
      }
    };
   

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
              <nav className="flex items-center gap-2 text-sm mb-6">
        <p className="text-gray-600 hover:text-gray-800">Categories</p>
        <span className="text-gray-400">/</span>
        <p className="text-gray-600 hover:text-gray-800">Product Details</p>
        <span className="text-gray-400">/</span>
        <p className="text-gray-800">Overview</p>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
            <img
              src={`http://localhost:3000${images[currentImageIndex]}`}
              alt={product?.name || 'Product image'}
              className="w-full h-full object-cover"
            />
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 hover:bg-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`aspect-square overflow-hidden rounded-lg ${
                  currentImageIndex === idx ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <img src={`http://localhost:3000${img}`} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-900">{product?.name}</h1>
            </div>
            <div className="mt-2">
              <Rating />
            </div>
            <p className="text-2xl font-semibold text-gray-900 mt-2">${product?.price}</p>
          </div>

         <div>
          <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <div className="mt-2 flex gap-2">
              <button
                 className="w-8 h-8 rounded-full border border-gray-300"
                 style={{ backgroundColor: product?.color.toLowerCase() }}
               />
           </div>
         </div>

          <div>
            <div className="flex justify-between">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
            </div>
            <div className="mt-2 grid grid-cols-6 gap-2">
           {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
           <button
            key={size}
            onClick={() => setSelectedSize(size)}
            className={`flex items-center justify-center rounded-md border py-2 text-sm
            ${selectedSize === size 
          ? 'bg-gradient-to-r from-black to-[#111080] text-white transition-colors duration-200' 
          : 'border-gray-300 text-gray-900 bg-gray-150 hover:bg-white'
        }`}
    >
      {size}
    </button>
  ))}
</div>

          </div>
          
          <button onClick={()=> {handleAddToBag()}}className="w-full text-white py-3 rounded-md bg-gradient-to-r from-black to-[#111080] animate-gradient">
            Add to cart
          </button>



          <div className="space-y-4">
            <h3 className="text-[18px] font-medium text-gray-900">Description</h3>
            <p className="text-[15px] text-gray-600">{product?.description}</p>
          </div>
            <div className="space-y-4">
             <h3 className="text-[18px] font-medium text-gray-900">Fabric & Care</h3>
               <ul className="space-y-2">
                 {product?.fabricCare.map((item, idx) => (
                 <li key={idx} className="text-[15px] text-gray-600 flex items-center gap-2">
                   <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    {item}
                 </li>
                  ))}
               </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Product;