import { Appbar } from "../components/Appbar";
import { Button } from "@/components/ui/button";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	ClassicEditor,
	Bold,
	Essentials,
	Italic,
	Mention,
	Paragraph,
	Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";
import "ckeditor5-premium-features/ckeditor5-premium-features.css";
import { SlashCommand } from "ckeditor5-premium-features";
import { usePublishMutation } from "@/slices/blogApiSlices";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "@/components/Spinner";

export const Publish = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [shortContent, setShortContent] = useState("");
	const [content, setContent] = useState("");

	const [publish, { isLoading }] = usePublishMutation();

	const submitHandler = async (e) => {
		e.preventDefault();

		try {
			if (!title || !shortContent || !content) {
				toast.warning("Please enter all the fields");
				return;
			}

			const formData = new FormData();
			formData.append("title", title);
			formData.append("shortContent", shortContent);
			formData.append("content", content);
			if (image) {
				formData.append("image", image);
			}

			const res = await publish(formData).unwrap();

			console.log(res);

			toast.success("Post published successfully");
		} catch (err: any) {
			console.error(err);
			toast.error(err?.message || err.error);
		}
	};

	return (
		<>
			<Appbar />
			<form onSubmit={submitHandler} encType="multipart/form-data">
				<div className="flex justify-center">
					<div className="mt-16 w-8/12 text-center">
						<Input
							required
							type="text"
							placeholder="Title"
							name="title"
							onChange={(e) => setTitle(e.target.value)}
							className=" border-slate-200 p-6 mb-5"
						/>

						<Input
							type="file"
							name="image"
							onChange={(e) => setImage(e.target.files[0])}
							className=" border-slate-200 pt-3 pb-8 mb-5"
						/>
						<Textarea
							placeholder="Write Short Content..."
							name="shortContent"
							onChange={(e) => setShortContent(e.target.value)}
							className=" border-slate-200 pt-3 pb-8 mb-5"
							required
						/>

						<Textarea
							placeholder="Write Content..."
							name="content"
							onChange={(e) => setContent(e.target.value)}
							className=" border-slate-200 pt-3 pb-8 mb-5"
							required
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

						{isLoading ? (
							<Spinner />
						) : (
							<Button
								variant="outline"
								type="submit"
								className="w-full mt-6 p-5 text-green-900 bg-green-100 hover:bg-green-200 "
							>
								Publish
							</Button>
						)}
					</div>
				</div>
			</form>
		</>
	);
};
