import Skeleton from "react-loading-skeleton"
import Layout from "../Layout"

export default function ProductLoading() {
	return (
		<Layout>
			<div className="bg-white">
				<div className="mx-auto max-w-2xl px-8  pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl lg:px-8">
					<div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
						<div>
							<Skeleton className="w-1/3 pb-[50%] lg:w-1/2 lg:pb-[100%] mb-5" />
						</div>
						<div>
							<Skeleton />
							<Skeleton className="h-8" />
							<Skeleton className="h-14 mt-4" />
						</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}