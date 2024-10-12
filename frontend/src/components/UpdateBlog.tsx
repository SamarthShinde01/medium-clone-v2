import { Button } from "@/components/ui/button";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
// import {
// 	ClassicEditor,
// 	Bold,
// 	Essentials,
// 	Italic,
// 	Mention,
// 	Paragraph,
// 	Undo,
// } from "ckeditor5";

// import { SlashCommand } from "ckeditor5-premium-features";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUpdateMutation } from "@/slices/blogApiSlices";
import { Spinner } from "./Spinner";

interface BlogType {
	id: string;
	userId: string;
	clap: number;
	content: string;
	createdAt: string;
	image: string;
	shortContent: string;
	title: string;
}

export const UpdateBlogComponent = ({ blog }: { blog: BlogType }) => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [shortContent, setShortContent] = useState("");
	const [content, setContent] = useState("");
	// const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTitle(blog?.title);
		setShortContent(blog?.shortContent);
		setContent(blog?.content);
		setLoading(false);
	}, [blog]);

	const [update] = useUpdateMutation();

	// const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files) {
	// 		setImage(e.target.files[0]);
	// 	}
	// };

	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		const formData = new FormData(); // Create FormData for file upload
		formData.append("title", title);
		formData.append("shortContent", shortContent);
		formData.append("content", content);
		// if (image) {
		// 	formData.append("image", image); // Append image file if selected
		// }

		try {
			const res = await update({
				data: formData,
				id: blog.id,
			}).unwrap();

			console.log(res);
			toast.success("Post updated successfully");
			navigate(`/blog/${res.id}`);
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err);
				toast.error(err?.message);
			}
		}
	};
	return loading ? (
		<Spinner />
	) : (
		<form onSubmit={submitHandler}>
			<div className="flex justify-center">
				<div className="mt-16 w-8/12 text-center">
					<Input
						type="test"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className=" border-slate-200 p-6 mb-5"
					/>

					<input
						type="file"
						// onChange={handleImageChange}
						className="w-full bg-gray-300 rounded border bg-opacity-40 border-gray-700 focus:ring-2 focus:ring-gray-600 focus:bg-transparent focus:border-gray-500 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
					/>

					<Textarea
						value={shortContent}
						onChange={(e) => setShortContent(e.target.value)}
						placeholder="Write Short Content..."
						className=" border-slate-200 pt-3 pb-8 mb-5"
					/>

					<Textarea
						value={content}
						onChange={(e) => setContent(e.target.value)}
						placeholder="Write Content..."
						className=" border-slate-200 pt-3 pb-8 mb-5"
					/>
					{/* <CKEditor
						editor={ClassicEditor}
						config={{
							toolbar: {
								items: ["undo", "redo", "|", "bold", "italic"],
							},
							plugins: [
								Bold,
								Essentials,
								Italic,
								Mention,
								Paragraph,
								SlashCommand,
								Undo,
							],
							licenseKey: "<YOUR_LICENSE_KEY>",
							mention: {
								// Mention configuration
							},
							initialData: "<p>Write Content...</p>",
						}}
					/> */}
					<Button
						type="submit"
						variant="outline"
						className="w-full mt-6 p-5 text-green-900 bg-green-100 hover:bg-green-200 "
					>
						Publish
					</Button>
				</div>
			</div>
		</form>
	);
};
