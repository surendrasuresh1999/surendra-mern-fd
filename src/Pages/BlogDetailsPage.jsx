import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import { Avatar } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { Link, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";

const BlogDetailsPage = () => {
  const [blogDataObj, setBlogDataObj] = useState({
    isFetching: true,
    data: {},
    error: false,
  });
  const { id } = useParams();
  const jwtToken = Cookies.get("jwtToken");

  useEffect(() => {
    axios
      .get(`${Baseurl.baseurl}/api/blog/${id}`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMzMWNlMDc3M2ExOGUzZmIxY2FkOTEiLCJpYXQiOjE3MTQ2MjU3NjAsImV4cCI6MTcxNDg4NDk2MH0.fecs-cvkFOOF_RbhzQQwphMQIfNkg9Oa5e4s8ZUHUj0`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setBlogDataObj({
            ...blogDataObj,
            isFetching: false,
            data: res.data.posts,
          });
        } else {
          toast.error(res.data.message);
          setBlogDataObj({ ...blogDataObj, isFetching: false, data: {} });
          console.log("res", res);
        }
      })
      .catch((err) => {
        setBlogDataObj({ ...blogDataObj, isFetching: false, data: {} });
        console.log("Error", err.message);
        toast.error(err.message);
      });
  }, []);
  return (
    <div className="max-w-5xl m-auto">
        {blogDataObj.isFetching ? (
          <Loader />
        ) : (
          <div className="space-y-6">
            <h1 className="text-black dark:text-white text-20size sm:text-24size font-600 tracking-wide">{blogDataObj.data.title}</h1>
            <img
              src={blogDataObj.data.imageUrl}
              alt="banner-img"
              className="max-h-96 w-full object-cover object-center rounded-md"
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                  {blogDataObj.data.user.slice(0, 1).toUpperCase()}
                </Avatar>
                <div>
                  <p className="font-medium text-18size text-black dark:text-white">
                    {blogDataObj.data?.user?.charAt(0).toUpperCase() +
                      blogDataObj.data?.user?.slice(1)}
                  </p>
                  <span className="font-normal text-14size text-gray-700 dark:text-indigo-600">
                    <ReactTimeAgo
                      date={Date.parse(blogDataObj.data?.createdAt)}
                      locale="en-US"
                    />
                  </span>
                </div>
              </div>
              <div>
                <button className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
                  {blogDataObj.data?.categorey}
                </button>
              </div>
            </div>
            <div className="text-justify text-gray-600 dark:text-white">
              <div
                dangerouslySetInnerHTML={{
                  __html: blogDataObj.data?.discription,
                }}
                className="text-20size text-justify"
              />
            </div>
            <p className="text-black dark:text-white">
              <b>No more content...</b>
            </p>
            <Link
              to={"/"}
              className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-2 max-w-max"
            >
              <ArrowLeftIcon className="h-4 w-4 text-indigo-700" />
              Go Back
            </Link>
          </div>
        )}
      </div>
  );
};

export default BlogDetailsPage;
