import React, { useEffect, useState } from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideProduct = (props) => {
 
  const [slidesToShow, setSlidesToShow] = useState(4)

  
  const  getSlidesToShow = () =>{
    var x = window.matchMedia("(max-width: 750px)")
    if (x.matches) setSlidesToShow(2)
    else setSlidesToShow(4)
  }
  useEffect(() => {
    getSlidesToShow();
  }, [])
  
    //for slide products
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    speed: 1000,
    adaptiveHeight: true,
  };
  return (
    <Slider {...settings}>
        {props.children}       
    </Slider>
  )
}

export default SlideProduct