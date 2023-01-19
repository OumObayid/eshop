import { Helmet, Slider, Scrolltop, CategoryList, RatedProducts } from "../../components";
import { Contact, About } from "../../components";
import React, { useEffect } from "react";
import { datacategorys } from "../../redux/dataSlice";
import { useSelector } from "react-redux";


const Home = () => {

  //get data products and data categorys from redux store and pass to diffrent component
  const categorys = useSelector(datacategorys);
  
  

  


  useEffect(() => {
    window.scrollTo(0, 0);
  },[]);

  return (
    <div>
      <Slider />
      <Helmet title="Home">
        <CategoryList categorys={categorys}/>
        <RatedProducts />
        <About />
        <Contact />
        <Scrolltop />
      </Helmet>
    </div>
  );
};

export default Home;
