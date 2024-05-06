import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React from "react";
import Slide from "@mui/material/Slide";
import {
  HandThumbDownIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

function Transition(props) {
  return <Slide direction="down" {...props} />;
}
const CommentsDrawer = ({ openDrawer, setterFun }) => {
  return (
    <Dialog
      TransitionComponent={Transition}
      open={openDrawer}
      onClose={() => setterFun(false)}
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>All Comments</DialogTitle>
      <DialogContent dividers={true}>
        <ul className="space-y-5">
          {[1, 2, 3, 4].map((data) => (
            <li className="flex items-start gap-2">
              <Avatar sx={{ width: 50, height: 50, fontSize: "24px" }}>
                s
              </Avatar>
              <div>
                <p>Name</p>
                <span>comment here</span>
                <div className="flex items-center space-x-4">
                  <button>
                    <HandThumbUpIcon className="h-4 w-4" />
                  </button>
                  <button>
                    <HandThumbDownIcon className="h-4 w-4" />
                  </button>
                  <button>reply</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setterFun(false)}>Okay</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommentsDrawer;
