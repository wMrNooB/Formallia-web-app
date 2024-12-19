import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import CartSlide from './Cartslide';
import BagButton from './BagButton';
import LoginForm from './LoginForm';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleLoginStatus = (status) => {
    setIsLoggedIn(status);
  };

  // Scroll event listener to detect when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled more than 50px
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Attach the event listener on mount
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`transition-all duration-300 ${
          isScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'
        }`}
      >
        <div className="h-48 bg-gradient-to-r from-black to-[#111080] animate-gradient">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-0">
            <Link to="/">
              <img
                src='http://localhost:3000/uploads/logo.png'
                alt="Formallia"
                className="w-[400px] h-auto mr-5"
              />
            </Link>

            <div className="flex items-center space-x-5 text-white ml-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm w-[400px]"
                />
                <Search className="absolute right-3 top-2.5 w-5 h-5 text-white/70" />
              </div>
              <LoginForm isLoggedIn={isLoggedIn} setLoginStatus={handleLoginStatus} />
              <BagButton toggleOpen={toggleOpen} />
              <CartSlide open={open} toggleOpen={toggleOpen} />
            </div>
          </div>
        </div>

        <div
          className={`bg-gray-300 border-b border-gray-300 border-opacity-20 bg-opacity-40 ${
            isScrolled ? 'opacity-0 invisible' : 'opacity-100 visible'
          }`}
        >
          <nav className="max-w-7xl mx-auto">
            <ul className="flex justify-center px-2 py-3 gap-12">
            <li>
                <Link to="/sale">
                  <button className="text-red-600 text-sm font-medium hover:text-blue-600 transition-colors">
                  SPECIAL OFFERS 
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/category/1">
                  <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                    SUITS
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/category/2">
                  <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                    SHIRTS
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/category/3">
                  <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                    SHOES
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/category/4">
                  <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                    WATCHES
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/category/5">
                  <button className="text-sm font-medium hover:text-blue-600 transition-colors">
                    ACCESSORIES
                  </button>
                </Link>
              </li>
              <li>
                <Link to="/trending">
                  <button className="text-red-600 text-sm font-medium hover:text-blue-600 transition-colors">
                    TRENDING
                  </button>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <header
        className={`bg-gradient-to-r from-black to-[#111080] animate-gradient fixed top-0 left-0 right-0 h-16 shadow-lg transition-transform duration-200 z-50 ${
          isScrolled ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-4">
          <Link to="/">
            <img src='http://localhost:3000/uploads/scrolledLogo.png' alt="Formallia" className="w-[190px] h-auto" />
          </Link>

          <div className="flex items-center space-x-6 text-white">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-10 py-2 rounded-md bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm w-[290px]"
              />
              <Search className="absolute right-3 top-2.5 w-5 h-5 text-white/70" />
            </div>
            <LoginForm isLoggedIn={isLoggedIn} setLoginStatus={handleLoginStatus} />
            <BagButton toggleOpen={toggleOpen} />
            <CartSlide open={open} toggleOpen={toggleOpen} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
