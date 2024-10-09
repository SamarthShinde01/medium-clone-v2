import profileImage from "@/assets/images/profile.jpg";
import comming_soon from "@/assets/images/coming_soon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Heart, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
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

export const BlogCard = ({ blog }: { blog: BlogType }) => {
	const { data: profile, error, isLoading } = useUserByIdQuery(blog?.userId);

	return (
		<div className="p-4 border-b-[0.01rem] pb-3 border-gray-300 cursor-pointer">
			<Link to={`/blog/${blog.id}`}>
				<div className="flex gap-2 items-center">
					<Avatar className="w-6 h-6 ">
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
				<div className="flex justify-around items-center">
					<div>
						<div className="text-xl font-bold my-2">{blog.title}</div>
						<div className="font-semibold text-slate-500 text-md ">
							{blog?.shortContent}
						</div>
					</div>

					<div className="w-[150px] ">
						<AspectRatio ratio={16 / 9}>
							<img
								src={blog?.image || comming_soon}
								alt="Image"
								className="object-cover"
								style={{ width: "160px", height: "107px" }}
							/>
						</AspectRatio>
					</div>
				</div>

				<div className="flex items-center gap-4 my-4">
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<Heart />
							</TooltipTrigger>
							<TooltipContent>
								<p>Claps</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>

					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<MessageCircle />
							</TooltipTrigger>
							<TooltipContent>
								<p>Comments</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
					<div className="text-slate-500 text-xs font-thin ">3 min read</div>
				</div>
			</Link>
		</div>
	);
};
