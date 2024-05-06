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

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
const CommentsDrawer = ({ openDrawer, setterFun, commentsData }) => {
  const mode = useContext(context);
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
                <div className="grow-0">
                  <p
                    className={`font-semibold text-18size tracking-wide ${
                      mode ? "text-white" : "text-black"
                    }`}
                  >
                    {data.userId.name.charAt(0).toUpperCase() +
                      data.userId.name.slice(1)}
                  </p>
                  <p className="text-gray-400 text-14size break-all">
                    {data.comment}
                  </p>
                  <div className="flex items-center space-x-4">
                    <button>
                      <HandThumbUpIcon
                        className={`h-4 w-4 ${
                          mode ? "text-white" : "text-black"
                        }`}
                      />
                    </button>
                    <button>
                      <HandThumbDownIcon
                        className={`h-4 w-4 ${
                          mode ? "text-white" : "text-black"
                        }`}
                      />
                    </button>
                    <button className={`${mode ? "text-white" : "text-balck"}`}>
                      reply
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
