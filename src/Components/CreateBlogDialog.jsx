import React, {
  forwardRef,
  useEffect,
  Fragment,
  useRef,
  useState,
} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { XCircle } from "lucide-react";
import JoditEditor from "jodit-react";
import {
  ArrowUpTrayIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import UploaderWidget from "./UploaderWidget";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { Listbox, RadioGroup, Transition as Headless } from "@headlessui/react";
import toast from "react-hot-toast";

const categoryOptions = [
  {
    id: 0,
    value: "00",
    label: "Sports",
  },
  {
    id: 1,
    value: "01",
    label: "Technology",
  },
  {
    id: 2,
    value: "02",
    label: "Education",
  },
  {
    id: 3,
    value: "03",
    label: "Science",
  },
  {
    id: 4,
    value: "04",
    label: "Entertainment",
  },
  {
    id: 5,
    value: "05",
    label: "Other",
  },
];

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const CreateBlogDialog = ({ openDialog, setter, handler }) => {
  const [showWidget, setShowWidget] = useState(false);
  const [category, setCategory] = useState(null);
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
    // call the create post api method here
  };
  const handleSelectedChange = (selectedValue) => {
    setCategory(selectedValue);
  };
  const categoryDropDownUi = () => {
    return (
      <div className="w-56">
        <Listbox value={category} onChange={handleSelectedChange}>
          <div className="relative ">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white border py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
              <span className="flex items-center gap-1 truncate font-medium">
                {category === null ? "Choose category" : <>{category.label}</>}
              </span>

              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Headless
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                {categoryOptions.map((person, personIdx) => (
                  <Listbox.Option
                    key={personIdx}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-blue-100 text-gray-900" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`truncate flex items-center ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.label}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Headless>
          </div>
        </Listbox>
      </div>
    );
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
        <div className="flex items-center gap-2">
          {categoryDropDownUi()}
          <span className="cursor-pointer" onClick={() => setter(false)}>
            <XCircle color="#393939" />
          </span>
        </div>
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
                  className="flex items-center gap-1 rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Upload image
                  <ArrowUpTrayIcon className="h-5 w-5 text-indigo-600" />
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
