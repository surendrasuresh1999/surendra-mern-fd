import React, { useContext } from "react";
import noDataImage from "../assets/nodataFound.svg";
import { context } from "../Pages/CommonPage";

const NoDataFound = ({ title }) => {
  const mode = useContext(context);
  return (
    <div className="flex items-center flex-col justify-center">
      <img src={noDataImage} alt="no-data" className="h-60" />
      <h1
        className={`text-18size md:text-24size text-center font-600 ${mode ? "text-white" : "text-black"}`}
      >
        {title}
      </h1>
    </div>
  );
};

export default NoDataFound;
