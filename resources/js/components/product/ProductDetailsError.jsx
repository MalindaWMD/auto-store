import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Skeleton from "react-loading-skeleton";
import Layout from "../Layout";

export default function ProductDetailsError() {
    return (
        <Layout>
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-8  pb-16 sm:px-6 sm:pt-16 sm:pb-24 lg:max-w-7xl lg:px-8 relative">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8 blur-md">
                        <div>
                            <Skeleton className="w-1/3 pb-[50%] lg:w-1/2 lg:pb-[100%] mb-5" />
                        </div>
                        <div>
                            <Skeleton />
                            <Skeleton className="h-8" />
                            <Skeleton className="h-14 mt-4" />
                        </div>
                    </div>

                    <div className="absolute w-full h-full flex justify-center items-center flex-col z-10 top-0">
                        <ExclamationCircleIcon className="h-12 w-12 stroke-red-400" />
                        <h2 className="text-xl font-bold">
                            There was an error loading product details.
                        </h2>
                        <p className="text-gray-600">
                            Please try reloading the page.
                        </p>
                        <button
                            type="button"
                            className="mt-4 rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={() => window.location.reload()}
                        >
                            Reload
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
