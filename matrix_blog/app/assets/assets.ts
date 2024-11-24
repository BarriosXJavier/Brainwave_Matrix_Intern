export interface BlogData {
  id: number;
  title: string;
  description: string;
  image: string;
  date: number;
  category: string;
  author: string;
  author_img: string;
}

export const blog_data: BlogData[] = [
  {
    id: 1,
    title: "The AI Revolution",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies ultricies. Nullam nec purus nec nunc ultricies ultricies.",
    image:
      "https://images.unsplash.com/photo-1634170380004-3b3b3b3b3b3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzN8MHwxfGFsbHwxf",
    date: Date.now(),
    category: "AI",
    author: "John Doe",
    author_img: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    title: "Quantum Computing: A New Paradigm",
    description: "Exploring the future of computational power.",
    image:
      "https://images.unsplash.com/photo-1581091870621-1f18b9b1d7d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzN8MHwxfGFsbHwxf",
    date: Date.now(),
    category: "Technology",
    author: "Jane Smith",
    author_img: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    title: "The Ethics of AI",
    description: "Navigating the moral maze of artificial intelligence.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzN8MHwxfGFsbHwxf",
    date: Date.now(),
    category: "Ethics",
    author: "Alice Johnson",
    author_img: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    title: "Blockchain Beyond Bitcoin",
    description:
      "Understanding the broader applications of blockchain technology.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzN8MHwxfGFsbHwxf",
    date: Date.now(),
    category: "Blockchain",
    author: "Bob Brown",
    author_img: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    title: "Cybersecurity in the Modern Age",
    description: "Protecting data in an increasingly digital world.",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMjIwNzN8MHwxfGFsbHwxf",
    date: Date.now(),
    category: "Cybersecurity",
    author: "Charlie Davis",
    author_img: "https://randomuser.me/api/portraits/men/5.jpg",
  },
];
