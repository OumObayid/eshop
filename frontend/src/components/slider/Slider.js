/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * Description:
 * Slider component for homepage carousel.
 * Supports auto-scroll, manual navigation with arrows,
 * and displays slide heading, description, image, and "Shop Now" link.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import { useEffect, useState, useCallback } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { sliderData } from "./slider-data";
import "./Slider.scss";
import bg1 from "../../assets/bg-1.webp";
import bg2 from "../../assets/bg-2.webp";
import bg3 from "../../assets/bg-3.webp";
import bg4 from "../../assets/bg-4.webp";

const Slider = () => {
  const images = [bg1, bg2, bg3, bg4]; // Array of slider images

  const autoScroll = true;  // Enable auto-scroll
  let IntervalTime = 5000;  // Auto-scroll interval in ms

  const [currentSlide, setCurrentSlide] = useState(0); // Current slide index
  const sliderLength = sliderData.length;

  // Go to next slide
  const nextSlide = useCallback(() => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  });

  // Go to previous slide
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

  // Initialize current slide
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  // Auto-scroll effect
  useEffect(() => {
    let slideInterval;
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, IntervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval); // Clear interval on unmount or slide change
  }, [currentSlide, IntervalTime, nextSlide, autoScroll]);

  return (
    <div className="slider" id="slider">
      {/* Navigation arrows */}
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />

      {/* Render slides */}
      {sliderData.map((slide, index) => {
        const { heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                {/* Slide image */}
                <img className="img" src={images[index]} alt="slide" />

                {/* Slide content */}
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <Link to="/shop" className="fs-4 btn btn-secondary">
                    Shop Now
                  </Link>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
