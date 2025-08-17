/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * SlideProduct component wraps children elements into a responsive carousel.
 * It uses the "react-slick" library for the sliding functionality.
 *
 * Props:
 * - children: React elements to display inside the carousel
 *
 * Usage:
 * <SlideProduct>
 *    <CardProduct item={product1} />
 *    <CardProduct item={product2} />
 * </SlideProduct>
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideProduct = (props) => {
  // State to control number of slides visible
  const [slidesToShow, setSlidesToShow] = useState(4);

  // Function to set slidesToShow based on screen width
  const getSlidesToShow = () => {
    const x = window.matchMedia("(max-width: 750px)");
    if (x.matches) setSlidesToShow(2); // 2 slides on small screens
    else setSlidesToShow(4); // 4 slides on larger screens
  };

  // Run once when component mounts to adjust slides based on screen size
  useEffect(() => {
    getSlidesToShow();
  }, []);

  // Slider settings
  const settings = {
    dots: true,            // Show navigation dots
    infinite: true,        // Infinite scrolling
    slidesToShow: slidesToShow, // Number of slides visible
    slidesToScroll: 1,     // Slides to scroll per swipe
    arrows: true,          // Show arrows
    autoplay: true,        // Enable autoplay
    speed: 1000,           // Slide transition speed in ms
    adaptiveHeight: true,  // Adjust height based on content
  };

  return (
    <Slider {...settings}>
      {props.children} {/* Render carousel items */}
    </Slider>
  );
};

export default SlideProduct;
