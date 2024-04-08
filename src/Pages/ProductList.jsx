import { useEffect, useState } from "react";
import { Baseurl } from "../BaseUrl";
import axios from "axios";
import Cookies from "js-cookie";
import { IndianRupee } from "lucide-react";
import { StarIcon } from "@heroicons/react/20/solid";
import Loader from "../Common/Loader";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [productsData, setProductData] = useState([]);
  const jwtToken = Cookies.get("jwtToken");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${Baseurl.baseurl}/api/products`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setProductData(response.data);
        setIsLoading(false);
        console.log("Product", response.data);
      })
      .catch((error) => {
        console.error("error", error.message);
      });
  }, []);

  return (
    <div className="bg-white">
      <div>
        <div className="py-6">
          <h1 className="text-28size font-semibold text-gray-500">
            All Products
          </h1>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <ul className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {productsData.map((product, index) => (
              <Link key={index} to={`/product/${product._id}`}>
                <li key={index} className="group text-sm">
                  <div className="h-96 overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={product?.imageUrl}
                      alt={product?.title}
                      className="h-full w-full object-center"
                    />
                  </div>
                  <h3 className="mt-4 font-medium text-gray-900">
                    {product?.title}
                  </h3>
                  <p className="text-gray-500">{product?.brand}</p>
                  <div>
                    <p className="font-medium text-gray-900 flex items-center">
                      <IndianRupee className="h-4 w-4" />
                      {product.price}
                    </p>
                    <p className="flex items-center text-16size">
                      <span>{product?.ratings.length}</span>{" "}
                      <StarIcon className="text-yellow-300 h-4 w-4" />
                    </p>
                  </div>
                </li>
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
