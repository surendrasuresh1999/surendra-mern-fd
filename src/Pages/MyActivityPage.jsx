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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import CreateBlogDialog from "../Components/CreateBlogDialog";
import { Helmet } from "react-helmet";

const MyActivityPage = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();

  const getAllUSerBlogPosts = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog/user`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["activityData"],
    queryFn: getAllUSerBlogPosts,
  });

  const handleToDeleteBlog = (blogId) => {
    swal({
      title: "Are you sure!",
      icon: "warning",
      text: "Once deleted, you will not be able to recover this blog!",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`${Baseurl.baseurl}/api/blog/${blogId}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                queryClient.invalidateQueries("activityData");
                toast.success(res.data.message);
              } else {
                toast.error(res.data.message);
                console.log("res", res);
              }
            })
            .catch((err) => {
              console.log("Error", err.message);
              toast.error(err.message);
            });
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCreateNewBlogPost = (postData) => {
    const data = {
      title: postData.uploadData.title,
      imageUrl: postData.uploadData.url,
      categorey: postData.category.label,
      discription: postData.uploadData.description,
    };
    axios
      .post(`${Baseurl.baseurl}/api/blog`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries("activityData");
          toast.success(res.data.message);
          setIsOpenDialog(false);
        } else {
          toast.error(res.data.message);
          queryClient.invalidateQueries("activityData");
        }
      })
      .catch((err) => {
        queryClient.invalidateQueries("activityData");
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div>
      <Helmet>
        <title>Stay Updated on Your Recent Actions</title>
        <meta
          name="description"
          content="Keep track of your recent activities and engagements with our Activity Tracker. Stay informed about your interactions, updates, and progress with ease."
        />
      </Helmet>
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : data.posts?.length > 0 ? (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {data.posts?.map((blog, idx) => (
            <Zoom key={idx} triggerOnce={true}>
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
        <div className="flex flex-col items-center justify-center space-y-3 pt-10">
          <NoDataFound title={"Sorry you didn't created any blog yet"} />
          <button
            onClick={() => setIsOpenDialog(true)}
            type="button"
            className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
          >
            <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
            Create blog
          </button>
        </div>
      )}
      {isOpenDialog && (
        <CreateBlogDialog
          openDialog={isOpenDialog}
          setter={setIsOpenDialog}
          handler={handleCreateNewBlogPost}
        />
      )}
    </div>
  );
};

export default MyActivityPage;
