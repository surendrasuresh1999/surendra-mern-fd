import React, { useRef, useEffect, useState } from "react";

const UploaderWidget = () => {
  const [showWidget, setShowWidget] = useState(false);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    if (showWidget) {
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
          } else {
            console.error("Error uploading image:", error);
          }
        }
      );
    }
  }, []);
  return (
    <button
      onClick={() => {
        setShowWidget(true);
        widgetRef.current.open();
      }}
      type="button"
      className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
    >
      Upload
    </button>
  );
};

export default UploaderWidget;
