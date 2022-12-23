import {Helmet,Slider,Scrolltop} from "../../components";
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
        <About />
        <Contact />
        <Scrolltop />
      </Helmet>
    </div>
  );
};

export default Home;
