import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";
import { Avatar } from "@mui/material";
import ReactTimeAgo from "react-time-ago";

const AuthorsPage = () => {
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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMzMWNlMDc3M2ExOGUzZmIxY2FkOTEiLCJpYXQiOjE3MTQ2MjU3NjAsImV4cCI6MTcxNDg4NDk2MH0.fecs-cvkFOOF_RbhzQQwphMQIfNkg9Oa5e4s8ZUHUj0`,
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
              className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
            >
              <div className="flex-shrink-0">
                <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                  {person.name.slice(0, 1).toUpperCase()}
                </Avatar>
              </div>
              <div className="min-w-0 flex-1">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <p className="text-20size font-medium text-gray-900">
                    {person.name?.charAt(0).toUpperCase() +
                      person.name?.slice(1)}
                  </p>
                  <p className="truncate text-sm text-gray-500">
                    {person.email}
                  </p>
                  <p className="text-sm text-gray-500">
                    Joined{" "}
                    <ReactTimeAgo
                      date={Date.parse(person.createdAt)}
                      locale="en-US"
                    />
                  </p>
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default AuthorsPage;
