import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
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

const HomePage = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [blogDataObj, setBlogDataObj] = useState({
    isFetching: true,
    data: [],
    error: false,
  });
  const [blogsArray, setBlogDataArray] = useState([]);
  const jwtToken = Cookies.get("jwtToken");
  const getAllBlogPosts = () => {
    axios
      .get(`${Baseurl.baseurl}/api/blog`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setBlogDataObj({
            ...blogDataObj,
            isFetching: false,
            data: res.data.posts,
          });
          setBlogDataArray(res.data.posts);
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
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data);
          getAllBlogPosts();
          toast.success(res.data.message);
          setIsOpenDialog(false);
        } else {
          toast.error(res.data.message);
          getAllBlogPosts();
        }
      })
      .catch((err) => {
        getAllBlogPosts();
        console.log("Error", err.message);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    if (selected !== null) {
      const filtered = blogsArray.filter(
        (obj) => obj.categorey === selected.label
      );
      setBlogDataObj({
        ...blogDataObj,
        isFetching: false,
        data: filtered,
      });
    } else {
      setBlogDataObj({
        ...blogDataObj,
        isFetching: false,
        data: blogsArray,
      });
    }
  }, [selected]);

  return (
    <div className="space-y-6">
      <div className="flex justify-end py-2 px-2 gap-3 rounded-md shadow">
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
            <button
              onClick={() => setIsOpenDialog(true)}
              type="button"
              className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1 mt-2"
            >
              <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
              Create blog
            </button>
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

export default HomePage;
