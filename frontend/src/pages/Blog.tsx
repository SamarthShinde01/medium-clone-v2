import { BlogPageSkeleton } from "@/components/BlogPageSkeleton";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
import { useBlogByIdQuery } from "@/slices/blogApiSlices";
import { useParams } from "react-router-dom";

interface BlogType {
	id: string;
}

export const Blog = ({ param }: { param: BlogType }) => {
	const { id } = useParams();
	const { data: blog, error, isLoading } = useBlogByIdQuery(id);

	return isLoading ? (
		<BlogPageSkeleton />
	) : (
		<div>
			<Appbar />
			<FullBlog blog={blog} />
		</div>
	);
};
