import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";

const ProductCard = ({ product }) => {
  const handleAddToBag = async () => {
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
      toast.success("Product added to the bag!", { position: "top-center" });
    } catch (error) {
      toast.error("Failed to add product to cart", {
        position: "top-center",
        style: {
          width: "400px",
        },
      });
    }
  };

  return (
    <div className="group relative bg-white border border-gray-100 rounded-lg shadow-sm w-[250px] h-[430px]">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-[250px] w-[250px] overflow-hidden rounded-lg">
          <img
            src={`http://localhost:3000${product.image}`}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-gray-900/75 via-transparent to-transparent"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
          <div className="absolute bottom-3 right-3 text-white font-semibold text-sm">
            ${product.price}
          </div>

          {product.discount && (
            <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-medium px-2 py-0.5 rounded">
              {product.discount}
            </div>
          )}

          {product.trending && (
            <div className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
              {product.trending}
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
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
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: product.color }}
            />
          </div>

        </div>
      </Link>

      <div className="p-4 pt-0">
        <button
          onClick={handleAddToBag}
          className="w-full flex items-center justify-center gap-1 px-3 py-1.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gradient-to-r hover:from-black hover:to-[#111080] hover:text-white transition-colors duration-200"
        >
          <ShoppingBag className="w-4 h-4" />
          Add to Bag
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
