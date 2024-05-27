import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import CreateBlogDialog from "../Components/CreateBlogDialog";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import Loader from "../Common/Loader";
import { Zoom } from "react-awesome-reveal";
import NoDataFound from "../Common/NoDataFoun";
import BlogCard from "../Components/BlogCard";
import CategoryDropDown from "../Components/CategoryDropDown";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConnectionLost from "../Common/ConnectionLost";
import { Helmet } from "react-helmet";

const BlogsPage = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();

  const getAllBlogs = async () => {
    return await fetch(`${Baseurl.baseurl}/api/blog`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["blogsData"],
    queryFn: getAllBlogs,
  });

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
          queryClient.invalidateQueries("blogsData");
          toast.success(res.data.message);
          setIsOpenDialog(false);
        } else {
          toast.error(res.data.message);
          queryClient.invalidateQueries("blogsData");
        }
      })
      .catch((err) => {
        queryClient.invalidateQueries("blogsData");
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  const filteredRecords = selected
    ? data?.posts.filter((post) => post.categorey === selected.label)
    : data?.posts;

  return (
    <div className="space-y-6">
      <Helmet>
        <title>Explore Captivating Blogs</title>
        <meta name="description" content="Discover a spectrum of topics." />
      </Helmet>
      <div className="flex justify-end py-2 px-2 gap-3 rounded-md shadow bg-white">
        <CategoryDropDown
          category={selected}
          setCategory={setSelected}
          showLastOption={true}
        />
        <button
          onClick={() => setIsOpenDialog(true)}
          type="button"
          className="rounded-md bg-indigo-50  px-3 py-2 text-sm font-semibold text-indigo-600 border border-indigo-400 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
        >
          Create blog
        </button>
      </div>
      <div>
        {isPending ? (
          <Loader />
        ) : error ? (
          <ConnectionLost />
        ) : filteredRecords.length > 0 ? (
          <ul
            role="list"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredRecords.map((blog, idx) => (
              <Zoom key={idx} triggerOnce={true}>
                <li key={idx}>
                  <BlogCard
                    blog={blog}
                    showDeleteBtn={false}
                    handler={() => {}}
                  />
                </li>
              </Zoom>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center">
            <NoDataFound
              title={
                selected === null
                  ? "No data found at this moment"
                  : `No data found on ${selected.label} category`
              }
            />
            {selected === null && (
              <button
                onClick={() => setIsOpenDialog(true)}
                type="button"
                className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1 mt-2"
              >
                <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
                Create blog
              </button>
            )}
          </div>
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

export default BlogsPage;
