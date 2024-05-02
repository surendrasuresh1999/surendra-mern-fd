import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { CircleUserRound } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navbar = [
  {
    id: 1,
    name: "Blogs",
    pathValue: "/",
  },
  {
    id: 2,
    name: "Jokes",
    pathValue: "/jokes",
  },
  {
    id: 3,
    name: "Quotes",
    pathValue: "/quotes",
  },
  {
    id: 4,
    name: "Authors",
    pathValue: "/authors",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const location = useLocation();

  const openSlideOverProfile = () => {
    return (
      <Transition.Root show={openSideBar} as={Fragment}>
        <Dialog as="div" className="relative z-30" onClose={setOpenSideBar}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            Panel title
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpenSideBar(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1 px-4 sm:px-6">
                        {/* Your content */}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };

  return (
    <>
      {openSideBar && openSlideOverProfile()}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-[60] lg:hidden"
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex justify-between items-center px-4 pb-2 pt-5">
                  <div>
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  {navbar.map((item, index) => (
                    <div key={index} className="flow-root">
                      <Link to={item.pathValue}>{item.name}</Link>
                    </div>
                  ))}
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Sign out
                    </a>
                  </div>
                  <div className="flow-root">
                    <a
                      href="#"
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      Profile
                    </a>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="sticky top-0 bg-white border-b z-[60]">
        <nav className="bg-white">
          <div>
            <div className="flex items-center px-4 sm:px-6 lg:px-8 container mx-auto">
              <button
                type="button"
                className="relative rounded-md bg-white text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 lg:ml-0 hidden lg:block">
                <a href="#">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </a>
              </div>

              <ul className="flex items-center gap-4 ml-4">
                {navbar.map((category, index) => (
                  <li className="flex flex-col relative" key={index}>
                    <Link
                      to={category.pathValue}
                      className={`py-4 px-2 ${
                        location.pathname === category.pathValue
                          ? "bg-slate-200 text-blue-400"
                          : "hover:bg-slate-200"
                      }  hover:text-blue-400 text-10size sm:text-18size font-500 sm:font-600`}
                    >
                      {category.name}
                    </Link>
                    {location.pathname === category.pathValue ? (
                      <span className="h-1 w-full bg-blue-800 absolute bottom-0" />
                    ) : location.pathname === "blog/:id" ? (
                      <span className="h-1 w-full bg-blue-800 absolute bottom-0" />
                    ) : null}
                  </li>
                ))}
              </ul>

              <div className="ml-auto hidden sm:block">
                <button
                  onClick={() => setOpenSideBar(true)}
                  className="flex items-center p-2"
                >
                  <CircleUserRound
                    strokeWidth={1.2}
                    size={24}
                    className="h-6 w-6 flex-shrink-0 text-gray-400"
                    aria-hidden="true"
                  />
                  <span className="sr-only">user profile</span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
