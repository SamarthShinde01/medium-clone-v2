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

export const Publish = () => {
	return (
		<>
			<Appbar />
			<div className="flex justify-center">
				<div className="mt-16 w-8/12 text-center">
					<Input
						type="test"
						placeholder="Title"
						className=" border-slate-200 p-6 mb-5"
					/>

					<Input type="file" className=" border-slate-200 pt-3 pb-8 mb-5" />
					<Textarea
						placeholder="Write Short Content..."
						className=" border-slate-200 pt-3 pb-8 mb-5"
					/>
					<CKEditor
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
					/>
					<Button
						variant="outline"
						className="w-full mt-6 p-5 text-green-900 bg-green-100 hover:bg-green-200 "
					>
						Publish
					</Button>
				</div>
			</div>
		</>
	);
};
