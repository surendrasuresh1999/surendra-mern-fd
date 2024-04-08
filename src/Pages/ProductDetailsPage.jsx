import { Fragment, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  Dialog,
  Popover,
  RadioGroup,
  Tab,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  CheckIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from "@heroicons/react/20/solid";
import { Baseurl } from "../BaseUrl";

const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg",
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Basic Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg",
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Dresses", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Denim", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Significant Other", href: "#" },
          ],
        },
      ],
    },
    {
      id: "men",
      name: "Men",
      featured: [
        {
          name: "New Arrivals",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg",
          imageAlt:
            "Drawstring top with elastic loop closure and textured interior padding.",
        },
        {
          name: "Artwork Tees",
          href: "#",
          imageSrc:
            "https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg",
          imageAlt:
            "Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.",
        },
      ],
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Tops", href: "#" },
            { name: "Pants", href: "#" },
            { name: "Sweaters", href: "#" },
            { name: "T-Shirts", href: "#" },
            { name: "Jackets", href: "#" },
            { name: "Activewear", href: "#" },
            { name: "Browse All", href: "#" },
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          items: [
            { name: "Watches", href: "#" },
            { name: "Wallets", href: "#" },
            { name: "Bags", href: "#" },
            { name: "Sunglasses", href: "#" },
            { name: "Hats", href: "#" },
            { name: "Belts", href: "#" },
          ],
        },
        {
          id: "brands",
          name: "Brands",
          items: [
            { name: "Re-Arranged", href: "#" },
            { name: "Counterfeit", href: "#" },
            { name: "Full Nelson", href: "#" },
            { name: "My Way", href: "#" },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: "Company", href: "#" },
    { name: "Stores", href: "#" },
  ],
};
const product = {
  name: "Everyday Ruck Snack",
  href: "#",
  price: "$220",
  description:
    "Don't compromise on snack-carrying capacity with this lightweight and spacious bag. The drawstring top keeps all your favorite chips, crisps, fries, biscuits, crackers, and cookies secure.",
  imageSrc:
    "https://tailwindui.com/img/ecommerce-images/product-page-04-featured-product-shot.jpg",
  imageAlt:
    "Light green canvas bag with black straps, handle, front zipper pouch, and drawstring top.",
  breadcrumbs: [
    { id: 1, name: "Travel", href: "#" },
    { id: 2, name: "Bags", href: "#" },
  ],
  sizes: [
    { name: "18L", description: "Perfect for a reasonable amount of snacks." },
    { name: "20L", description: "Enough room for a serious amount of snacks." },
  ],
};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import { useLocation } from "react-router-dom";
import axios from "axios";
import { sizesObj } from "../StaticData";
import DialogCommonStyle from "../Common/DialogCommonStyle";

const ProductDetailsPage = () => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [productDetails, setProductDetails] = useState({});
  const [openSizeChartDialog, setOpenSizeChartDialog] = useState(false);
  const location = useLocation();
  const jwtToken = Cookies.get("jwtToken");
  const productId = location.pathname.slice(9, location.pathname.length);

  useEffect(() => {
    axios
      .get(`${Baseurl.baseurl}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((response) => {
        setProductDetails(response.data.product);
        // setIsLoading(false);
        console.log("Product", response.data);
      })
      .catch((error) => {
        console.error("error", error.message);
      });
  }, [productId]);

  const sizeChartUi = () => {
    return (
      <div>
        <p>hwllo sadfnkjdsaf</p>
      </div>
    );
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-white">
        <div className="grid grid-cols-12 gap-x-10">
          {/* Product details */}
          <div className="col-span-12 lg:col-span-6">
            <nav aria-label="Breadcrumb">
              <ol role="list" className="flex items-center space-x-2">
                {product.breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                  <li key={breadcrumb.id}>
                    <div className="flex items-center text-sm">
                      <a
                        href={breadcrumb.href}
                        className="font-medium text-gray-500 hover:text-gray-900"
                      >
                        {breadcrumb.name}
                      </a>
                      {breadcrumbIdx !== product.breadcrumbs.length - 1 ? (
                        <svg
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                          className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                        >
                          <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                        </svg>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {productDetails?.title}
              </h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center gap-3">
                <p className="text-lg text-gray-900 sm:text-xl">
                  {productDetails?.price}
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-16size text-white flex items-center gap-1 sm:text-xl bg-blue-400 rounded-md py-1 px-3">
                    {productDetails?.ratings?.length}
                    <span>
                      <StarIcon className="text-white h-5 w-5" />
                    </span>
                  </p>
                  <p className="text-16size text-gray-900 font-600 tracking-wide flex items-center gap-1">
                    {productDetails?.reviews?.length}
                    <span>Reviews</span>
                  </p>
                </div>
              </div>
              <div className="overflow-hidden block lg:hidden rounded-lg">
                <img
                  src={productDetails?.imageUrl}
                  alt={productDetails?.title}
                  className=""
                />
              </div>
              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500 text-justify">
                  {productDetails?.description}
                </p>
                <p className="text-base text-gray-500 text-justify">
                  <b className="text-black">Brand: </b>
                  {productDetails?.brand}
                </p>
              </div>
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <span
                    onClick={() => setOpenSizeChartDialog(true)}
                    className="text-sm cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </span>
                </div>

                <RadioGroup
                  // value={selectedSize}
                  onChange={(e) => console.log("alsdhfsanf", e.target.value)}
                  className="mt-4"
                >
                  <RadioGroup.Label className="sr-only">
                    Choose a size
                  </RadioGroup.Label>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    {productDetails?.sizes?.map((size) => (
                      <RadioGroup.Option
                        key={size.name}
                        value={size}
                        onClick={() => console.log("Clicked size:", size.name)}
                        disabled={!size.inStock}
                        className={({ active }) =>
                          classNames(
                            sizesObj.includes(size)
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            active ? "ring-2 ring-indigo-500" : "",
                            "group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          )
                        }
                      >
                        {({ active, checked }) => (
                          <>
                            <RadioGroup.Label as="span">
                              {size}
                            </RadioGroup.Label>
                            {sizesObj.includes(size) ? (
                              <span
                                className={classNames(
                                  active ? "border" : "border-2",
                                  checked
                                    ? "border-indigo-500"
                                    : "border-transparent",
                                  "pointer-events-none absolute -inset-px rounded-md"
                                )}
                                aria-hidden="true"
                              />
                            ) : (
                              <span
                                aria-hidden="true"
                                className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                              >
                                <svg
                                  className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                  viewBox="0 0 100 100"
                                  preserveAspectRatio="none"
                                  stroke="currentColor"
                                >
                                  <line
                                    x1={0}
                                    y1={100}
                                    x2={100}
                                    y2={0}
                                    vectorEffect="non-scaling-stroke"
                                  />
                                </svg>
                              </span>
                            )}
                          </>
                        )}
                      </RadioGroup.Option>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              <div>
                <section aria-labelledby="options-heading">
                  <h2 id="options-heading" className="sr-only">
                    Product options
                  </h2>

                  <form>
                    <div className="mt-10">
                      <button
                        type="submit"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                      >
                        Add to bag
                      </button>
                    </div>
                    <div className="mt-6 text-center">
                      <a
                        href="#"
                        className="group inline-flex text-base font-medium"
                      >
                        <ShieldCheckIcon
                          className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                        <span className="text-gray-500 hover:text-gray-700">
                          Lifetime Guarantee
                        </span>
                      </a>
                    </div>
                  </form>
                </section>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className="col-span-12 lg:col-span-6 hidden lg:block">
            <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                src={productDetails?.imageUrl}
                alt={productDetails?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
      {openSizeChartDialog && (
        <DialogCommonStyle
          open={openSizeChartDialog}
          setterFun={setOpenSizeChartDialog}
        >
          {sizeChartUi}
        </DialogCommonStyle>
      )}
    </div>
  );
};

export default ProductDetailsPage;
