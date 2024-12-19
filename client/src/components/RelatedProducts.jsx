import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import {toast} from 'react-toastify';
import { ShoppingBag } from 'lucide-react';

const RelatedProducts = () => {
    const [products, setProducts] = useState([]); 
    useEffect(() => {
        const fetchProducts = async () => {
          let response;
          try {
              response = await axios.get(`http://localhost:3000/products`);
            setProducts(response?.data || []);
            setError(null); // Clear previous errors
          } catch (err) {
            console.error("Error fetching products:", err);
            setError("Failed to load products.");
          }
        };
    
        fetchProducts();
      }, []);
    

      const handleAddToBag = async (product) => {
        const userId = localStorage.getItem("userId");
    
        if (!userId) {
          toast.warn("Please log in to add items to your bag.");
          return;
        }
    
        try {
          const response = await axios.post("http://localhost:3000/cart/add", {
            userId,
            productId: product.id,
            quantity: 1,
            
          });
          toast.success('Product added to the bag!',{position: "top-center"});
        } catch (err) {
          toast.error("Failed to add product to cart",{position: "top-center",  style:{
            width: '400px'},});
            console.error("Error fetching products:", err);
        }
      };

   return (
   <>
    <div className="w-2/4 border-t border-gray-300 mx-auto mt-2"></div>

        <div className="max-w-7xl mx-auto mt-6 pt-8 pb-6">
            <h2 className="text-2xl font-semibold mb-7 px-4 text-gray-900x">You may also like...</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 px-4">
                {products.slice(0, 4).map((product) => (
                    <div 
                        key={product.id} 
                        className="group relative bg-white rounded-lg hover:shadow-lg transition-shadow duration-300"
                        style={{
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 6px 8px -1px rgba(0, 0, 0, 0.06)',
                        }}
                    >
                        <Link to={`/products/${product.id}`} className="block">
                            <div className="relative h-[200px] overflow-hidden rounded-t-lg">
                                <img
                                    src={`http://localhost:3000${product.image}`}
                                    alt={product.name}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                {product.discount && (
                                    <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                                        {product.discount}
                                    </div>
                                )}
                                {product.trending && (
                                  <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
                                      {product.trending}
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-transparent to-transparent" />
                                <div className="absolute bottom-3 right-3 text-white font-semibold text-sm">
                                    ${product.price}
                                </div>
                            </div>

                            <div className="p-3 space-y-2">
                              <h3 className="text-sm font-medium text-gray-900 truncate">
                               {product.name}
                             </h3>
                             {product.description && (
                           <div className="text-xs text-gray-700">
                             <p className="line-clamp-2 overflow-hidden">
                               {product.description}
                             </p>
                             <p className="mt-1 text-blue-500 hover:text-blue-400">
                             More Info
                             </p>
                           </div>)}

                           <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-600">Color:</span>
                             <span className="w-4 h-4 rounded-full"
                                   style={{ backgroundColor: product.color }}
                             />
                         </div>
                    </div>
                        </Link>
                         <div className="p-3 pt-0">
                            <button onClick={()=>handleAddToBag(product)}className="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-xs text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-[#111080] hover:text-white transition-colors duration-200">
                                <ShoppingBag className="w-3 h-3" />
                                Add to Cart
                            </button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    </>
    );
}

export default RelatedProducts;