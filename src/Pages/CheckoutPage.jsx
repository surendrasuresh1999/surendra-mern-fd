import React from "react";
import CheckoutStepper from "../Components/CheckoutStepper";

import { Fragment } from "react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Popover, Transition } from "@headlessui/react";
import AddressComponent from "../Components/AddressComponent";

const steps = [
  { name: "Cart", href: "#", status: "complete" },
  { name: "Billing Information", href: "#", status: "current" },
  { name: "Confirmation", href: "#", status: "upcoming" },
];
const products = [
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 2,
    name: "Micro Backpack2",
    href: "#",
    price: "$120.00",
    color: "Moss",
    size: "5L",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
];
const accounts = [
  { id: "checking", name: "Checking", description: "CIBC ••••6610" },
  { id: "savings", name: "Savings", description: "Bank of America ••••0149" },
  { id: "mastercard", name: "Mastercard", description: "Capital One ••••7877" },
];
const CheckoutPage = () => {
  return (
    <div className="space-y-6 relative">
      <CheckoutStepper />
      <div className="bg-white">
        <div className="relative grid grid-cols-1 gap-x-16 lg:grid-cols-2 xl:gap-x-48">
          <h1 className="sr-only">Order information</h1>
          <section
            aria-labelledby="summary-heading"
            className="bg-gray-100 px-4 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
          >
            <div>
              <h2
                id="summary-heading"
                className="text-xl font-semibold text-gray-900"
              >
                Order summary
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 text-sm font-medium text-gray-900"
              >
                {products.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-start space-x-4 py-6"
                  >
                    <img
                      src={product.imageSrc}
                      alt={product.imageAlt}
                      className="h-20 w-20 flex-none rounded-md object-cover object-center"
                    />
                    <div className="flex-auto space-y-1">
                      <h3>{product.name}</h3>
                      <p className="text-gray-500">{product.color}</p>
                      <p className="text-gray-500">{product.size}</p>
                    </div>
                    <p className="flex-none text-base font-medium">
                      {product.price}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd>$320.00</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd>$15.00</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Taxes</dt>
                  <dd>$26.80</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">$361.80</dd>
                </div>
              </dl>

              <Popover className="fixed z-[] inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                <div className="relative z-10 border-t border-gray-200 bg-gray-100 px-4 sm:px-6">
                  <div className="mx-auto max-w-lg">
                    <Popover.Button className="flex w-full items-center py-6 font-medium">
                      <span className="mr-auto text-base">Total</span>
                      <span className="mr-2 text-base">$361.80</span>
                      <ChevronUpIcon
                        className="h-5 w-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Popover.Button>
                  </div>
                </div>

                <Transition.Root as={Fragment}>
                  <div>
                    <Transition.Child
                      as={Fragment}
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                      as={Fragment}
                      enter="transition ease-in-out duration-300 transform"
                      enterFrom="translate-y-full"
                      enterTo="translate-y-0"
                      leave="transition ease-in-out duration-300 transform"
                      leaveFrom="translate-y-0"
                      leaveTo="translate-y-full"
                    >
                      <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                        <dl className="space-y-6">
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Subtotal</dt>
                            <dd>$320.00</dd>
                          </div>

                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Shipping</dt>
                            <dd>$15.00</dd>
                          </div>

                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Taxes</dt>
                            <dd>$26.80</dd>
                          </div>
                        </dl>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </Popover>
            </div>
          </section>
          <div>
            <AddressComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
