const productsData = [
    {
      id: 1,
      name: "Nomad Pouch",
      href: "#",
      price: "$50",
      availability: "White and Black",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-07-product-01.jpg",
      imageAlt:
        "White fabric pouch with white zipper, black zipper pull, and black elastic loop.",
    },
    {
      id: 2,
      name: "Zip Tote Basket",
      href: "#",
      price: "$140",
      availability: "Washed Black",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-07-product-02.jpg",
      imageAlt:
        "Front of tote bag with washed black canvas body, black straps, and tan leather handles and accents.",
    },
    {
      id: 3,
      name: "Medium Stuff Satchel",
      href: "#",
      price: "$220",
      availability: "Blue",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/category-page-07-product-03.jpg",
      imageAlt:
        "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
    },
    // More products...
  ];
  
  const ProductList = () => {
    return (
      <div className="bg-white">
        <div>
          <div className="py-6">
            <h1 className="text-bigSize font-semibold text-gray-500">
              All Products
            </h1>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {productsData.map((product) => (
              <a key={product.id} href={product.href} className="group text-sm">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 hover:opacity-75">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 font-medium text-gray-900">{product.name}</h3>
                <p className="italic text-gray-500">{product.availability}</p>
                <p className="mt-2 font-medium text-gray-900">{product.price}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProductList;
  