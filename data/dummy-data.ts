export interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

const events: Event[] = [
  {
    id: "e1",
    title: "Programming for everyone",
    description:
      "Level-up your web dev career. Join thousands of ambitious developers who want to scale their careers. You are going to learn HTML, CSS, JS, and more!",
    location: "Online",
    date: "2021-05-12",
    image: "images/coding-event.jpg",
    isFeatured: false,
  },
  {
    id: "e2",
    title: "Learn React.js",
    description:
      "Dive in and learn React.js from scratch! Learn Reactjs fundamentals, Hooks, Redux, React Routing, Animations, and more!",
    location: "Online",
    date: "2021-05-30",
    image: "images/learn-reactjs.jpg",
    isFeatured: true,
  },
  {
    id: "e3",
    title: "Learn Next.js",
    description:
      "Learn Next.js from the ground up and build production-ready, fullstack applications!",
    location: "Online",
    date: "2022-04-10",
    image: "images/learn-nextjs.jpg",
    isFeatured: true,
  },
];
