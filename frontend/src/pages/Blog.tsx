import { BlogPageSkeleton } from "@/components/BlogPageSkeleton";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useBlogByIdQuery } from "@/slices/blogApiSlices";
import { useParams } from "react-router-dom";

export const Blog = () => {
	const { id } = useParams<{ id: string }>();
	const { data: blog, isLoading } = useBlogByIdQuery(id);

	return isLoading ? (
		<BlogPageSkeleton />
	) : (
		<div>
			<Appbar />
			<FullBlog blog={blog} />
		</div>
	);
};
