import React from "react";
import "./About.css";
import imgAbout from "../../assets/shoping.jpg";
import aaa from "../../assets/aaa.png";
import bbb from "../../assets/bbb.png";
import ccc from "../../assets/ccc.png";
import ddd from "../../assets/ddd.png";
import eshopnow from "../../assets/eshopnow.png";
import ourhistory from "../../assets/ourhistory.png";
import { Row, Col, Container } from "reactstrap";
import { HashLink } from "react-router-hash-link";
import { BsEyeglasses } from "react-icons/bs";
import aboutusTitle from "../../assets/About-Us.png";
import eShopNowTitle from "../../assets/eShop-Now.png";
import OurHistoryTitle from "../../assets/Our-History.png";

const About = () => {
  return (
    <div className="about" id="about">
      <div className=" mt-5 text-center">
        <img
          src={aboutusTitle}
          style={{ height: "4.4rem" }}
          alt="all categorys"
        />
      </div>
      <div className="d-flex justify-content-center">
        <hr
          style={{
            position: "relative",
            top: "-1.25rem",
            backgroundColor: "#434341",
            width: "100%",
          }}
        />
      </div>
      <Row>
        <div className="visionmenu mb-5 d-flex justify-content-center">
          <HashLink
            to="/#vision"
            className="font font1  ms-0  text-nowrap  text-center"
          >
            Our vision
          </HashLink>
          <HashLink
            to="/#eshopnow"
            className="font font2  text-nowrap text-center"
          >
            eShop Now
          </HashLink>
          <HashLink
            to="/#history"
            className="font font3 me-0 text-nowrap  text-center"
          >
            Our History
          </HashLink>
        </div>
      </Row>     
      <Row id="vision">
        <Col lg="6" md="6" sm="12" xs="12" className="m-0 p-0 rowVision">
          <div>
            <img
              className="w-100 m-0 p-0 rowVision"
              src={imgAbout}
              alt="shopping"
            />
          </div>
        </Col>
        <Col lg="6" md="6" sm="12" xs="12" className="m-0 p-0 rowVision">
          <div className="ourVision1">
            <div className="ourVision2 d-flex justify-content-center align-item-center">
              <div className="ourVision3 text-center">
                <BsEyeglasses size={50} className="glasses" />
                <h3 className="text-light">Our Vision</h3>
                <p className="text-light">
                  Revolutionize the shopping experience around the world
                </p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="my-5 colvision">
        <Col className="mb-5">
          <div className="text-center">
            <img src={aaa} alt="eshop" />
          </div>
          <div className="text-center fs-4">
            <p>Provide products </p>
            <p className="txtmiddle"> 100% </p>
            <p> authentic</p>
          </div>
        </Col>
        <Col className="mb-5">
          <div className="text-center">
            <img src={bbb} alt="eshop" />
          </div>
          <div className="text-center fs-4">
            <p>With the best</p>
            <p className="txtmiddle">price</p>
            <p>the world</p>
          </div>
        </Col>
        <Col className="mb-5">
          <div className="text-center">
            <img src={ccc} alt="eshop" />
          </div>
          <div className="text-center fs-4">
            <p> the platform</p>
            <p className="txtmiddle">purchase</p>
            <p>the most practical</p>
          </div>
        </Col>
        <Col className="mb-5">
          <div className="text-center">
            <img src={ddd} alt="eshop" />
          </div>
          <div className="text-center fs-4">
            <p className="p-0 m-0">Bring you the</p>
            <p className="txtmiddle">best support</p>
            <p>in in the world</p>
          </div>
        </Col>
      </Row>
      <Row className="rownow mb-5" id="eshopnow">
        <div className="now">
          <Row>
            <Col className=" mt-5  text-center">
              <div className="txtimgNow1">
                <img src={eshopnow} alt="eshop" />
                {/* <h2 className="text-center nowtitre ">eShop Now</h2> */}
                <div className=" d-flex justify-content-center">
                  <img
                    src={eShopNowTitle}
                    style={{ height: "55px" }}
                    alt="all categorys"
                  />
                </div>
                <p className="text-center ">In a Few Numbers</p>
              </div>
            </Col>
          </Row>
          <Row className="d-flex justify-content-between">
            <Col className=" mb-3 mx-4 nowCol">
              <div className="hovenow hovenow  flex-column ">
                <div className="nowimg1 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    +300,000 <br /> Products
                  </p>
                </div>
                <p className="text-center">
                  eShop offers you the most assortment wide at an unbeatable
                  price
                </p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol">
              <div className="hovenow flex-column ">
                <div className="nowimg2 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    23 country
                    <br /> Africans
                  </p>
                </div>
                <p className="text-center">
                  No. 1 in Morocco eShop is present in Egypt, Ivory Coast, ...
                </p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol">
              <div className="hovenow flex-column ">
                <div className="nowimg3 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    7,000 <br />
                    brands National <br /> & International
                  </p>
                </div>
                <p className="text-center">
                  Samsung, Infinix, Innjoo, Vero Moda, Jack & Jones...
                </p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol">
              <div className="hovenow flex-column ">
                <div className="nowimg4 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    50% of <br />
                    female managers
                  </p>
                </div>
                <p className="text-center">CEO & MD included </p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol">
              <div className="hovenow flex-column ">
                <div className="nowimg5 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    +550,000 <br /> registrations
                  </p>
                </div>
                <p className="text-center">to the Newsletter in Morocco </p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol">
              <div className="hovenow flex-column ">
                <div className="nowimg6 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    2,000 <br /> Employees
                  </p>
                </div>
                <p className="text-center">around the world </p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol itemnow">
              <div className="hovenow flex-column ">
                <div className="nowimg7 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    +3,000,000
                    <br /> visits
                  </p>
                </div>
                <p className="text-center">per month</p>
              </div>
            </Col>
            <Col className="mb-3 mx-4 nowCol">
              <div className="hovenow flex-column ">
                <div className="nowimg8 nowimg mx-auto d-flex">
                  <p className="m-auto text-center">
                    +120,000 <br /> Orders
                  </p>
                </div>
                <p className="text-center">all month of Black Friday 2019 </p>
              </div>
            </Col>
          </Row>
        </div>
      </Row>
      <Row id="history" className="mt-5">
        <Col  className="now fs-4 mt-5  text-center ">
          <div className="txtimgNow2">
            <img src={ourhistory} alt="eshop" />
            {/* <h2 className="text-center nowtitre ">Our History</h2> */}
            <div className=" d-flex justify-content-center">
                  <img
                    src={OurHistoryTitle}
                    style={{ height: "55px" }}
                    alt="all categorys"
                  />
                </div>
          </div>
          <Row  className=" d-flex justify-content-between">
            <Col className="me-5">
              <ul className=" text-start">
                <li>
                  Created in April 2016, eShop is the No. 1 e-commerce site in
                  Morocco whose objective and vision are to provide the widest
                  assortment at the best price for all Moroccans.
                </li>
                <li>
                  The eShop.ma website is unquestionably the leading online
                  shopping destination in Morocco, with 8.5 million monthly
                  visits, 3,000 sellers and over 300,000 products.
                </li>
                <li>
                  eSHop is one of the Top 10 most visited sites in Morocco.
                </li>
                <li>The average delivery time is 1-5 days.</li>
              </ul>
            </Col>
            <Col>
              <ul className="text-start">
                <li>
                  eShop offers quality services adapted to e-commerce in Africa:
                  delivery throughout the kingdom, flexible payment methods
                  (payment in cash on delivery, by credit card) and free returns
                  within 7 days.
                </li>
                <li>
                  eShop Morocco employs 350 people including a great team
                  available to our customers 6 days a week.
                </li>
                <li>
                  eShop has set up training sessions dedicated to sellers that
                  will allow them to improve their sales performance and develop
                  their skills.
                </li>
              </ul>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default About;
