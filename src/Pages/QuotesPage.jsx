import { Avatar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import toast from "react-hot-toast";
import axios from "axios";
import { Baseurl } from "../BaseUrl";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import ConnectionLost from "../Common/ConnectionLost";
import Loader from "../Common/Loader";
import NoDataFound from "../Common/NoDataFoun";
import { PlusCircleIcon, HeartIcon as Filled } from "@heroicons/react/20/solid";
import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline";
import numeral from "numeral";
import { SquarePenIcon } from "lucide-react";
import swal from "sweetalert";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const QuotesPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [ediatable, setEdiatable] = useState(false);
  const [quoteObj, setQuoteObj] = useState({ quote: "", author: "" });
  const [quoteId, setQuoteId] = useState("");
  const userDetails = JSON.parse(localStorage.getItem("blogUserDetails"));
  const [searchedString, setSearchedString] = useState("");
  const jwtToken = Cookies.get("jwtToken");
  const queryClient = useQueryClient();

  const handleCreateQuote = () => {
    if (quoteObj.author !== "" && quoteObj.quote !== "") {
      const data = {
        author: quoteObj.author,
        quote: quoteObj.quote,
      };
      axios
        .post(`${Baseurl.baseurl}/api/quote`, data, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success(res.data.message);
            setQuoteObj({ quote: "", author: "" });
            queryClient.invalidateQueries("quotesData");
            setOpenDialog(false);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log("Error", err.message);
          toast.error(err.message);
        });
    } else {
      toast.error("Two fields must be non-empty");
    }
  };

  const handleEditQuote = () => {
    if (ediatable) {
      const data = {
        author: quoteObj.author,
        quote: quoteObj.quote,
      };
      if (quoteObj.author !== "" && quoteObj.quote !== "") {
        axios
          .put(`${Baseurl.baseurl}/api/quote/${quoteId}`, data, {
            headers: {
              Authorization: `Bearer ${jwtToken}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              toast.success(res.data.message);
              setQuoteObj({ quote: "", author: "" });
              setQuoteId("");
              setEdiatable(false);
              setOpenDialog(false);
              queryClient.invalidateQueries("quotesData");
            } else {
              toast.error(res.data.message);
            }
          })
          .catch((err) => {
            console.log("Error", err.message);
            toast.error(err.message);
          });
      } else {
        toast.error("All fields must be not empty");
      }
    }
  };

  const createQuoteDialogUi = () => {
    return (
      <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        maxWidth="sm"
        fullWidth={true}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle>
          <span className="font-700 text-black"> Create new Quote</span>
        </DialogTitle>
        <DialogContent dividers={true}>
          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <label
                htmlFor="author"
                className={`text-16size sm:text-16size font-500`}
              >
                Quote Author
              </label>
              <input
                type="text"
                value={quoteObj.author}
                onChange={(e) =>
                  setQuoteObj({ ...quoteObj, author: e.target.value })
                }
                id="author"
                placeholder="Enter quote author name..."
                className="outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                htmlFor="quote"
                className={`text-16size sm:text-16size font-500`}
              >
                Quote
              </label>
              <textarea
                name="quote-text"
                id="quote"
                value={quoteObj.quote}
                onChange={(e) =>
                  setQuoteObj({ ...quoteObj, quote: e.target.value })
                }
                rows={6}
                cols={8}
                style={{ resize: "none" }}
                placeholder="Type your quote here..."
                className="rounded-md outline-none"
              ></textarea>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <button
            onClick={() => {
              setOpenDialog(false);
              setQuoteObj({ quote: "", author: "" });
              setQuoteId("");
            }}
            className="flex items-center border border-red-400 justify-center gap-1 rounded-md bg-red-50 px-8 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
          >
            Cancel
          </button>
          <button
            onClick={ediatable ? handleEditQuote : handleCreateQuote}
            className="flex items-center border border-green-400 justify-center gap-1 rounded-md bg-green-50 px-8 py-2 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-100"
          >
            {ediatable ? "Update" : "Create"}
          </button>
        </DialogActions>
      </Dialog>
    );
  };

  const getAllQuotes = async () => {
    return await fetch(`${Baseurl.baseurl}/api/quote`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then((res) => res.json());
  };

  const { isPending, error, data } = useQuery({
    queryKey: ["quotesData"],
    queryFn: getAllQuotes,
  });

  const handleDropLikeForQuote = (quoteId) => {
    axios
      .put(`${Baseurl.baseurl}/api/quote/${quoteId}`, null, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
      .then((res) => {
        if (res.data.status === 200) {
          toast.success(res.data.message);
          queryClient.invalidateQueries("quotesData");
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

  const handleDeleteQuote = (quoteId) => {
    swal({
      title: "Are you sure!",
      icon: "warning",
      text: "Once deleted, you will not be able to recover this Quote!",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          axios
            .delete(`${Baseurl.baseurl}/api/quote/${quoteId}`, {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            })
            .then((res) => {
              if (res.status === 200) {
                toast.success(res.data.message);
                queryClient.invalidateQueries("quotesData");
              } else {
                queryClient.invalidateQueries("quotesData");
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

  const filteredQuotes =
    searchedString !== ""
      ? data.quotes.filter((quote) =>
          quote.author.toLowerCase().includes(searchedString.toLowerCase())
        )
      : data?.quotes;
  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-between py-2 px-2 gap-3 rounded-md shadow">
          <div className="grow">
            <input
              value={searchedString}
              onChange={(e) => setSearchedString(e.target.value)}
              type="text"
              className="outline-none w-full rounded-md border text-black"
              placeholder="Search quote based on author name"
            />
          </div>
          <button
            onClick={() => setOpenDialog(true)}
            className="rounded-md bg-indigo-50  px-3 py-2 text-sm font-semibold text-indigo-600 border border-indigo-400 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
          >
            Create Quote
          </button>
        </div>
        <div>
          {isPending ? (
            <Loader />
          ) : error ? (
            <ConnectionLost />
          ) : filteredQuotes.length > 0 ? (
            <div className="overflow-hidden rounded-md bg-white shadow space-y-3">
              <ul role="list" className="divide-y divide-gray-200">
                {filteredQuotes.map((item, index) => (
                  <li
                    key={index}
                    className="px-6 py-4 flex items-start space-x-4"
                  >
                    <Avatar>{item.author.slice(0, 2).toUpperCase()}</Avatar>
                    <div className="grow space-y-1">
                      <h3 className="font-600 text-14size tracking-wide sm:text-18size text-black">
                        ❝{item.quote}❞
                      </h3>
                      <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:items-center justify-between">
                        <span className="text-slate-500 font-500">
                          - {item.author}
                        </span>
                        <div className="flex items-center gap-4 mt-0">
                          <button
                            onClick={() => handleDropLikeForQuote(item._id)}
                            className="flex items-center gap-1 rounded-md bg-transparent text-sm font-semibold text-indigo-600 "
                          >
                            {item.likedUsers?.length > 0 &&
                              numeral(item.likedUsers?.length).format("0,a")}
                            {item.likedUsers?.includes(userDetails._id) ? (
                              <Filled className="text-orange-500 h-5 w-5" />
                            ) : (
                              <HeartIcon className="text-orange-500 h-5 w-5" />
                            )}
                          </button>
                          <button
                            onClick={() => {
                              if (item.user !== userDetails._id) {
                                toast.error(
                                  `Sorry you can't edit others quotes`
                                );
                              } else {
                                setEdiatable(true);
                                setQuoteObj({
                                  quote: item.quote,
                                  author: item.author,
                                });
                                setOpenDialog(true);
                                setQuoteId(item._id);
                              }
                            }}
                            className="flex items-center gap-1 rounded-md bg-transparent  text-sm font-semibold text-indigo-600 "
                          >
                            <SquarePenIcon color="#32d15d" size={18} />
                          </button>
                          <button
                            onClick={() => {
                              if (item.user !== userDetails._id) {
                                toast.error(
                                  `Sorry you can't delete others quotes`
                                );
                              } else {
                                handleDeleteQuote(item._id);
                              }
                            }}
                            className="flex items-center gap-1 rounded-md bg-transparent text-sm font-semibold text-indigo-600 "
                          >
                            <TrashIcon className="text-red-500 h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="flex flex-col items-center pt-10 sm:pt-4">
              <NoDataFound
                title={
                  searchedString !== ""
                    ? `No quote found on your ${searchedString}`
                    : "No data found at this moment"
                }
              />
              {searchedString === "" && (
                <button
                  onClick={() => setOpenDialog(true)}
                  type="button"
                  className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1 mt-2"
                >
                  <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
                  Create quote
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {openDialog && createQuoteDialogUi()}
    </>
  );
};

export default QuotesPage;
