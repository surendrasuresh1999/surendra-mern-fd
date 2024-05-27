import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Baseurl } from "../BaseUrl";
import { Avatar } from "@mui/material";
import ReactTimeAgo from "react-time-ago";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../Common/Loader";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  HeartIcon as Filled,
} from "@heroicons/react/16/solid";
import toast from "react-hot-toast";
import CommentsDrawer from "../Components/CommentsDrawer";
import { HeartIcon } from "@heroicons/react/24/outline";
import numeral from "numeral";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConnectionLost from "../Common/ConnectionLost";
import { Helmet } from "react-helmet";

const BlogDetailsPage = () => {
  const userDetails = JSON.parse(localStorage.getItem("blogUserDetails"));
  const [openCommentsSlider, setOpenCommentsSlider] = useState(false);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();

  const getBlogDetails = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog/${id}`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogData"],
    queryFn: getBlogDetails,
  });

  // create a new comment for the specified blog
  const handleCreateComment = () => {
    const data = { comment, blogId: id };
    axios
      .post(`${Baseurl.baseurl}/api/comments`, data, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("blogData");
          setComment("");
        } else {
          toast.error(res.data.message);
          console.log("res", res);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${Baseurl.baseurl}/api/comments/${commentId}/${id}`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          queryClient.invalidateQueries("blogData");
          toast.success(res.data.message);
          setOpenCommentsSlider(false);
        } else {
          toast.error(res.data.message);
          console.log("res", res);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  const handleUserOpinionOnComment = (commentId, actionType) => {
    axios
      .put(
        `${Baseurl.baseurl}/api/comments/${commentId}/${id}`,
        { type: actionType },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      )
      .then((res) => {
        if (res.data.status === 200) {
          queryClient.invalidateQueries("blogData");
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
  };

  // delete comment from the specified blog
  const handleReceiveCommentIdAndDeleteComment = (commentId, actionType) => {
    switch (actionType) {
      case "delete":
        return handleDeleteComment(commentId);
      case "like":
      case "unlike":
        return handleUserOpinionOnComment(commentId, actionType);
      default:
        return null;
    }
  };

  const handleDropLike = (blogId) => {
    axios
      .put(`${Baseurl.baseurl}/api/blog/${blogId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("blogData");
        } else {
          toast.error(res.data.message);
          console.log("res", res);
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="max-w-5xl m-auto">
      <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      {isPending ? (
        <Loader />
      ) : error ? (
        <ConnectionLost />
      ) : (
        <div className="space-y-4">
          <h1 className="text-black dark:text-white text-18size sm:text-30size font-600 tracking-wide">
            {data.posts.title}
          </h1>
          <img
            src={data.posts.imageUrl}
            alt="banner-img"
            className="max-h-96 w-full object-cover object-center rounded-md"
          />
          <>
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                  {data?.posts.user?.slice(0, 1).toUpperCase()}
                </Avatar>
                <div>
                  <p className="font-medium text-18size text-black dark:text-white">
                    {data?.posts.user?.charAt(0).toUpperCase() +
                      data?.posts.user?.slice(1)}
                  </p>
                  <span className="font-normal text-14size text-gray-700 dark:text-indigo-600">
                    <ReactTimeAgo
                      date={Date.parse(data?.posts.createdAt)}
                      locale="en-US"
                    />
                  </span>
                </div>
              </div>
              <div className="flex gap-2 flex-row-reverse">
                <button
                  onClick={() => handleDropLike(data.posts._id)}
                  className="flex items-center gap-1 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-indigo-600 "
                >
                  {data?.posts.likedUsers?.includes(userDetails._id) ? (
                    <Filled className="text-orange-500 h-6 w-6" />
                  ) : (
                    <HeartIcon className="text-orange-500 h-6 w-6" />
                  )}
                  {data?.posts.likedUsers?.length > 0 &&
                    numeral(data?.posts.likedUsers?.length).format("0,a")}
                </button>
              </div>
            </div>
            <div className="text-justify text-gray-600 dark:text-white">
              <div
                dangerouslySetInnerHTML={{
                  __html: data?.posts.discription,
                }}
                className="text-20size text-justify"
              />
            </div>
          </>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              className="p-1.5 rounded-md grow dark:bg-gray-700 dark:text-white"
              placeholder="Drop a comment..."
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <div className="shrink-0 flex items-center gap-4">
              <button
                onClick={() => {
                  if (comment === "") {
                    toast.error("Please enter a comment");
                  } else {
                    handleCreateComment();
                  }
                }}
                className="rounded-md bg-indigo-50 px-3 py-2 text-16size font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
              >
                Post
                <ArrowUpRightIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => setOpenCommentsSlider(true)}
                className="rounded-md bg-indigo-50 px-3 py-2 text-16size font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
              >
                All Comments
              </button>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-2 max-w-max"
          >
            <ArrowLeftIcon className="h-4 w-4 text-indigo-700" />
            Go Back
          </button>
        </div>
      )}
      {openCommentsSlider && (
        <CommentsDrawer
          commentsData={data?.posts.comments}
          openDrawer={openCommentsSlider}
          setterFun={setOpenCommentsSlider}
          handlerFun={handleReceiveCommentIdAndDeleteComment}
        />
      )}
    </div>
  );
};

export default BlogDetailsPage;
