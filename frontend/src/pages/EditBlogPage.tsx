import { UpdateBlogComponent } from "@/components/UpdateBlog";
import { Appbar } from "../components/Appbar";
import { useBlogByIdQuery } from "@/slices/blogApiSlices";
import { useParams } from "react-router-dom";

interface ParamTypes {
	id: string;
}
export const EditBlog = ({ param }: { param: ParamTypes }) => {
	const { id } = useParams();
	const { data: blog } = useBlogByIdQuery(id);

	return (
		<>
			<Appbar />
			<UpdateBlogComponent blog={blog} />
		</>
	);
};
