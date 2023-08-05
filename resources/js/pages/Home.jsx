import BannerSlider from "../components/BannerSlider"
import Layout from "../components/Layout"
import SearchForm from "../components/SearchForm"
import TopBrands from "../components/TopBrands"
import TopCategories from "../components/TopCategories"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export default function Home() {
  return <Layout>
    <div className="relative pb-30 pt-16 sm:pb-20 sm:pt-20 lg:pt-30 bg-[url('https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1366&q=80')]">
      <div className="absolute top-0 bg-opacity-80 bg-black w-full h-full -z-0"></div>
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 grid grid-cols-2 grid-gap-6 z-30">
        <div className="flex justify-center items-center">
          <BannerSlider />
        </div>
        <div className="flex justify-end items-start z-30">
          <SearchForm className="w-full mr-0 sm:max-w-lg bg-white" />
        </div>
      </div>
    </div>

    <TopCategories />

    <TopBrands />
  </Layout>
}