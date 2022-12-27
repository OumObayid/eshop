import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const SlideProduct = (props) => {
    //for slide products
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    speed: 1000,
    adaptiveHeight: true
  };
  return (
    <Slider {...settings}>
        {props.children}</Slider>
  )
}

export default SlideProduct