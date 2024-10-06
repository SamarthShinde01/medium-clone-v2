import profile from "@/assets/images/profile.jpg";
import comming_soon from "@/assets/images/coming_soon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { CommentsBookmarks } from "./CommentsBookmarks";

export const FullBlog = () => {
	return (
		<div className="flex justify-center items-start pt-16 px-3">
			<div className="w-full max-w-3xl">
				{/* Main Content */}
				<div className="flex flex-col">
					<h1 className="text-4xl lg:text-5xl font-bold leading-tight mb-5">
						Your Blog Title Here
					</h1>
					<p className="text-slate-500 text-light font-semibold mb-4">
						Your blog content goes here, with rich formatting, paragraphs,
						headings, etc.
					</p>

					<div className="flex items-center gap-4 mb-4">
						<Avatar className="w-10 h-10">
							<AvatarImage src={profile} className="rounded-full" />
							<AvatarFallback>AN</AvatarFallback>
						</Avatar>
						<div>
							<h3 className="text-2xl font-semibold">Anonymous</h3>
							<p className="text-sm text-gray-500">
								Posted on December 2nd, 2024
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

					<p className="">
						Your blog content goes here, with rich formatting, paragraphs,
						headings, etc. Your blog content goes here, with rich formatting,
						paragraphs, headings, etc. Your blog content goes here, with rich
						formatting, paragraphs, headings, etc. Your blog content goes here,
						with rich formatting, paragraphs, headings, etc. Your blog content
						goes here, with rich formatting, paragraphs, headings, etc. Your
						blog content goes here, with rich formatting, paragraphs, headings,
						etc. Your blog content goes here, with rich formatting, paragraphs,
						headings, etc. Your blog content goes here, with rich formatting,
						paragraphs, headings, etc.
					</p>
				</div>
			</div>
		</div>
	);
};
