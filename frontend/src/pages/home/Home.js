/*
 * eShop Project
 * Home Page
 *
 * Description:
 * Displays the main homepage including a slider, categories,
 * rated products, about section, contact section, and scroll-to-top button.
 * It retrieves categories from Redux store and ensures the page scrolls to top on load.
 *
 * License:
 * MIT License
 * https://opensource.org/licenses/MIT
 */

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Helmet,
  Slider,
  Scrolltop,
  CategoryList,
  RatedProducts,
  About,
  Contact,
} from "../../components";
import { datacategorys } from "../../redux/dataSlice";

const Home = () => {
  // Get categories from Redux store
  const categorys = useSelector(datacategorys);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Slider />
      <Helmet title="Home">
        <CategoryList categorys={categorys} />
        <RatedProducts />
        <About />
        <Contact />
        <Scrolltop />
      </Helmet>
    </div>
  );
};

export default Home;
