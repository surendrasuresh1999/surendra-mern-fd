import { PlusCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import CreateBlogDialog from "../Components/CreateBlogDialog";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Avatar, CardHeader } from "@mui/material";

const people = [
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
  {
    name: "Jane Cooper",
    title: "Regional Paradigm Technician",
    role: "Admin",
    email: "janecooper@example.com",
    telephone: "+1-202-555-0170",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60",
  },
];

const HomePage = () => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  return (
    <div className="space-y-3">
      <div className="flex justify-end py-1">
        <button
          onClick={() => setIsOpenDialog(true)}
          type="button"
          className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100 flex items-center gap-1"
        >
          <PlusCircleIcon className="h-5 w-5 text-indigo-600" />
          Create blog
        </button>
      </div>
      <ul
        role="list"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {people.map((person, idx) => (
          <li key={idx}>
            <Card>
              <CardHeader
                avatar={<Avatar aria-label="recipe">R</Avatar>}
                title="Shrimp and Chorizo Paella"
                subheader="September 14, 2016"
              />
              <CardMedia
                sx={{ height: 200 }}
                image="https://media.istockphoto.com/id/1852550664/photo/whether-standing-proudly-in-garden-beds-accentuating-borders-or-gracing-bouquets.jpg?s=1024x1024&w=is&k=20&c=xYUSZ9PXaHJFSvcgXvTVFtlR39ZEwvSbt_IROwGWl9s="
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h1">
                  Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                </Typography>
              </CardContent>
              <CardActions className="flex items-center justify-between">
                <Link
                  to={`blog/${idx}`}
                  className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
                >
                  Read More
                </Link>
                <button className="rounded-md bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100">
                  Education
                </button>
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>

      {isOpenDialog && (
        <CreateBlogDialog openDialog={isOpenDialog} setter={setIsOpenDialog} />
      )}
    </div>
  );
};

export default HomePage;
