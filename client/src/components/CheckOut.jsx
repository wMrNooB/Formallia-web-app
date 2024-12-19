import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react';
import axios from 'axios';

const CheckoutForm = () => {
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const total = (subtotal + 5 + 6.52);

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
    "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina",
    "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
    "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti",
    "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji",
    "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
    "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan",
    "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho",
    "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands",
    "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia",
    "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
    "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda",
    "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa",
    "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand",
    "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates",
    "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];
  
  
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
    const ttotal = products.reduce((acc, product) => acc + parseFloat(product.price) * product.quantity, 0);
    setSubtotal(ttotal);
  };
  
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);

  const closeModal = () => setIsOpen(false);


  return (
    <div className="w-11/12 mx-auto py-6 mt-2 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div className="space-y-8 md:pl-4">
          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Contact information</h2>
            <input
              type="email"
              placeholder="Email address"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Shipping Information */}
          <div>
            <h2 className="text-lg font-medium mb-4">Shipping information</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="First name"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Last name"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <input
              type="text"
              placeholder="Company"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc."
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="City"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <select className="border border-gray-300 rounded-md px-3 py-2" defaultValue="Morocco">
                {countries.map(country => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="State / Province"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
              <input
                type="text"
                placeholder="Postal code"
                className="border border-gray-300 rounded-md px-3 py-2"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone"
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Delivery Method */}
          <div>
            <h2 className="text-lg font-medium mb-4">Delivery method</h2>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`border rounded-md p-4 cursor-pointer ${
                  deliveryMethod === 'standard' ? 'border-[#111080]' : 'border-gray-300'
                }`}
                onClick={() => setDeliveryMethod('standard')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border ${
                    deliveryMethod === 'standard' ? 'border-4 border-[#111080]' : 'border-gray-300'
                  }`} />
                  <span className="font-medium">Standard</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">4–10 business days</p>
                <p className="font-medium mt-1">$5.00</p>
              </div>
              <div
                className={`border rounded-md p-4 cursor-pointer ${
                  deliveryMethod === 'express' ? 'border-[#111080]' : 'border-gray-300'
                }`}
                onClick={() => setDeliveryMethod('express')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border ${
                    deliveryMethod === 'express' ? 'border-4 border-[#111080]' : 'border-gray-300'
                  }`} />
                  <span className="font-medium">Express</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">2-5 business days</p>
                <p className="font-medium mt-1">$16.00</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-lg font-semibold mb-4">Payment</h2>
            <div className="grid grid-cols-2">
              <div
                className="p-2 cursor-pointer"
                onClick={() => setPaymentMethod('credit')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border ${
                    paymentMethod === 'credit' ? 'border-4 border-[#111080]' : 'border-gray-300'
                  }`} />
                  <span className="flex items-center font-semibold">Credit card<img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="MasterCard" className="w-6 h-auto ml-3"/></span>
                </div>
              </div>
              <div
                className="py-2 px-0 cursor-pointer -ml-20"
                onClick={() => setPaymentMethod('paypal')}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full border ${
                    paymentMethod === 'paypal' ? 'border-4 border-[#111080]' : 'border-gray-300'
                  }`} />
                  <span className="flex items-center font-semibold">PayPal<img src="https://www.paypalobjects.com/webstatic/icon/pp258.png" alt="PayPal" className="w-6 h-auto ml-1"/></span>
                </div>
              </div>
            </div>
            
            {paymentMethod === 'credit' && (
              <div className="mt-4 space-y-4">
                <input
                  type="text"
                  placeholder="Card number"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Expiration date (MM/YY)"
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="border border-gray-300 rounded-md px-3 py-2"
                  />
                </div>
              </div>
            )}
            {paymentMethod === 'paypal' && (
              <div className="mt-4 space-y-4">
                <input
                  type="email"
                  placeholder="PayPal email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button className="w-full bg-[#003087] text-white font-medium rounded-md py-3">
                  Continue with PayPal
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="bg-white rounded-lg pb-6 px-6 md:mr-4">
            <h2 className="text-lg font-medium mb-6">Order summary</h2>
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <Link to={`/products/${product.id}`}>
                         <img src={`http://localhost:3000${product.image}`} alt={product.name} className="w-20 h-auto object-cover rounded"/>
                      </Link>
                   <div>
                      <Link to={`/products/${product.id}`}>
                        <h3 className="font-medium">{product.name}</h3>
                      </Link>
              <div className="mt-1">
               <span className="text-xs text-gray-600">Color:</span>
                 <div className="mt-1">
                    <span className="w-4 h-4 rounded-full inline-block" style={{ backgroundColor: product.color }}/>
            </div>
          </div>
               </div>
                   </div>
                      <div className="text-right">
                           <p className="font-medium">${product.price}</p>
                      </div>
                   </div>
                    ))}</div>
             <div className="border-t border-gray-200 mt-6 pt-6 space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <p>${subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium">$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span className="font-medium">$6.52</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="font-medium">Total</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
            </div>
            <div className='flex items-center justify-center'>
            <button onClick={openModal} className="w-[99%] flex items-center justify-center bg-gradient-to-r from-black to-[#111080] text-white font-medium rounded-md py-3 mt-6 hover:text-gray-400">
              Confirm order
            </button>
            </div>
            <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[500px] overflow-hidden rounded-lg bg-gradient-to-b from-black to-[#111080] animate-gradientfaster pt-8 pb-7 px-4 shadow-lg">
                  <div className="-mt-6 text-center">
                    <img src='http://localhost:3000/uploads/logo.png' alt="logo" />
                  </div>

                  <div className="bg-white rounded-lg p-6 -mt-3 shadow-md">
                    {/* Modal content */}
                    <div className="text-center">
                    <Dialog.Title className="text-2xl font-semibold text-gray-900 text-center mb-4 flex items-center justify-center">
                      Thank you for buying our product!
                        <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 text-green-500 ml-2"
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        >
                        <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                        />
                        </svg>
                     </Dialog.Title>
                      <p className="text-lg text-gray-700 mb-4">
                        You will be contacted for buying confirmation and details.
                      </p>

                    
                      <button
                        onClick={closeModal}
                        className="mt-4 flex items-center justify-center w-full rounded-md bg-gradient-to-r from-black to-[#111080] px-6 py-2 text-base font-medium text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        <span className="mr-2">Close</span>
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;