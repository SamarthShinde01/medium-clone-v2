import profileImage from "@/assets/images/profile.jpg";
import comming_soon from "@/assets/images/coming_soon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useUserByIdQuery } from "@/slices/userApiSlices";
import { useEffect } from "react";
import { CommentPost } from "./CommentPost";
import { TooltipForIcons } from "./TooltipForIcons";
import { Bookmark, HeartIcon } from "lucide-react";
import { useSaveBlog } from "@/hooks";

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

export const FullBlog = ({ blog }: { blog: BlogType }) => {
	const { handleSaveBlog } = useSaveBlog();

	const { data: profile, refetch: refetchProfile } = useUserByIdQuery(
		blog?.userId
	);

	useEffect(() => {
		refetchProfile();
	}, [profile]);

	const saveBlogHandler = async (blogId: string) => {
		await handleSaveBlog(blogId);
	};

	return (
		<div className="flex flex-col items-center pt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
			<div className="w-full max-w-3xl">
				{/* Main Content */}
				<div className="flex flex-col">
					{/* Title */}
					<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-5 text-center sm:text-left">
						{blog?.title}
					</h1>

					{/* Short Content */}
					<p className="text-slate-500 text-sm sm:text-base font-medium mb-4 sm:mb-6 text-center sm:text-left">
						{blog?.shortContent}
					</p>

					{/* Author and Date */}
					<div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4 sm:mb-6">
						{/* Avatar */}
						<Avatar className="w-10 h-10">
							<AvatarImage
								src={profile?.user?.image || profileImage}
								className="rounded-full"
							/>
							<AvatarFallback>
								{profile?.user?.name.split(" ")[0].slice(0, 2).toUpperCase() ||
									"AN"}
							</AvatarFallback>
						</Avatar>

						{/* Author Info */}
						<div className="text-center sm:text-left">
							<h3 className="text-lg sm:text-2xl font-semibold">
								{profile?.user?.name || "Anonymous"}
							</h3>
							<p className="text-xs sm:text-sm text-gray-500">
								Posted on{" "}
								{new Date(blog?.createdAt).toLocaleDateString() || "11/11/12"}
							</p>
						</div>
					</div>

					{/* Clap, Comment, Save */}
					<div className="flex justify-around sm:justify-start items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
						<div onClick={() => saveBlogHandler(String(blog.id))}>
							<TooltipForIcons text="Like">
								<HeartIcon />
							</TooltipForIcons>
						</div>

						<CommentPost />

						<div onClick={() => saveBlogHandler(String(blog.id))}>
							<TooltipForIcons text="Bookmark">
								<Bookmark />
							</TooltipForIcons>
						</div>
					</div>

					{/* Separator */}
					<div className="border-b border-gray-300 my-4 sm:my-6"></div>

					{/* Image */}
					<div className="w-full mt-4 sm:mt-6">
						<AspectRatio ratio={16 / 9}>
							<img
								src={blog?.image || comming_soon}
								alt="Image"
								className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg"
							/>
						</AspectRatio>
					</div>

					{/* Blog Content */}
					<div className="mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed">
						<div dangerouslySetInnerHTML={{ __html: blog?.content }} />
					</div>
				</div>
			</div>
		</div>
	);
};
