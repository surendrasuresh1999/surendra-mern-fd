import React, { forwardRef, useEffect, useState } from "react";
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

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateBlogDialog = ({ openDialog, setter }) => {
  const ConfigurationObj = {
    buttons: [
      "bold",
      "italic",
      "underline",
      "undo",
      "redo",
      "image",
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
    disablePlugins: "paste,resizer,resize-handler",
    uploader: {
      insertImageAsBase64URI: true,
    },
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
        }}
        className="bg-slate-50"
      >
        <span className="text-14size sm:text-22size font-700">Create a new Blog</span>
        <span className="cursor-pointer" onClick={() => setter(false)}>
          <XCircle color="#393939" />
        </span>
      </DialogTitle>
      <DialogContent dividers="paper">
        <div className="space-y-3">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-14size sm:text-16size font-500 text-gray-600"
            >
              Title
            </label>
            <input type="text" id="title" className="rounded-md outline-none" />
          </div>
          <div>
            <span className="text-14size py-1 sm:text-16size font-500 text-gray-600 flex items-center justify-between">
              Blog Content
              <span
              className="cursor-pointer"
                data-tooltip-id="edit"
                data-tooltip-content="for uploading image please use drag and drop, instead of image url method"
              >
                <ExclamationCircleIcon className="h-4 w-4 text-gray-500" />
              </span>
            </span>
            <Tooltip id="edit" variant="warning" place="top" />
            <JoditEditor config={ConfigurationObj} />
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setter(false)} sx={{ border: "1px solid" }}>
          Cancel
        </Button>
        <Button type="submit" sx={{ border: "1px solid" }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBlogDialog;
