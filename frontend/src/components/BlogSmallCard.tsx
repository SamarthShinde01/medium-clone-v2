import comming_soon from "@/assets/images/coming_soon.jpg";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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

export const BlogSmallCard = ({ blog }: { blog: BlogType }) => {
	return (
		<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
			<div className="flex">
				<div className="w-[150px] m-2 ml-4">
					<AspectRatio ratio={10 / 6}>
						<img
							src={blog?.image || comming_soon}
							alt="Image"
							className="object-cover rounded-lg"
						/>
					</AspectRatio>
				</div>
				<CardHeader className="flex-grow flex flex-col justify-center">
					<CardTitle className="text-xl font-semibold text-gray-800">
						{blog?.title}
					</CardTitle>
				</CardHeader>
			</div>
			<div className="m-4 flex justify-around mt-4">
				<Link to={`/blog/edit/${blog?.id}`} className="flex-1 mx-1">
					<Button variant="outline" className="w-full">
						Edit
					</Button>
				</Link>

				<Button variant="outline" className="flex-1 mx-1">
					Delete
				</Button>
				<Button variant="outline" className="flex-1 mx-1">
					Show to all
				</Button>
			</div>
		</Card>
	);
};
