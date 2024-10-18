import { MessageCircle } from "lucide-react";
import ProfilePicture from "@/assets/images/profile.jpg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
	ClassicEditor,
	Bold,
	Essentials,
	Italic,
	Mention,
	Paragraph,
	Undo,
} from "ckeditor5";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const commentsData = [
	{
		id: 1,
		username: "User1",
		comment: "Great post! I learned a lot.",
		date: "2024-10-18",
		avatar: "/path/to/avatar1.png", // Replace with actual image  path
	},
	{
		id: 2,
		username: "User2",
		comment: "Thanks for sharing this information.",
		date: "2024-10-17",
		avatar: "/path/to/avatar2.png", // Replace with actual image path
	},
	// Add more comments as needed
];

export const CommentPost = () => {
	const [content, setContent] = useState("");

	return (
		<div className="flex items-center gap-6 my-1">
			<Drawer>
				<DrawerTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<MessageCircle />
							</TooltipTrigger>
							<TooltipContent>
								<p>Comment</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</DrawerTrigger>
				<DrawerContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
						{/* Comment Form Section */}
						<div className="flex justify-center items-center w-full">
							<ScrollArea className="h-[300px] md:h-[450px] w-full flex flex-col rounded-md border-b border-slate-200 p-4">
								<DrawerHeader>
									<DrawerTitle>Write a comment!</DrawerTitle>
									<DrawerDescription>
										This action cannot be undone.
									</DrawerDescription>
								</DrawerHeader>
								<form className="flex flex-col gap-4 mt-4">
									<CKEditor
										onChange={(event, editor) => {
											console.log(event);
											const data = editor.getData();
											setContent(data);
										}}
										data={content || ""}
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
												Undo,
											],
										}}
									/>
									<DrawerFooter className="flex justify-between mt-4">
										<Button type="submit" className="w-full mr-2">
											Submit
										</Button>
										<DrawerClose>
											<Button
												type="button"
												variant="outline"
												className="w-full bg-slate-100 hover:bg-slate-300"
											>
												Cancel
											</Button>
										</DrawerClose>
									</DrawerFooter>
								</form>
							</ScrollArea>
						</div>
						{/* Comments Display Section */}
						<div className="flex justify-center items-center w-full">
							<ScrollArea className="h-[300px] md:h-[450px] w-full flex flex-col rounded-md border-b border-slate-200 p-4">
								<DrawerHeader>
									<DrawerTitle>Read Comments</DrawerTitle>
									<DrawerDescription>
										Read all comments of this blog
									</DrawerDescription>
								</DrawerHeader>
								<div className="flex flex-col gap-4 mt-4 overflow-y-auto">
									{commentsData.map((comment) => (
										<div
											key={comment.id}
											className="flex items-start gap-3 p-3 border border-slate-200 rounded-md"
										>
											<Avatar className="w-8 h-8">
												<AvatarImage
													className="rounded-full"
													src={ProfilePicture}
												/>
												<AvatarFallback>AN</AvatarFallback>
											</Avatar>
											<div className="flex flex-col">
												<span className="font-semibold">
													{comment.username}
												</span>
												<span className="text-xs text-gray-400">
													{comment.date}
												</span>
												<span className="text-sm text-gray-500">
													{comment.comment}
												</span>
											</div>
										</div>
									))}
								</div>
							</ScrollArea>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
