import profileImage from "@/assets/images/profile.jpg";
import comming_soon from "@/assets/images/coming_soon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Link } from "react-router-dom";
import { useUserByIdQuery } from "@/slices/userApiSlices";
import { CommentPost } from "./CommentPost";
import { useSaveBlog } from "@/hooks";
import { TooltipForIcons } from "./TooltipForIcons";
import { Bookmark, HeartIcon } from "lucide-react";
import { useSavedBulkQuery, useUnsavedMutation } from "@/slices/blogApiSlices";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

export const BlogCard = ({ blog }: { blog: BlogType }) => {
	const { data: profile } = useUserByIdQuery(blog.userId);
	const { data: savedBulk, refetch } = useSavedBulkQuery({});
	const [saved, setSaved] = useState<boolean>(false);
	const [unsave] = useUnsavedMutation();

	useEffect(() => {
		if (savedBulk) {
			const isSaved = savedBulk.blogData[0]?.bookmarks.some(
				(blogSaved: { postId: string }) => blogSaved.postId === blog.id
			);
			setSaved(isSaved);
		}
	}, [savedBulk, blog.id, refetch]);

	const { handleSaveBlog } = useSaveBlog();

	const saveBlogHandler = (blogId: string) => {
		handleSaveBlog(blogId);
		refetch();
	};

	const unsaveBlogHandler = async (blogId: string) => {
		try {
			await unsave({ data: { blogId } }).unwrap();

			toast.success("Post Unsaved");
			refetch();
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
				toast.error(err.message);
			}
		}
	};

	return (
		<div className="p-4 border-b-[0.01rem] pb-3 border-gray-300 cursor-pointer">
			<Link to={`/blog/${blog.id}`}>
				{/* User Info */}
				<div className="flex gap-2 items-center">
					<Avatar className="w-6 h-6">
						<AvatarImage src={profile?.user?.image || profileImage} />
						<AvatarFallback>
							{profile?.user?.name?.split(" ")[0].slice(0, 2).toUpperCase() ||
								"AN"}
						</AvatarFallback>
					</Avatar>
					<div className="font-normal text-sm">
						{profile?.user?.name || "Anonymous"}
					</div>
					<div className="text-xs text-slate-600">&bull;</div>
					<div className="font-thin text-xs text-slate-500">
						{new Date(blog?.createdAt).toLocaleDateString() || "11-11-2020"}
					</div>
				</div>

				<div className="flex flex-col md:flex-row justify-between md:items-center my-2">
					<div className="md:w-3/4 w-full mb-3 md:mb-0">
						<div className="text-xl font-bold my-2">{blog.title}</div>
						<div className="font-semibold text-slate-500 text-md">
							{blog?.shortContent}
						</div>
					</div>

					<div className="md:w-[150px] w-full">
						<AspectRatio ratio={16 / 9}>
							<img
								src={blog?.image || comming_soon}
								alt="Image"
								className="object-cover w-full h-full"
							/>
						</AspectRatio>
					</div>
				</div>
			</Link>

			<div className="flex items-center gap-3 my-1 flex-wrap">
				<div onClick={() => saveBlogHandler(String(blog.id))}>
					<TooltipForIcons text="Like">
						<HeartIcon />
					</TooltipForIcons>
				</div>
				<CommentPost />

				<div
					onClick={() => {
						if (!saved) {
							saveBlogHandler(blog.id);
						} else {
							unsaveBlogHandler(blog.id);
						}
					}}
				>
					<TooltipForIcons text={`${saved ? "Unsave Post" : "Save Post"}`}>
						<Bookmark className={saved ? "text-blue-500 fill-blue-500" : ""} />
					</TooltipForIcons>
				</div>

				<div className="text-slate-500 text-xs font-thin">3 min read</div>
			</div>
		</div>
	);
};
