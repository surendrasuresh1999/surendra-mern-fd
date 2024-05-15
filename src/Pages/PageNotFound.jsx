import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import pageNotFound from "../assets/404page.svg";
const PageNotFound = () => {
  return (
    <div>
      <div className="h-screen bg-slate-100">
        <div className="mx-auto max-w-7xl text-center flex flex-col justify-center items-center h-screen px-6">
          <img
            src={pageNotFound}
            alt="page-not-found"
            className="h-64 w-auto"
          />
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-500 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-4 text-base text-gray-900 sm:mt-6 font-medium">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-5 flex justify-center">
            <Link
              to={"/"}
              className="inline-flex items-center gap-x-2 rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <ArrowLeft className="-mr-0.5 h-5 w-5" aria-hidden="true" />
              Go back home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
