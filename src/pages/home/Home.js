import {Helmet,Slider,Scrolltop,CategoryList} from "../../components";
import {Contact,About} from "../";
import { useEffect } from "react";

const Home = () => {
  
  useEffect(() => {
   window.scrollTo(0,0);
  }, [])
  
  return (
    <div>
      <Slider />
      <Helmet title="shopping">
        <CategoryList />
        <About />
        <Contact />
        <Scrolltop />
      </Helmet>
    </div>
  );
};

export default Home;
