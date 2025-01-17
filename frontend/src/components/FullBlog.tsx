import profileImage from "@/assets/images/profile.jpg";
import comming_soon from "@/assets/images/coming_soon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useUserByIdQuery } from "@/slices/userApiSlices";
import { useEffect, useState } from "react";
import { CommentPost } from "./CommentPost";
import { TooltipForIcons } from "./TooltipForIcons";
import { Bookmark, HeartIcon } from "lucide-react";
import { useSaveBlog } from "@/hooks";
import {
	useGetLikedQuery,
	useLikeMutation,
	useSavedBulkQuery,
	useUnlikeMutation,
	useUnsavedMutation,
} from "@/slices/blogApiSlices";
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
	commentCount: number;
}

export const FullBlog = ({ blog }: { blog: BlogType }) => {
	const { handleSaveBlog } = useSaveBlog();
	const [unsave] = useUnsavedMutation();
	const [likeBlog] = useLikeMutation();
	const [unlikeBlog] = useUnlikeMutation();
	const { data: getLiked, refetch: refetchLikes } = useGetLikedQuery({});
	const { data: savedBulk, refetch } = useSavedBulkQuery({});
	const [saved, setSaved] = useState<boolean>(false);
	const [liked, setLiked] = useState<boolean>(false);

	const { data: profile, refetch: refetchProfile } = useUserByIdQuery(
		blog?.userId
	);

	//save blog start
	useEffect(() => {
		refetchProfile();
	}, [blog?.userId, refetchProfile]);

	useEffect(() => {
		if (savedBulk?.blogData) {
			const isBlogSaved = savedBulk.blogData.bookmarks.some(
				(bookmark: { postId: string }) => bookmark.postId === blog.id
			);
			setSaved(isBlogSaved);
		}
	}, [savedBulk, blog.id]);

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
				toast.error("Failed to unsave post: " + err.message);
			}
		}
	};
	//save blog end

	//like blog start
	const likePostHandler = async (blogId: string) => {
		try {
			const liked = await likeBlog({
				blogId,
			}).unwrap();
			console.log(liked);
			refetchLikes();
			toast.success("Post Liked");
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	const unlikePostHandler = async (blogId: string) => {
		try {
			const unlike = await unlikeBlog({
				blogId,
			}).unwrap();
			console.log(unlike);
			refetchLikes();
			toast.success("Post Unliked");
		} catch (err: unknown) {
			if (err instanceof Error) {
				console.error(err.message);
			}
		}
	};

	useEffect(() => {
		if (getLiked) {
			const isLiked = getLiked.some(
				(like: { postId: string }) => like.postId === blog.id
			);
			setLiked(isLiked);
		}
	}, [getLiked, blog.id]);
	//like blog end

	return (
		<div className="flex flex-col items-center pt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
			<div className="w-full max-w-3xl">
				<div className="flex flex-col">
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-5 text-center sm:text-left">
						{blog?.title}
					</h1>

					<p className="text-slate-500 text-sm sm:text-base font-medium mb-4 sm:mb-6 text-center sm:text-left">
						{blog?.shortContent}
					</p>

					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 sm:mb-6">
						<Avatar className="w-10 h-10">
							<AvatarImage
								src={profile?.user?.image || profileImage}
								className="rounded-full"
							/>
							<AvatarFallback>
								{profile?.user?.name
									?.split(" ")[0]
									?.slice(0, 2)
									.toUpperCase() || "AN"}
							</AvatarFallback>
						</Avatar>

						<div className="text-center sm:text-left">
							<h3 className="text-lg sm:text-2xl font-semibold">
								{profile?.user?.name || "Anonymous"}
							</h3>
							<p className="text-xs sm:text-sm text-gray-500">
								Posted on{" "}
								{new Date(blog?.createdAt).toLocaleDateString() ||
									"Unknown Date"}
							</p>
						</div>
					</div>

					<div className="flex justify-around sm:justify-start items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
						<div
							onClick={() => {
								if (!liked) {
									likePostHandler(blog.id);
								} else {
									unlikePostHandler(blog.id);
								}
							}}
							className="flex gap-1 items-center border border-slate-200 pt-1 px-2 rounded-lg "
						>
							<div className="text-sm text-slate-500 pb-2 font-medium">
								{blog.clap}
							</div>
							<div>
								<TooltipForIcons text={`${!liked ? "Like" : "Unlike"}`}>
									<HeartIcon
										className={liked ? "text-red-500 fill-red-500" : ""}
									/>
								</TooltipForIcons>
							</div>
						</div>

						<div
							onClick={() => {
								if (!liked) {
									likePostHandler(blog.id);
								} else {
									unlikePostHandler(blog.id);
								}
							}}
							className="flex gap-1 items-center border border-slate-200 pt-1 px-2 rounded-lg "
						>
							<div className="text-sm text-slate-500 pb-2 font-medium">
								{blog.commentCount}
							</div>
							<div>
								<CommentPost />
							</div>
						</div>

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
								<Bookmark
									className={saved ? "text-blue-500 fill-blue-500" : ""}
								/>
							</TooltipForIcons>
						</div>
					</div>

					<div className="border-b border-gray-300 my-2 sm:my-6"></div>

					<div className="w-full mt-3 sm:mt-6">
						<AspectRatio ratio={16 / 9}>
							<img
								src={blog?.image || comming_soon}
								alt="Image"
								className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
							/>
						</AspectRatio>
					</div>
					<div className="mt-2 md:mt-2 text-base text-md  leading-relaxed">
						<div dangerouslySetInnerHTML={{ __html: blog?.content }} />
					</div>
				</div>
			</div>
		</div>
	);
};
