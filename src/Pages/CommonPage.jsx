import React, { createContext, useState } from "react";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
export const context = createContext();

const CommonPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className="h-screen">
      <context.Provider value={darkMode}>
        <div className="relative eshop-home-container bg-white">
          <Navbar mode={darkMode} setter={setDarkMode} />
          <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8 ">
            <Outlet />
          </main>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="absolute bottom-80 right-14 animate-bounce border border-slate-400 bg-slate-100 rounded-full p-2"
          >
            <ArrowUpIcon className="h-6 w-6 text-indigo-600" />
          </button>
          <Footer />
        </div>
      </context.Provider>
    </div>
  );
};

export default CommonPage;
