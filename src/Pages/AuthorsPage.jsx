import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";
import { Avatar } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { context } from "./CommonPage";
import NoDataFound from "../Common/NoDataFoun";

const AuthorsPage = () => {
  const mode = useContext(context);
  const [blogDataObj, setBlogDataObj] = useState({
    isFetching: true,
    data: [],
    error: false,
  });
  const jwtToken = Cookies.get("jwtToken");
  const getAllAuthors = () => {
    axios
      .get(`${Baseurl.baseurl}/api/user/all`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          setBlogDataObj({
            ...blogDataObj,
            isFetching: false,
            data: res.data,
          });
        } else {
          toast.error(res.data.message);
          setBlogDataObj({ ...blogDataObj, isFetching: false, data: [] });
          console.log("res", res);
        }
      })
      .catch((err) => {
        setBlogDataObj({ ...blogDataObj, isFetching: false, data: [] });
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    getAllAuthors();
  }, []);
  
  return (
    <div>
      {blogDataObj.isFetching ? (
        <Loader />
      ) : blogDataObj.data?.length > 0 ? (
        <ul role="list" className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {blogDataObj.data?.map((person, index) => (
            <li
              key={index}
              className={`relative flex items-center space-x-3 rounded-lg border border-gray-300 ${
                mode ? "bg-[#4d4c4c] border-gray-500" : "bg-white"
              } px-6 py-4 shadow-sm`}
            >
              <div className="flex-shrink-0">
                <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                  {person.name.slice(0, 1).toUpperCase()}
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <div className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p
                    className={`text-20size font-medium ${
                      mode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {person.name?.charAt(0).toUpperCase() +
                      person.name?.slice(1)}
                  </p>
                  <p
                    className={`truncate text-sm ${
                      mode ? "text-gray-200" : "text-gray-500"
                    } `}
                  >
                    {person.email}
                  </p>
                  <p className={`text-sm text-slate-500 tracking-wide`}>
                    Joined{" "}
                    <ReactTimeAgo
                      date={Date.parse(person.createdAt)}
                      locale="en-US"
                    />
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center">
          <NoDataFound title={"No authores data found at this moment"} />
        </div>
      )}
    </div>
  );
};

export default AuthorsPage;
