import { Appbar } from "@/components/Appbar";
import { BlogSaveCard } from "@/components/BlogSaveCard";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const Saved = () => {
	return (
		<>
			<Appbar />
			<div className="ml-4">
				<div className="flex flex-col gap-3 m-6">
					<h1 className="text-3xl font-medium font-sans">Saved Blogs</h1>
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
					<BlogSaveCard />
				</div>
			</div>
		</>
	);
};
