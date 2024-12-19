'use client';

import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {toast} from 'react-toastify';
import axios from 'axios';

const CartSlide = ({ open, toggleOpen }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // Fetch the cart data when the cart opens
  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const userId = localStorage.getItem('userId'); 
        if (!userId) {
          console.error('User is not logged in');
          setCartProducts([]);
          setSubtotal(0); 
          return;
        }

        const response = await axios.get(`http://localhost:3000/cart/${userId}`);
        const products = response.data || []; 

        setCartProducts(products); 
        calculateSubtotal(products); 
      } catch (error) {
        console.error('Error fetching cart products:', error);
      }
    };

    if (open) {
      fetchCartProducts();
    }
  }, [open]);

  
  const calculateSubtotal = (products) => {
    const total = products.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);
    setSubtotal(total);
  };

  
  const removeProduct = async (productId) => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        toast.error('User is not logged in');
        setCartProducts([]);
        return;
      }
  
      await axios.delete(`http://localhost:3000/cart/${userId}/product/${productId}`);
      
      const updatedProducts = cartProducts.filter((product) => product.id !== productId);
      setCartProducts(updatedProducts);
      toast.error('Product removed from the cart!',{position: "top-center"});
  
      
      calculateSubtotal(updatedProducts);
    } catch (error) {
      console.error('Error removing product from cart:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={toggleOpen} className="fixed inset-0 z-[100] overflow-hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={toggleOpen}
                          className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span className="absolute -inset-0.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {cartProducts && cartProducts.length > 0 ? (
                            cartProducts.map((product, index) => (
                              <li key={index} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <Link to={`/products/${product.id}`} onClick={toggleOpen}>
                                  <img
                                    alt={product.name}
                                    src={`http://localhost:3000${product.image}`}
                                    className="h-full w-full object-cover object-center"
                                  /></Link>
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <Link onClick={toggleOpen} to={`/products/${product.id}`}>{product.name} </Link>
                                      </h3>
                                      <p className="ml-4">${product.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center my-2 space-x-2">
                                     <span className="text-xs text-gray-600">Color:</span>
                                     <span className="w-4 h-4 rounded-full" style={{ backgroundColor: product.color }}/>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Qty {product.quantity}</p>
                                    <div className="flex">
                                      <button type="button" onClick={() => {removeProduct(product.id)}} 
                                        className="font-medium text-blue-600 hover:text-blue-700">
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))
                          ) : (
                            <li className="py-6 text-center text-gray-500">No products in cart</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${subtotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                    <div className="mt-6">
                      <Link
                        to="/checkout"
                        onClick={toggleOpen}
                        className="flex items-center justify-center rounded-md border border-transparent bg-gradient-to-r from-black to-[#111080] text-gray-300 px-6 py-3 text-base font-medium shadow-sm hover:text-[16.5px]"
                      >
                        Checkout
                      </Link>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          onClick={toggleOpen}
                          className="font-medium text-blue-600 hover:text-blue-700"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default CartSlide;
