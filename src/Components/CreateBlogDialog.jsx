import React, {
  forwardRef,
  useEffect,
  Fragment,
  useRef,
  useState,
  useContext,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Loader, XCircle } from "lucide-react";
import JoditEditor from "jodit-react";
import { ArrowUpTrayIcon } from "@heroicons/react/16/solid";
import "react-tooltip/dist/react-tooltip.css";
import toast from "react-hot-toast";
import { context } from "../Pages/CommonPage";
import CategoryDropDown from "./CategoryDropDown";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateBlogDialog = ({ openDialog, setter, handler }) => {
  const [showWidget, setShowWidget] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const mode = useContext(context);
  const [category, setCategory] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");
  const [uploadData, setUploadData] = useState({
    title: "",
    description: "",
    url: "",
  });
  const ConfigurationObj = {
    buttons: ["bold", "italic", "underline", "fontsize", "font"],
    toolbarAdaptive: false,
    height: "200px",
    hidePoweredByJodit: true,
    placeholder: "Start writing something...",
    statusbar: false,
    addNewLine: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: true,
    enableDragAndDropFileToEditor: false,
    defaultActionOnPaste: "insert_only_text",
    cleanHTML: true,
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
        // please note this don't use my credentials //
        cloudName: "dplj90agk",
        uploadPreset: "oblihw3n",
        // please note this don't use my credentials //
        uploadSignature: false,
        multiple: false,
        returnJustUrl: true,
        closeAfterUpload: false,
        sources: ["local", "url"],
        resourceType: "image",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Uploaded image URL:", result.info.url);
          setUploadData({ ...uploadData, url: result.info.url });
          setUploadedFileName(result.info.original_filename);
          setShowWidget(true);
        } else {
          if (error !== undefined || error !== null) {
            // console.log("Error uploading image:", error);
          }
          setShowLoader(false);
        }
      }
    );
    widgetRef.current.open();
    // Cleanup function
    return () => {
      if (widgetRef.current) {
        widgetRef.current.close();
      }
    };
  };
  const handleCreateBlog = () => {
    const data = { uploadData, category };
    if (
      uploadData.title !== "" &&
      uploadData.description !== "" &&
      uploadData.url !== "" &&
      category !== null
    ) {
      handler(data);
    } else {
      toast.error("Please select all fields are mandatory");
    }
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
        className={`${
          mode ? "bg-[#4d4c4c]" : "bg-slate-50"
        } flex flex-col sm:flex-row justify-between gap-4`}
      >
        <span
          className={`text-18size sm:text-22size ${
            mode ? "text-white" : "text-black"
          } font-700 flex items-center justify-between`}
        >
          Create a new Blog
          <span
            className="cursor-pointer block sm:hidden"
            onClick={() => setter(false)}
          >
            <XCircle color={mode ? "#FFF" : "#393939"} />
          </span>
        </span>
        <div className="flex items-center gap-2">
          <CategoryDropDown
            category={category}
            setCategory={setCategory}
            showLastOption={false}
          />
          <span
            className="cursor-pointer hidden sm:block"
            onClick={() => setter(false)}
          >
            <XCircle color={mode ? "#FFF" : "#393939"} />
          </span>
        </div>
      </DialogTitle>
      <DialogContent className={mode ? "bg-black" : "bg-white"} dividers={true}>
        <div className="space-y-2">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className={`text-14size sm:text-16size font-500  ${
                mode ? "text-white" : "text-gray-600"
              }`}
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
              className={`rounded-md outline-none ${
                mode ? "text-white" : "text-black"
              } bg-transparent`}
            />
          </div>
          <div>
            <span
              className={`text-14size py-1 sm:text-16size font-500 flex items-center justify-between ${
                mode ? "text-white" : "text-gray-600"
              }`}
            >
              Blog Content
            </span>
            <JoditEditor
              onBlur={(newContent) =>
                setUploadData({ ...uploadData, description: newContent })
              }
              value={uploadData.description}
              config={ConfigurationObj}
              className={mode ? "darkMode" : "lighMode"}
            />
            <div className="py-2">
              {showWidget ? (
                <p className={`${mode ? "text-white" : "text-black"}`}>
                  Your Choosen file: {uploadedFileName}
                </p>
              ) : (
                <button
                  onClick={() => {
                    handlerFun();
                    setShowLoader(true);
                  }}
                  type="button"
                  className="flex items-center justify-center min-w-40  gap-1 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  {showLoader ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <>
                      Upload image
                      <ArrowUpTrayIcon className="h-5 w-5 text-indigo-600" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions
        className={mode ? "bg-[#4d4c4c] border-t border-gray-400" : "bg-white"}
      >
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
