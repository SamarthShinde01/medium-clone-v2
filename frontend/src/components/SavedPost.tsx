import comming_soon from "@/assets/images/coming_soon.jpg";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { useSavedBulkQuery, useUnsavedMutation } from "@/slices/blogApiSlices";
import { useEffect, useState } from "react";
import { Spinner } from "./Spinner";
import { toast } from "react-toastify";

interface PostTypes {
	id: string;
	userId: string;
	title: string;
	shortContent: string;
	content: string;
	image: string;
	clap: number;
	createdAt: string;
}

export const SavedPost = () => {
	const { data: savedPost, isLoading, refetch } = useSavedBulkQuery({});
	const [allPosts, setAllPosts] = useState([]);
	const [unsave] = useUnsavedMutation();

	useEffect(() => {
		if (savedPost && savedPost.posts) {
			setAllPosts(savedPost.posts);
		}
	}, [savedPost, refetch]);

	if (isLoading) {
		return (
			<div className="flex w-screen justify-center items-center">
				<Spinner />
			</div>
		);
	}

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
		<>
			{allPosts?.length === 0 ? (
				<div>
					<h3>No posts saved</h3>
				</div>
			) : (
				allPosts.map((post: PostTypes) => (
					<Card
						key={post.id}
						className="shadow-lg hover:shadow-xl transition-shadow duration-300"
					>
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
									{post.title}
								</CardTitle>
							</CardHeader>
						</div>

						<div
							onClick={() => unsaveBlogHandler(post.id)}
							className="m-4 flex justify-around mt-4"
						>
							<Button variant="outline" className="flex-1 mx-1">
								Unsave
							</Button>
						</div>
					</Card>
				))
			)}
		</>
	);
};
