import React, { createContext, useState } from "react";
import Navbar from "../Common/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Common/Footer";

export const context = createContext();

const CommonPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  return (
    <div className="h-screen">
      <context.Provider value={darkMode}>
        <div className="relative eshop-home-container bg-white">
          <Navbar mode={darkMode} setter={setDarkMode} />
          <main
            className={`container mx-auto px-4 ${
              location.pathname === "/" ? "py-0" : "py-6"
            } sm:px-6 lg:px-8`}
          >
            <Outlet />
          </main>
          <Footer />
        </div>
      </context.Provider>
    </div>
  );
};

export default CommonPage;
