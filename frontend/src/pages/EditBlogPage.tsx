import { UpdateBlogComponent } from "@/components/UpdateBlog";
import { Appbar } from "../components/Appbar";
import { useBlogByIdQuery } from "@/slices/blogApiSlices";
import { useParams } from "react-router-dom";

export const EditBlog = () => {
	const { id } = useParams<{ id: string }>();
	const { data: blog } = useBlogByIdQuery(id);

	return (
		<>
			<Appbar />
			<UpdateBlogComponent blog={blog} />
		</>
	);
};
