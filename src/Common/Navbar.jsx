import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Activity, CircleUserRoundIcon, LogIn, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Avatar } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { Baseurl } from "../BaseUrl";
import Cookies from "js-cookie";
import axios from "axios";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";

const navbar = [
  {
    id: 1,
    name: "Blogs",
    pathValue: "/blogs",
  },
  {
    id: 2,
    name: "Quotes",
    pathValue: "/quotes",
  },
  {
    id: 3,
    name: "Authors",
    pathValue: "/authors",
  },
];

const trackRecord = ["blogs", "quotes"];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = ({ mode, setter }) => {
  const [open, setOpen] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);
  const [userTrackData, setUserTrackData] = useState({
    isFetching: true,
    data: {},
  });
  const location = useLocation();
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");
  const userDetails = JSON.parse(localStorage.getItem("blogUserDetails"));

  const userNavigation = [
    { name: "My activity", icon: <Activity size={18} /> },
    { name: "My profile", icon: <CircleUserRoundIcon size={18} /> },
    {
      name: userDetails !== null ? "Log out" : "Login",
      icon: userDetails !== null ? <LogOut size={18} /> : <LogIn size={18} />,
    },
  ];

  useEffect(() => {
    let source = axios.CancelToken.source();
    if (openSideBar) {
      axios
        .get(`${Baseurl.baseurl}/api/user`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
          cancelToken: source.token,
        })
        .then((res) => {
          if (res.status === 200) {
            setUserTrackData({ isFetching: false, data: res.data });
          } else {
            toast.error(res.data.message);
            console.log("res", res);
          }
        })
        .catch((err) => {
          console.log("Error", err.message);
          toast.error(err.message);
        });
    }
    return () => {
      // befor hitting the api this clean up will called and when the component is unmounted then this clean up will be called
      // source.cancel("Component unmounted");
    };
  }, [openSideBar]);

  const openSlideOverProfile = () => {
    return (
      <Transition.Root show={openSideBar} as={Fragment}>
        <Dialog as="div" className="relative z-[70]" onClose={setOpenSideBar}>
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
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md bg-slate-800">
                    <div className="flex h-full flex-col relative bg-white shadow-xl w-full">
                      <div className="p-4 border-b sticky top-0 z-20 bg-white">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-2">
                            <Avatar sx={{ width: 50, height: 50 }}>
                              {userDetails.name.charAt(0).toUpperCase()}
                            </Avatar>
                            <div>
                              <p className="text-black font-700 text-20size tracking-wide leading-6">
                                {userDetails.name.charAt(0).toUpperCase() +
                                  userDetails.name.slice(1)}
                              </p>
                              <span className="text-gray-500 font-600 text-14size tracking-wide">
                                {userDetails.email}
                              </span>
                              <p
                                className={`text-sm text-slate-500 tracking-wide`}
                              >
                                Joined{" "}
                                <ReactTimeAgo
                                  date={Date.parse(userDetails.createdAt)}
                                  locale="en-US"
                                />
                              </p>
                            </div>
                          </div>
                          {/* <div className="ml-3 flex items-center">
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
                          </div> */}
                        </div>
                      </div>
                      <div className="relative flex-1 px-4 sm:px-6 overflow-y-auto max-w-md break-words">
                        {userTrackData.isFetching ? (
                          <div className="flex items-center justify-center py-10">
                            <BeatLoader color="#f08b1f" size={20} />
                          </div>
                        ) : (
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                            {trackRecord.map((item, index) => (
                              <li
                                key={index}
                                className={`relative flex items-center gap-1.5 rounded-lg border border-gray-300 px-6 py-4 shadow focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2`}
                              >
                                <span className="text-gray-600 font-500 text-18size">
                                  Total {item}:
                                </span>
                                <span className="text-gray-600 font-500 text-16size">
                                  {userTrackData.data[item]}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
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

  useEffect(() => {
    if (open) {
      setOpen(false);
    }
  }, [location]);

  const handleClickMenuItem = (itemIndex) => {
    switch (itemIndex) {
      case 0:
        return navigate("/my-activity");
      case 1:
        return setOpenSideBar(true);
      case 2:
        return swal({
          title: "Logout Confirmation",
          icon: "warning",
          text: "Are you sure you want to log out?",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              localStorage.removeItem("blogUserDetails");
              Cookies.remove("jwtToken");
              navigate("/login");
            }
          })
          .catch((error) => {
            console.log("Error", error.message);
          });
      default:
        return null;
    }
  };
  console.log("userDetails", userDetails);

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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="sticky top-0 z-[60]">
        <nav
          className={`${
            mode ? "bg-black border-gray-400 " : "bg-white"
          } border-b bg-opacity-85`}
        >
          <div>
            <div className="flex items-center px-4 sm:px-6 lg:px-8 container mx-auto py-3 sm:py-0">
              <button
                type="button"
                className="relative rounded-md bg-transparent text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Logo */}
              <div className="ml-4 lg:ml-0">
                <Link to="/">
                  <span className="sr-only">Your Company</span>
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                </Link>
              </div>

              <ul className="hidden sm:flex items-center gap-4 ml-4">
                {navbar.map((category, index) => (
                  <li className="flex flex-col relative" key={index}>
                    <Link
                      to={category.pathValue}
                      className={`py-6 px-2 dark:text-white  ${
                        location.pathname === category.pathValue
                          ? "bg-slate-200 text-blue-400 dark:bg-gray-800"
                          : "hover:bg-transparent"
                      } text-10size sm:text-18size font-500 sm:font-600`}
                    >
                      {category.name}
                    </Link>
                    {location.pathname === category.pathValue ? (
                      <span className="h-1 w-full bg-blue-800 absolute dark:text-white bottom-0" />
                    ) : location.pathname === "blog/:id" ? (
                      <span className="h-1 w-full bg-blue-800 absolute bottom-0" />
                    ) : null}
                  </li>
                ))}
              </ul>

              <div className="ml-auto">
                <div className="flex items-center gap-4">
                  <div className="">
                    <Menu as="div" className="relative">
                      <Menu.Button className="-m-1.5 flex items-center p-1.5">
                        <span className="sr-only">Open user menu</span>
                        <Avatar>
                          {userDetails?.name?.slice(0, 2).toUpperCase()}
                        </Avatar>
                        <span className="hidden lg:flex lg:items-center">
                          <ChevronDownIcon
                            className="ml-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-36 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                          {userNavigation.map((item, index) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <span
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-50" : "",
                                    `flex items-center font-500 tracking-wide gap-1.5 px-3 py-1 text-sm leading-6 text-gray-600 cursor-pointer hover:bg-orange-500 hover:text-white`
                                  )}
                                  onClick={() =>
                                    userDetails !== null
                                      ? handleClickMenuItem(index)
                                      : navigate("/login")
                                  }
                                >
                                  {item.icon}
                                  {item.name}
                                </span>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
