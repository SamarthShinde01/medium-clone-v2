import profile from "@/assets/images/profile.jpg";
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

export const BlogCard = ({ blog }) => {
	return (
		<div className="p-4 border-b-[0.01rem] pb-3 border-gray-300 cursor-pointer">
			<Link to={"/blog/1"}>
				<div className="flex gap-2 items-center">
					<Avatar className="w-6 h-6 ">
						<AvatarImage src={profile} />
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>

					<div className="font-normal text-sm">Author Name</div>
					<div className="text-xs text-slate-600">&bull;</div>
					<div className="font-thin text-xs text-slate-500">Published Date</div>
				</div>
				<div className="flex justify-around items-center">
					<div>
						<div className="text-xl font-bold my-2">Blog Title</div>
						<div className="font-semibold text-slate-500 text-md ">
							This is a sample content preview. It will be truncated after 250
							characters if the content is too long...
						</div>
					</div>

					<div className="w-[150px] ">
						<AspectRatio ratio={16 / 9}>
							<img
								src={comming_soon}
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
