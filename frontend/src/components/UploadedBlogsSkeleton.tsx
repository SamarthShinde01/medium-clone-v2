export const UploadedBlogsSkeleton = () => {
	return (
		<>
			<div className="animate-pulse">
				<div className="ml-4">
					<div className="flex flex-col gap-3 m-6">
						{/* Title Skeleton */}
						<div className="h-8 bg-gray-200 rounded-full w-1/2 mb-4"></div>

						{/* Breadcrumbs Skeleton */}
						<div className="flex items-center space-x-2">
							<div className="h-5 bg-gray-200 rounded-full w-20"></div>
							<div className="h-5 bg-gray-200 rounded-full w-10"></div>
							<div className="h-5 bg-gray-200 rounded-full w-20"></div>
							<div className="h-5 bg-gray-200 rounded-full w-10"></div>
							<div className="h-5 bg-gray-200 rounded-full w-20"></div>
						</div>
					</div>

					{/* Grid of Property Cards Skeleton */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
						{Array.from({ length: 6 }).map((_, index) => (
							<div key={index} className="bg-gray-200 rounded-lg h-40"></div> // Adjust the height as needed
						))}
					</div>
				</div>
			</div>
			<span className="sr-only">Loading...</span>
		</>
	);
};
