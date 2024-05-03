import React, { createContext, useState } from "react";
import Navbar from "../Common/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
export const context = createContext();

const CommonPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <div className={`${darkMode && "dark"}`}>
      <context.Provider value={darkMode}>
        <div className="relative eshop-home-container bg-white dark:bg-neutral-900">
          <Navbar mode={darkMode} setter={setDarkMode} />
          <main className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </context.Provider>
    </div>
  );
};

export default CommonPage;
