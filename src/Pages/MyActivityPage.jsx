import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Loader from "../Common/Loader";
import { Zoom } from "react-awesome-reveal";
import BlogCard from "../Components/BlogCard";
import NoDataFound from "../Common/NoDataFoun";
import { PlusCircleIcon } from "lucide-react";
import swal from "sweetalert";
const MyActivityPage = () => {
  const [blogDataObj, setBlogDataObj] = useState({
    isFetching: true,
    data: [],
    error: false,
  });
  const jwtToken = Cookies.get("jwtToken");

  const getAllUSerBlogPosts = () => {
    axios
      .get(`${Baseurl.baseurl}/api/blog/user`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("data", res.data.posts);
          setBlogDataObj({
            ...blogDataObj,
            isFetching: false,
            data: res.data.posts,
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
    getAllUSerBlogPosts();
  }, []);

  const handleToDeleteBlog = (blogId) => {
    console.log("handleToDeleteBlog", blogId);
    swal({
      title: "Are you sure!",
      icon: "warning",
      text: "Once deleted, you will not be able to recover this blog!",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        console.log(willDelete);
        if (willDelete) {
          axios
            .delete(`${Baseurl.baseurl}/api/blog/${blogId}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                getAllUSerBlogPosts();
                toast.success(res.data.message);
              } else {
                getAllUSerBlogPosts();
                toast.error(res.data.message);
                console.log("res", res);
              }
            })
            .catch((err) => {
              getAllUSerBlogPosts();
              console.log("Error", err.message);
              toast.error(err.message);
            });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div>
      {blogDataObj.isFetching ? (
        <Loader />
      ) : blogDataObj.data?.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {blogDataObj.data?.map((blog, idx) => (
            <Zoom key={idx}>
              <li key={idx}>
                <BlogCard
                  blog={blog}
                  showDeleteBtn={true}
                  handler={handleToDeleteBlog}
                />
              </li>
            </Zoom>
          ))}
        </ul>
      ) : (
        <>
          <NoDataFound title={"No data found at this moment"} />
          <button
            onClick={() => setIsOpenDialog(true)}
            type="button"
            className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
          >
            <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
            Create blog
          </button>
        </>
      )}
    </div>
  );
};

export default MyActivityPage;
