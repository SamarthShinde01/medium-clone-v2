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
	const [image, setImage] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		setTitle(blog?.title);
		setShortContent(blog?.shortContent);
		setContent(blog?.content);
		setLoading(false);
	}, [blog]);

	const [updateApi, { isLoading: updateLoading }] = useUpdateMutation();

	const ImageSubmitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setImage(e.target.files[0]);
		}
	};
	const submitHandler = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const formData = new FormData();
			formData.append("title", title);
			formData.append("shortContent", shortContent);
			formData.append("content", content);
			if (image) {
				formData.append("image", image);
			}

			const res = await updateApi({
				title,
				shortContent,
				content,
				blog_id: blog.id,
			}).unwrap();

			console.log(res);
			toast.success("Post updated successfully");
			navigate(`/blog/${res.id}`);
			window.location.reload();
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
						name="title"
						type="test"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className=" border-slate-200 p-6 mb-5"
					/>

					<Input
						type="file"
						onChange={ImageSubmitHandler}
						className=" border-slate-200 pt-3 pb-8 mb-5"
					/>

					<Textarea
						name="shortContent"
						value={shortContent}
						onChange={(e) => setShortContent(e.target.value)}
						placeholder="Write Short Content..."
						className=" border-slate-200 pt-3 pb-8 mb-5"
					/>

					<CKEditor
						onChange={(event, editor) => {
							const data = editor.getData();
							setContent(data);
						}}
						data={content || ""}
						editor={ClassicEditor}
						config={{
							toolbar: {
								items: ["undo", "redo", "|", "bold", "italic"],
							},
							plugins: [Bold, Essentials, Italic, Mention, Paragraph, Undo],
						}}
					/>

					{updateLoading ? (
						<Spinner />
					) : (
						<Button
							type="submit"
							variant="outline"
							className="w-full mt-6 p-5 text-green-900 bg-green-100 hover:bg-green-200 "
						>
							Publish
						</Button>
					)}
				</div>
			</div>
		</form>
	);
};
