import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import CreateBlogDialog from "../Components/CreateBlogDialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Avatar, CardHeader } from "@mui/material";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import ReactTimeAgo from "react-time-ago";
import Loader from "../Common/Loader";

const HomePage = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [blogDataObj, setBlogDataObj] = useState({
    isFetching: true,
    data: [],
    error: false,
  });
  const jwtToken = Cookies.get("jwtToken");
  const getAllBlogPosts = () => {
    axios
      .get(`${Baseurl.baseurl}/api/blog`, {
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
    getAllBlogPosts();
  }, []);

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
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjMzMWNlMDc3M2ExOGUzZmIxY2FkOTEiLCJpYXQiOjE3MTQ2MjU3NjAsImV4cCI6MTcxNDg4NDk2MH0.fecs-cvkFOOF_RbhzQQwphMQIfNkg9Oa5e4s8ZUHUj0`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data);
          getAllBlogPosts();
          toast.success(res.data.message);
          setIsOpenDialog(false);
        } else {
          toast.error(res.data.message);
          getAllBlogPosts();
          console.log("res", res);
        }
      })
      .catch((err) => {
        getAllBlogPosts();
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-end py-1">
        <button
          onClick={() => setIsOpenDialog(true)}
          type="button"
          className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
        >
          <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
          Create blog
        </button>
      </div>
      <div>
        {blogDataObj.isFetching ? (
          <Loader />
        ) : blogDataObj.data?.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogDataObj.data?.map((blog, idx) => (
              <li key={idx}>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe">
                        {blog?.user?.slice(0, 1).toUpperCase()}
                      </Avatar>
                    }
                    title={
                      <p className="text-18size font-600 text-black">
                        {blog?.user?.charAt(0).toUpperCase() +
                          blog?.user?.slice(1)}
                      </p>
                    }
                    subheader={
                      <ReactTimeAgo
                        date={Date.parse(blog?.createdAt)}
                        locale="en-US"
                      />
                    }
                  />
                  <CardMedia sx={{ height: 200 }} image={blog.imageUrl} />
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h1"
                      className="truncate"
                    >
                      {blog.title}
                    </Typography>
                    <div className="h-20 overflow-hidden">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: blog?.discription + "...",
                        }}
                      />
                    </div>
                  </CardContent>
                  <CardActions className="flex items-center justify-between">
                    <Link
                      to={`blog/${blog._id}`}
                      className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                    >
                      Read More
                    </Link>
                    <button className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
                      {blog.categorey}
                    </button>
                  </CardActions>
                </Card>
              </li>
            ))}
          </ul>
        ) : (
          <div>No data found</div>
        )}
      </div>
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

export default HomePage;
