import sportImage from "../assets/sports.png";
import Technology from "../assets/robotic-hand.png";
import Education from "../assets/education.png";
import Science from "../assets/flask.png";
import Entertainment from "../assets/popcorn.png";
import freindship from "../assets/friend.png";
import funny from "../assets/funny.png";
import love from "../assets/heart.png";
import inspiration from "../assets/inspiration.png";
import knowledge from "../assets/knowledge-base.png";
import motivation from "../assets/motivation (1).png";
import Other from "../assets/other.png";
import blogImg from "../assets/books.png";
import quoteImg from "../assets/fountain-pen.png";
import authorImg from "../assets/writer.png";

export const indianStatesArray = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

export const sizesObj = [
  "XXS",
  "XS",
  "S",
  "M",
  "LG",
  "XL",
  "XXL",
  "2XL",
  "3XL",
];

export const categoryOptions = [
  {
    id: 0,
    value: "00",
    label: "Sports",
    img: sportImage,
  },
  {
    id: 1,
    value: "01",
    label: "Technology",
    img: Technology,
  },
  {
    id: 2,
    value: "02",
    label: "Education",
    img: Education,
  },
  {
    id: 3,
    value: "03",
    label: "Science",
    img: Science,
  },
  {
    id: 4,
    value: "04",
    label: "Entertainment",
    img: Entertainment,
  },
  {
    id: 5,
    value: "05",
    label: "Other",
    img: Other,
  },
];

export const quotesTopics = [
  {
    id: 0,
    value: "00",
    label: "Friendship",
    img: freindship,
  },
  {
    id: 1,
    value: "01",
    label: "Funny",
    img: funny,
  },
  {
    id: 2,
    value: "02",
    label: "Love",
    img: love,
  },
  {
    id: 3,
    value: "03",
    label: "Inspirational",
    img: inspiration,
  },
  {
    id: 4,
    value: "04",
    label: "Knowledge",
    img: knowledge,
  },
  {
    id: 5,
    value: "05",
    label: "Motivational",
    img: motivation,
  },
  {
    id: 6,
    value: "06",
    label: "Sports",
    img: sportImage,
  },
  {
    id: 7,
    value: "07",
    label: "Other",
    img: Other,
  },
];

export const primaryFeatures = [
  {
    name: "Blogosphere",
    description:
      "Explore a diverse collection of thought-provoking blogs covering a wide range of topics. From technology to lifestyle, our blog page offers a blend of informative articles, personal reflections, and expert opinions to satisfy every reader's curiosity.",
    href: "#",
    icon: blogImg,
    path: "/blogs",
  },
  {
    name: "Quote Corner",
    description:
      "Seeking inspiration and motivation? Discover profound wisdom and timeless truths on our quotes page. Immerse yourself in a collection of insightful quotes from renowned thinkers, philosophers, and visionaries, empowering you to embrace life's journey with courage and optimism.",
    href: "#",
    icon: quoteImg,
    path: "/quotes",
  },
  {
    name: "Meet Our Authors",
    description:
      "Meet the brilliant minds behind our captivating content! Our authors page introduces you to a talented community of writers, each with a unique voice and perspective. From seasoned professionals to emerging talents, explore the diverse backgrounds and literary styles of our esteemed authors.",
    href: "#",
    icon: authorImg,
    path: "/authors",
  },
];