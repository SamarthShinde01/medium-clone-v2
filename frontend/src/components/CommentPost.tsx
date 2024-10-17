import { MessageCircle } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "./ui/button";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Textarea } from "@/components/ui/textarea";

export const CommentPost = () => {
	return (
		<div className="flex items-center gap-6 my-1">
			<Drawer>
				<DrawerTrigger>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger>
								<MessageCircle />
							</TooltipTrigger>
							<TooltipContent>
								<p>Comment</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</DrawerTrigger>
				<DrawerContent>
					<div className="grid grid-cols-12">
						<div className="col-span-5">
							<div className="flex justify-center items-center w-full h-full">
								<ScrollArea className="h-[450px] w-5/6 flex flex-col  rounded-md border-b border-slate-200 p-4">
									<DrawerHeader>
										<DrawerTitle>Write a comment !</DrawerTitle>
										<DrawerDescription>
											This action cannot be undone.
										</DrawerDescription>
									</DrawerHeader>
									<DrawerFooter className="flex justify-center  mt-5">
										<form className="gap-4">
											<Textarea
												placeholder="Enter a comment.."
												className="my-4"
											/>
											<Button type="submit" className="w-50 mr-4">
												Submit
											</Button>
											<DrawerClose>
												<Button
													variant="outline"
													className="w-50 bg-slate-100 hover:bg-slate-300 "
												>
													Cancel
												</Button>
											</DrawerClose>
										</form>
									</DrawerFooter>
								</ScrollArea>
							</div>
						</div>
						<div className="col-span-7">
							<div className="flex justify-center items-center w-full h-full">
								<ScrollArea className="h-[450px] w-5/6 flex flex-col  rounded-md border-b border-slate-200 p-4">
									<DrawerHeader>
										<DrawerTitle>Read Comments</DrawerTitle>
										<DrawerDescription>
											Read all comments of this blog
										</DrawerDescription>
									</DrawerHeader>
									<DrawerFooter className="flex justify-center  mt-5">
										<form className="gap-4">
											<Textarea
												placeholder="Enter a comment.."
												className="my-4"
											/>
											<Button className="w-60 mr-4">Submit</Button>
											<DrawerClose>
												<Button
													type="submit"
													variant="outline"
													className="w-60 bg-slate-100 hover:bg-slate-300 "
												>
													Cancel
												</Button>
											</DrawerClose>
										</form>
									</DrawerFooter>
								</ScrollArea>
							</div>
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		</div>
	);
};
