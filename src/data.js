import image from "../src/assets/image.png"
import image2 from "../src/assets/image (1).png"
import image3 from "../src/assets/image (2).png"
import image4 from "../src/assets/image (3).png"
import image5 from "../src/assets/image (4).png"
import image6 from "../src/assets/image (5).png"
import image7 from "../src/assets/image (6).png"
import image8 from "../src/assets/image (7).png"
import image9 from "../src/assets/image (8).png"


export const links=[{
    id:1,
    pathName: "Home",
    to:"/",
},{
    id:2,
    pathName: "Events",
    to:"/events",
},{
    id:3,
    pathName: "Create Event",
    to:"/createEvent",
},]

export const events = [
  {
    id: 1,
    image: image,
    title: "Iron Maiden World Tour",
    host: "Iron Maiden",
    category: "Concert",
    location: "Teslim Balogun Stadium, Surulere",
    date: "Aug 30, 2024",
    price: {
      free: true,
      regular: 0,
      vip: 0,
    },
    tags: ["music", "entertainment", "dance"],
  },
  {
    id: 2,
    image: image4,
    title: "Digital Marketing Course",
    host: "John Doe",
    category: "Education",
    location: "Online",
    date: "Oct 30, 2024",
    price: {
      free: false,
      regular: 3000,
      vip: 4000,
    },
    tags: ["marketing", "learning", "money"],
  },
  {
    id: 3,
    image: image3,
    title: "Detty December House Party",
    host: "Party Freaks",
    category: "Party",
    location: "Radisson Blu, Lagos, Nigeria",
    date: "Dec 30, 2024",
    price: {
      free: false,
      regular: 4000,
      vip: 7000,
    },
    tags: ["music", "entertainment", "dance"],
  },
  {
    id: 4,
    image: image6,
    title: "Anthony Joshua VS Dubois",
    host:"Boxing federation",
    category: "Sports",
    location: "Teslim Balogun Stadium, Surulere",
    date: "July 30, 2024",
    price: {
      free: true,
      regular: 0,
      vip: 0,
    },
    tags: ["boxing", "fight", "entertainment"],
  },
  {
    id: 5,
    image: image5,
    title: "Mainland Block Party",
    host: "Tizzle",
    category: "Party",
    location: "Downtown, Lagos",
    date: "Dec 24, 2024",
    price: {
      free: false,
      regular: 6000,
      vip: 12000,
    },
    tags: ["music", "entertainment", "dance"],
  },
  {
    id: 6,
    image: image2,
    title: "The Experience 2024",
    host: "Can",
    category: "Concert",
    location: "Teslim Balogun Stadium, Surelere",
    date: "Dec 30, 2024",
    price: {
      free: true,
      regular: 0,
      vip: 0,
    },
    tags: ["worship", "song", "prayer"],
  },
  {
    id: 7,
    image: "https://miro.medium.com/v2/resize:fit:1400/0*dZSofujfR0rZzSDM",
    title: "Code With Timi",
    host: "Timi",
    category: "Tech",
    location: "online",
    date: "Nov 26, 2024",
    price: {
      free: true,
      regular: 0,
      vip: 0,
    },
    tags: ["Education", "Code", "Tech"],
  },
    {
    id: 8,
    image: "https://img.uefa.com/imgml/uefacom/ucl/social/og-matches.jpg",
    title: "Champions League streaming Concert Day 1",
    host: "SoccerStream",
    category: "Sports",
    location: "Ikeja City Mall, Ikeja, Lagos",
    date: " October 1, 2025",
    price: {
      free: true,
      regular: 0,
      vip: 0,
    },
    tags: ["Sports", "entertainment", "culture"],
  },
   {
    id: 9,
    image: "https://img.uefa.com/imgml/uefacom/ucl/social/og-matches.jpg",
    title: "Champions League streaming concert Day 2",
    host: "SoccerStream",
    category: "Sports",
    location: "Ikeja City Mall, Ikeja, Lagos",
    date: " October 2, 2025",
    price: {
      free: true,
      regular: 0,
      vip: 0,
    },
    tags: ["Sports", "entertainment", "culture"],
  },
];
