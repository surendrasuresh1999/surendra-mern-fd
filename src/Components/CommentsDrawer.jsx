import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import Slide from "@mui/material/Slide";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";
import { context } from "../Pages/CommonPage";
import NoDataFound from "../Common/NoDataFoun";
import {
  TrashIcon,
  HandThumbDownIcon as FilledDown,
  HandThumbUpIcon as FilledUP,
} from "@heroicons/react/20/solid";
import numeral from "numeral";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
const CommentsDrawer = ({
  openDrawer,
  setterFun,
  commentsData,
  handlerFun,
}) => {
  const userDetails = JSON.parse(localStorage.getItem("blogUserDetails"));
  const mode = useContext(context);
  console.log(commentsData);
  return (
    <Dialog
      TransitionComponent={Transition}
      open={openDrawer}
      onClose={() => setterFun(false)}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle
        className={`${
          mode ? "bg-[#4d4c4c] text-white" : "bg-slate-50 text-black"
        }`}
        sx={{ fontWeight: 700, fontSize: "22px" }}
      >
        All Comments
      </DialogTitle>
      <DialogContent
        dividers={true}
        className={`${mode ? "bg-black" : "bg-slate-50"}`}
      >
        {commentsData.length > 0 ? (
          <ul className="space-y-5">
            {commentsData.map((data, index) => (
              <li className="flex items-start gap-2" key={index}>
                <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                  {data.userId.name.slice(0, 1).toUpperCase()}
                </Avatar>
                <div className="flex flex-col grow space-y-1">
                  <div className="flex items-cente justify-between">
                    <p
                      className={`font-semibold text-18size tracking-wide ${
                        mode ? "text-white" : "text-black"
                      }`}
                    >
                      {data.userId.name.charAt(0).toUpperCase() +
                        data.userId.name.slice(1)}
                    </p>
                    <button onClick={() => handlerFun(data._id, "delete")}>
                      <TrashIcon className="h-6 w-6 text-gray-500" />
                    </button>
                  </div>
                  <p className="text-gray-400 text-14size break-all">
                    {data.comment}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handlerFun(data._id, "like")}
                      className="flex items-center gap-1"
                    >
                      {console.log(
                        "yes",
                        data.likedUsers.includes(userDetails._id)
                      )}
                      {data.likedUsers.includes(userDetails._id) ? (
                        <FilledUP className={`h-4 w-4 text-orange-600`} />
                      ) : (
                        <HandThumbUpIcon className={`h-4 w-4 text-gray-600`} />
                      )}
                      {data.likedUsers.length > 0 ? (
                        <span className="text-gray-500 font-500 text-12size tracking-wide">
                          {data.likedUsers.length}
                        </span>
                      ) : null}
                    </button>
                    <button
                      className="flex items-center gap-1"
                      onClick={() => handlerFun(data._id, "unlike")}
                    >
                      {/* {console.log(
                        "yes",
                        data.dislikedUsers.includes(userDetails._id)
                      )} */}
                      {data.dislikedUsers.includes(userDetails._id) ? (
                        <FilledDown className="h-4 w-4 text-orange-600" />
                      ) : (
                        <HandThumbDownIcon className="h-4 w-4 text-gray-600" />
                      )}
                      {data.dislikedUsers.length > 0 ? (
                        <span className="text-gray-500 font-500 text-12size tracking-wide">
                          {numeral(data.dislikedUsers.length).format("0,a")}
                        </span>
                      ) : null}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <NoDataFound title={"No Comments are available at this moment"} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CommentsDrawer;
