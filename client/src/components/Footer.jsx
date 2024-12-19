import React from 'react';
import {Link} from 'react-router-dom'
import { 
  Facebook,
  Instagram,
  Twitter,
  Github,
  Youtube
} from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-black to-[#111080] text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="lg:w-/4 mb-6 lg:mb-0">
            <Link to="#" ><img src='http://localhost:3000/uploads/logo.png' alt='logo' className='w-[300px] h-auto' /></Link>
            <div className="flex space-x-5 ml-[55px]">
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </Link>
              <Link to="" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>

          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:w-2/3">
      
            <div>
              <h3 className="font-semibold text-white mb-4">Solutions</h3>
              <ul className="space-y-3">
                <li><Link to="" className="text-sm hover:text-white transition-colors">Marketing</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Analytics</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Commerce</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Insights</Link></li>
              </ul>
            </div>

          
            <div>
              <h3 className="font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                <li><Link to="" className="text-sm hover:text-white transition-colors">Pricing</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Documentation</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Guides</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">API Status</Link></li>
              </ul>
            </div>

          
            <div>
              <h3 className="font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                <li><Link to="" className="text-sm hover:text-white transition-colors">About</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Blog</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Jobs</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Press</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Partners</Link></li>
              </ul>
            </div>

          
            <div>
              <h3 className="font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><Link to="" className="text-sm hover:text-white transition-colors">Claim</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="" className="text-sm hover:text-white transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;