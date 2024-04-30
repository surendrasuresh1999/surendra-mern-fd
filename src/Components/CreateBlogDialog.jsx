import React, { forwardRef, useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { XCircle } from "lucide-react";
import JoditEditor from "jodit-react";
import { ExclamationCircleIcon } from "@heroicons/react/16/solid";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import UploaderWidget from "./UploaderWidget";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateBlogDialog = ({ openDialog, setter }) => {
  const [showWidget, setShowWidget] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    url: "",
  });
  const ConfigurationObj = {
    buttons: [
      "bold",
      "italic",
      "underline",
      // "undo",
      // "redo",
      "fontsize",
      "font",
    ],
    toolbarAdaptive: false,
    height: "200px",
    hidePoweredByJodit: true,
    placeholder: "Start writing something...",
    statusbar: false,
    addNewLine: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    enableDragAndDropFileToEditor: false,
    disablePlugins: "paste,resizer,resize-handler,image",
    uploader: {
      insertImageAsBase64URI: true,
    },
  };
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  const handlerFun = () => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dplj90agk",
        uploadPreset: "oblihw3n",
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          console.log("Uploaded image URL:", result.info.url);
          console.log(
            "Uploaded result.info.original_filename:",
            result.info.original_filename
          );
          setUploadData({ ...uploadData, url: result.info.url });
          setUploadedFileName(result.info.original_filename);
          setShowWidget(true);
        } else {
          if (error !== undefined || error !== null) {
            console.log("Error uploading image:", error);
          }
        }
      }
    );
    widgetRef.current.open();
  };
  const handleCreateBlog = () => {
    console.log("editor data", uploadData);
    // call the create post api method here
  };
  return (
    <Dialog
      open={openDialog}
      TransitionComponent={Transition}
      keepMounted
      fullWidth={true}
      maxWidth={"md"}
      onClose={() => setter(false)}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "8px 24px",
        }}
        className="bg-slate-50"
      >
        <span className="text-14size sm:text-22size font-700">
          Create a new Blog
        </span>
        <span className="cursor-pointer" onClick={() => setter(false)}>
          <XCircle color="#393939" />
        </span>
      </DialogTitle>
      <DialogContent dividers={true}>
        <div className="space-y-2">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-14size sm:text-16size font-500 text-gray-600"
            >
              Title
            </label>
            <input
              value={uploadData.title}
              onChange={(e) =>
                setUploadData({ ...uploadData, title: e.target.value })
              }
              type="text"
              id="title"
              className="rounded-md outline-none"
            />
          </div>
          <div>
            <span className="text-14size py-1 sm:text-16size font-500 text-gray-600 flex items-center justify-between">
              Blog Content
            </span>
            <JoditEditor
              onBlur={(newContent) =>
                setUploadData({ ...uploadData, description: newContent })
              }
              value={uploadData.description}
              config={ConfigurationObj}
            />
            <div className="py-2">
              {showWidget ? (
                <p>This is Choosen file: {uploadedFileName}</p>
              ) : (
                <button
                  onClick={() => {
                    handlerFun();
                  }}
                  type="button"
                  className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setter(false)} sx={{ border: "1px solid" }}>
          Cancel
        </Button>
        <Button
          type="submit"
          sx={{ border: "1px solid" }}
          onClick={handleCreateBlog}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBlogDialog;
