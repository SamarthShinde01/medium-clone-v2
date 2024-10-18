import { useSavedMutation } from "@/slices/blogApiSlices";
import { useState } from "react";
import { toast } from "react-toastify";

export const useSaveBlog = () => {
	const [savePost] = useSavedMutation();
	const [res, setRes] = useState<string | null>(null);

	const handleSaveBlog = async (blogId: string) => {
		try {
			const response = await savePost({
				blogId: blogId,
			}).unwrap();
			setRes(response);
			toast.success("Post Bookmarked");
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error);
				toast.error(error.message);
			}
		}
	};

	return { handleSaveBlog, res };
};
