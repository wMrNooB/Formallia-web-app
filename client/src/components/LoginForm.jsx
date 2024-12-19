import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { User, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';


const LoginForm = ({ isLoggedIn, setLoginStatus }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (password.length < 8) {
          setError('Password must be at least 8 characters long.');
          return;
      }
      if (password !== confirmPassword) {
          setError('Passwords do not match.');
          return;
      }
    }

    try {
      const endpoint = isSignUp ? 'http://localhost:3000/register' : 'http://localhost:3000/login';
      const data = isSignUp
        ? { email, username, password, confirmPassword }
        : { email, password };

      const response = await axios.post(endpoint, data);

      console.log('Success');
      setLoginStatus(true);
      setUsername(response.data.username || username);
      localStorage.setItem("userId", response.data.userId);
      setIsOpen(false);
      {isSignUp ? toast.success('Account created successfully!'): toast.success('Logged in successfully!')}
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Something went wrong!');
    }
  };

  const handleLogout = () => {
    setLoginStatus(false); 
    setEmail('');
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    localStorage.removeItem('userId'); 
    toast.error('Logged out successfully!')
    navigate('/');
};


  return (
    <>
      <div>
        
        <button
          className=" text-white px-4 py-2  hover:text-gray-300"
          onClick={() => setIsOpen(true)}
        >
          {isLoggedIn ? (
            <UserCheck className="w-6 h-6" />
          ) : (
            <User className="w-6 h-6 cursor-pointer" />
          )}
        </button>
      </div>

      <Transition appear show={isOpen} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
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
                    {isLoggedIn ? (
                      <div className="text-center">
                        <Dialog.Title className="text-2xl font-semibold text-gray-900 text-center mb-4">
                          Welcome, {username}!
                        </Dialog.Title>
                        <div className="flex items-center justify-center space-x-2 mb-4">
                          <span className="text-gray-600">You're logged in</span>
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-6 w-6 text-green-500" 
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
                        </div>
                        <button onClick={handleLogout} className="mt-4 flex items-center justify-center w-full rounded-md bg-gradient-to-r from-black to-[#111080] px-6 py-2 text-base font-medium text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                          <span className="mr-2">Logout</span>
                             <svg
                               xmlns="http://www.w3.org/2000/svg"
                               className="h-5 w-5"
                               fill="none"
                               viewBox="0 0 24 24"
                               stroke="currentColor"
                               strokeWidth={2}
                             >
                            <path
                               strokeLinecap="round"
                               strokeLinejoin="round"
                               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                             />
                              </svg>
                         </button>

                      </div>
                    ) : (
                      <>
                        <Dialog.Title className="text-2xl font-semibold text-gray-900 text-center mb-4">
                          {isSignUp ? "Create an account" : "Sign in to your account"}
                        </Dialog.Title>

                        {error && (
                          <div className="mb-4 text-sm text-red-500 text-center">
                            {error}
                          </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                          {isSignUp && (
                            <div className="space-y-2">
                              <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-900"
                              >
                                User Name
                              </label>
                              <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Enter your user name"
                                required
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Email address
                            </label>
                            <input
                              type="email"
                              id="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              placeholder="Enter your email"
                              required
                            />
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="password"
                              className="block text-sm font-medium text-gray-900"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                              placeholder="Enter your password"
                              required
                            />
                          </div>

                          {isSignUp && (
                            <div className="space-y-2">
                              <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium text-gray-900"
                              >
                                Confirm Password
                              </label>
                              <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                placeholder="Confirm your password"
                                required
                              />
                            </div>
                          )}

                          <button
                            type="submit"
                            className="mt-4 w-full rounded-md bg-gradient-to-r from-black to-[#111080] px-6 py-2 text-base font-medium text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                          >
                            {isSignUp ? "Sign up" : "Sign in"}
                          </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                          {isSignUp ? "Already have an account?" : "Not a member?"}{" "}
                          <button
                            type="button"
                            className="text-blue-600 hover:text-blue-700"
                            onClick={() => setIsSignUp(!isSignUp)}
                          >
                            {isSignUp ? "Sign in" : "Create account"}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
            </Transition.Child>
          </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default LoginForm;
