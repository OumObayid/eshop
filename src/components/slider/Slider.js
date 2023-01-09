import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { sliderData } from "./slider-data";
import "./Slider.scss";

const Slider = () => {

  //parametre autoscroll slide
  const autoScroll = true;
  
  let IntervalTime = 5000;

  const [currentSlide, setcurrentSlide] = useState(0);
  const sliderLenth = sliderData.length;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextSlide = useCallback(() => {
    setcurrentSlide(currentSlide === sliderLenth - 1 ? 0 : currentSlide + 1);
  });
  const prevSlide = () => {
    setcurrentSlide(currentSlide === 0 ? sliderLenth - 1 : currentSlide - 1);
  };

  useEffect(() => {
    setcurrentSlide(0);
  }, []);

  useEffect(() => {
    let slideInterval;
    if (autoScroll) {
      const auto = () => {
        slideInterval = setInterval(nextSlide, IntervalTime);
      };
      auto();
    }
    return () => clearInterval(slideInterval);
  }, [currentSlide, IntervalTime,nextSlide, autoScroll]);

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
