import { BlogPageSkeleton } from "@/components/BlogPageSkeleton";
import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/FullBlog";
export const Blog = () => {
	const loading = false;

	return loading ? (
		<BlogPageSkeleton />
	) : (
		<div>
			<Appbar />
			<FullBlog />
		</div>
	);
};
