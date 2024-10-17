import { Appbar } from "@/components/Appbar";
import { BlogSmallCard } from "@/components/BlogSmallCard";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { UploadedBlogsSkeleton } from "@/components/UploadedBlogsSkeleton";
import { useUploadedQuery } from "@/slices/blogApiSlices";

interface PostType {
	id: string;
	userId: string;
	title: string;
	shortContent: string;
	content: string;
	image: string;
	clap: number;
	createdAt: string;
}

export const Uploaded = () => {
	const { data: posts, isLoading } = useUploadedQuery({});

	return isLoading ? (
		<>
			<Appbar />
			<UploadedBlogsSkeleton />
		</>
	) : (
		<>
			<Appbar />
			<div className="ml-4">
				<div className="flex flex-col gap-3 m-6">
					<h1 className="text-3xl font-medium font-sans">
						Uploaded Properties
					</h1>
					<Breadcrumb>
						<BreadcrumbList className="text-base font-light">
							<BreadcrumbItem>
								<BreadcrumbLink href="/">Home</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbLink href="/components">Components</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator />
							<BreadcrumbItem>
								<BreadcrumbPage>Breadcrumb</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
					{posts.map((post: PostType) => (
						<BlogSmallCard key={post.id} blog={post} />
					))}
				</div>
			</div>
		</>
	);
};
