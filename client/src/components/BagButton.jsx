import React from 'react';
import { ShoppingBag } from 'lucide-react';

const BagButton = ({ toggleOpen }) => {
  return (
    <div onClick={toggleOpen}>
      <ShoppingBag className="w-6 h-6 cursor-pointer" />
    </div>
  );
};

export default BagButton;
