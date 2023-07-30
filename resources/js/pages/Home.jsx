import BannerSlider from "../components/BannerSlider"
import Layout from "../components/Layout"
import SearchForm from "../components/SearchForm"

import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"
import TopBrands from "../components/TopBrands"
import TopCategories from "../components/TopCategories"

export default function Home() {
  return <Layout>
    <div className="pb-30 pt-16 sm:pb-20 sm:pt-20 lg:pt-30">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 grid grid-cols-2">
        <SearchForm className="sm:max-w-lg" />
        <BannerSlider />
      </div>
    </div>

    <TopCategories />

    <TopBrands />

  </Layout>
}