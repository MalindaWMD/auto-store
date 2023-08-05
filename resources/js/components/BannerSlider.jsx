import React from "react";
import Slider from "react-slick";

export default function BannerSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
  };

  return (
    <Slider className="w-full" {...settings}>
      <div className="text-white">
        <h3 className="font-mono text-4xl mb-2">Driving Excellence</h3>
        <p className="font-mono tex-2xl">Elevate Your Journey with Tailored Parts</p>
      </div>
      <div className="text-white">
        <h3 className="font-mono text-4xl mb-2">Rev Up Your Search</h3>
        <p className="font-mono tex-2xl">Discover Parts with Ease</p>
      </div>
      <div className="text-white">
        <h3 className="font-mono text-4xl mb-2">Your Vehicle's Best Friend</h3>
        <p className="font-mono tex-2xl">Trustworthy, Genuine Parts</p>
      </div>
      <div className="text-white">
        <h3 className="font-mono text-4xl mb-2">Effortless Shopping</h3>
        <p className="font-mono tex-2xl">Parts Crafted for Your Ride</p>
      </div>
    </Slider>
  );
}