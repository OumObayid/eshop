import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {

  //parametre autoscroll slide
  const autoScroll = true;
  let slideInterval;
  let IntervalTime = 5000;

  const [currentSlide, setcurrentSlide] = useState(0);
  const sliderLenth = sliderData.length;
  const nextSlide = () => {
    setcurrentSlide(currentSlide === sliderLenth - 1 ? 0 : currentSlide + 1);
  };
  const prevSlide = () => {
    setcurrentSlide(currentSlide === 0 ? sliderLenth - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setcurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, IntervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, slideInterval, autoScroll]);

  return (
    <div className="slider" id="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img className="img" src={image} alt="slide" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <Link to="/shop" className="--btn --btn-primary">
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
