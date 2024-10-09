import profileImage from "@/assets/images/profile.jpg";
import comming_soon from "@/assets/images/coming_soon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CommentsBookmarks } from "./CommentsBookmarks";
import { useUserByIdQuery } from "@/slices/userApiSlices";

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
	const { data: profile } = useUserByIdQuery(blog?.userId);

	return (
		<div className="flex justify-center items-start pt-16 px-3">
			<div className="w-full max-w-3xl">
				{/* Main Content */}
				<div className="flex flex-col">
					<h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
						{blog?.title}
					</h1>
					<p className="text-slate-500 text-light font-semibold mb-4">
						{blog?.shortContent}
					</p>

					<div className="flex items-center gap-4 mb-4">
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
						<div>
							<h3 className="text-2xl font-semibold">
								{profile?.user?.name || "Anonymous"}
							</h3>
							<p className="text-sm text-gray-500">
								Posted on
								{new Date(blog?.createdAt).toLocaleDateString() || "11/11/12"}
							</p>
						</div>
					</div>

					{/* comments and bookmarks component */}
					<CommentsBookmarks />

					<div className="border-b border-gray-300 my-2"></div>

					<div className="w-full mt-5">
						<AspectRatio ratio={16 / 6}>
							<img
								src={comming_soon}
								alt="Image"
								className="w-full h-64 object-cover"
							/>
						</AspectRatio>
					</div>

					<p className="">{blog?.content}</p>
				</div>
			</div>
		</div>
	);
};
