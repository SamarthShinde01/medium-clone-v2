import { useBlogsQuery } from "@/slices/blogApiSlices";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useEffect, useState } from "react";

export const Blogs = () => {
	const [blogsData, setBlogsData] = useState([]);
	// const [blogsApi, { isLoading }] = useBlogsMutation();
	const { data: blogs, isLoading } = useBlogsQuery({});

	useEffect(() => {
		if (blogs) {
			setBlogsData(blogs);
		}
	}, [blogs]);

	if (isLoading) {
		return (
			<>
				<Appbar />
				<div>
					<div className="mt-20 flex justify-center">
						<div className="max-w-2xl w-full">
							<BlogSkeleton />
							<BlogSkeleton />
							<BlogSkeleton />s
							<BlogSkeleton />
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<>
			<Appbar />
			<h1 className="flex justify-center text-2xl pt-3 text-slate-400 font-semibold">
				Discover Blogs
			</h1>
			<div className="my-3 mx-80 border "></div>
			<div className="flex justify-center">
				<div className="w-7/12">
					{blogsData.map((blog, index) => (
						<BlogCard key={index} blog={blog} />
					))}
				</div>
			</div>
		</>
	);
};

// const blogsData = [
// 	{
// 		id: "1",
// 		author: {
// 			name: "John Doe",
// 		},
// 		title: "The Future of Web Development",
// 		content:
// 			"Web development is constantly evolving, with new frameworks and technologies emerging at a rapid pace. In this article, we explore the future of web development, focusing on the rise of serverless architecture, JAMstack, and AI-driven applications. These innovations promise to streamline workflows and improve scalability for developers.",
// 		publishedDate: "21st Feb 2024",
// 	},
// 	{
// 		id: "2",
// 		author: {
// 			name: "Jane Smith",
// 		},
// 		title: "Understanding React Hooks",
// 		content:
// 			"React Hooks have revolutionized how developers write functional components. This post explores the essential hooks like useState, useEffect, and useContext, which allow for easier state management, side effects handling, and passing context without prop drilling.",
// 		publishedDate: "21st Feb 2024",
// 	},
// 	{
// 		id: "3",
// 		author: {
// 			name: "Anonymous",
// 		},
// 		title: "A Guide to Responsive Design",
// 		content:
// 			"Responsive design ensures a seamless experience across devices. This guide covers media queries, fluid grids, and flexible images, making it easier to create designs that adapt beautifully to different screen sizes.",
// 		publishedDate: "21st Feb 2024",
// 	},
// 	{
// 		id: "4",
// 		author: {
// 			name: "Alex Johnson",
// 		},
// 		title: "Mastering JavaScript ES6 Features",
// 		content:
// 			"ES6 introduced powerful features such as arrow functions, template literals, and destructuring. This article provides a comprehensive guide to mastering these features, making JavaScript code cleaner, more readable, and easier to maintain.",
// 		publishedDate: "21st Feb 2024",
// 	},
// 	{
// 		id: "5",
// 		author: {
// 			name: "Emily Davis",
// 		},
// 		title: "Why TypeScript Matters",
// 		content:
// 			"TypeScript has gained immense popularity due to its ability to add static types to JavaScript, reducing bugs and enhancing code quality. This blog dives into the key advantages of using TypeScript in large-scale applications.",
// 		publishedDate: "21st Feb 2024",
// 	},
// ];
