import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ReactTimeAgo from "react-time-ago";
import { Link } from "react-router-dom";
import { Avatar, CardHeader, IconButton } from "@mui/material";
import { TrashIcon } from "@heroicons/react/16/solid";

const BlogCard = ({ blog, showDeleteBtn, handler }) => {
  return (
    <Card className="card flex flex-col">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            {blog?.user?.slice(0, 1).toUpperCase()}
          </Avatar>
        }
        action={
          showDeleteBtn ? (
            <IconButton
              onClick={() => {
                handler(blog._id);
              }}
              aria-label="settings"
            >
              <TrashIcon className="h-6 w-6 text-red-500" />
            </IconButton>
          ) : null
        }
        title={
          <p className="text-18size font-600 text-black dark:text-white">
            {blog?.user?.charAt(0).toUpperCase() + blog?.user?.slice(1)}
          </p>
        }
        subheader={
          <ReactTimeAgo
            date={Date.parse(blog?.createdAt)}
            locale="en-US"
            className="dark:text-gray-100"
          />
        }
      />
      <CardMedia sx={{ height: 200 }} image={blog.imageUrl} />
      <CardContent sx={{ height: 180 }}>
        <Typography
          gutterBottom
          variant="h5"
          component="h1"
          className="truncate text-black"
        >
          {blog.title.charAt(0).toUpperCase() + blog.title.slice(1)}
        </Typography>
        <div>
          <div
            className="dangers"
            dangerouslySetInnerHTML={{
              __html: blog?.discription,
            }}
          />
        </div>
      </CardContent>
      <CardActions className="flex items-center justify-between">
        <Link
          to={`${blog._id}`}
          className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
        >
          Read More
        </Link>
        <button className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
          {blog.categorey}
        </button>
      </CardActions>
    </Card>
  );
};

export default BlogCard;
