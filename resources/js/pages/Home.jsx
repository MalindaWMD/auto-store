import App from "../App"

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import BrandSection from "../components/BrandSeciton"
import TopBanner from "../components/TopBanner"
import CategoryCards from "../components/CategoryCards"
import SearchForm from "../components/SearchForm"
import PromoSection from "../components/PromoSection"
import Layout from "../components/Layout"
import { useLocation } from "react-router"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BannerSlider from "../components/BannerSlider"

export default function Home() {
  return <Layout>
    
    <TopBanner/>

    <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8 grid grid-cols-2">
        <div className="sm:max-w-lg">

          <SearchForm/>

        </div>
        <div>
            <BannerSlider/>
        </div>

      </div>
    </div>

    <CategoryCards/>

    <BrandSection/>
    
  </Layout>
}