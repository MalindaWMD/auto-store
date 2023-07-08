import React from "react";
import Slider  from "react-slick";

export default function BannerSlider() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true
    };
    return (
      <Slider {...settings}>
        <div className="h-full bg-green-500">
          <img src="https://picsum.photos/620/400" alt="" />
        </div>
        <div className="bg-blue-500">
        <img src="https://picsum.photos/620/400" alt="" />
        </div>
        <div className="bg-red-500">
        <img src="https://picsum.photos/620/400" alt="" />
        </div>
      </Slider>
    );
  }