import { Avatar } from "@mui/material";
import React, { forwardRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import toast from "react-hot-toast";

const items = [
  { id: 1, name: "sunny" },
  { id: 1, name: "sunny" },
];
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const QuotesPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [quoteObj, setQuoteObj] = useState({ quote: "", author: "" });

  const handleCreateQuote = () => {
    if (quoteObj.author !== "" && quoteObj.quote !== "") {
      console.log("quote object already", quoteObj);
      // handle api here
    } else {
      toast.error("Two fields must be non-empty");
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
            }}
            className="flex items-center border border-red-400 justify-center gap-1 rounded-md bg-red-50 px-8 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-100"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateQuote}
            className="flex items-center border border-green-400 justify-center gap-1 rounded-md bg-green-50 px-8 py-2 text-sm font-semibold text-green-600 shadow-sm hover:bg-green-100"
          >
            Create
          </button>
        </DialogActions>
      </Dialog>
    );
  };
  return (
    <>
      <div className="space-y-5">
        <div className="flex justify-end py-2 px-2 gap-3 rounded-md shadow">
          <button
            onClick={() => setOpenDialog(true)}
            className="rounded-md bg-indigo-50  px-3 py-2 text-sm font-semibold text-indigo-600 border border-indigo-400 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
          >
            Create Quote
          </button>
        </div>
        <div className="overflow-hidden rounded-md bg-white shadow space-y-3">
          <ul role="list" className="divide-y divide-gray-200">
            {items.map((item) => (
              <li
                key={item.id}
                className="px-6 py-4 flex items-center space-x-4"
              >
                {/* Your content */}
                <Avatar>{item.name.slice(0, 1).toUpperCase()}</Avatar>
                <div>
                  <h3 className="font-600 text-18size text-black">
                    {item.name}
                  </h3>
                  <p className="font-400 text-12size text-gray-900">
                    {item.name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {openDialog && createQuoteDialogUi()}
    </>
  );
};

export default QuotesPage;
