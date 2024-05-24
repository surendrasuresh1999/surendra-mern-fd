import React, { createContext, useState } from "react";
import Navbar from "../Common/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Common/Footer";

export const context = createContext();

const CommonPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen relative">
      <context.Provider value={darkMode}>
        <div className="relative flex flex-col eshop-home-container bg-slate-50">
          <Navbar mode={darkMode} setter={setDarkMode} />
          <main
            className={`container grow mx-auto px-4 ${
              location.pathname === "/" ? "py-0" : "py-6"
            } sm:px-6 lg:px-8`}
          >
            <section>
              <Outlet />
            </section>
          </main>
          <Footer />
        </div>
      </context.Provider>
    </div>
  );
};

export default CommonPage;
