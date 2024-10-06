import comming_soon from "@/assets/images/coming_soon.jpg";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

export const BlogSaveCard = () => {
	return (
		<Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
			<div className="flex items-center">
				<div className="w-[150px] h-[90px] m-2 ml-4">
					<AspectRatio ratio={10 / 6} className="h-full">
						<img
							src={comming_soon}
							alt="Image"
							className="object-cover rounded-lg w-full h-full"
						/>
					</AspectRatio>
				</div>
				<CardHeader className="flex-grow flex flex-col justify-center">
					<CardTitle className="text-xl font-semibold text-gray-800">
						Card Title Card Title Card Title
					</CardTitle>
				</CardHeader>
			</div>

			<div className="m-4 flex justify-around mt-4">
				<Button variant="outline" className="flex-1 mx-1">
					Unsave
				</Button>
			</div>
		</Card>
	);
};
