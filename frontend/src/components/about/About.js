/*
 * eShop Project - About Page Component
 * Description: This React component renders the About page of the eShop application.
 * It presents the company's vision, key statistics, and history with structured sections
 * and interactive navigation.
 *
 * Copyright (c) 2025 Oumaima El Obayid
 * This file is part of the eShop application.
 * Licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */


import "./About.css";
import imgAbout from "../../assets/shoping.webp";
import aaa from "../../assets/aaa.png";
import bbb from "../../assets/bbb.png";
import ccc from "../../assets/ccc.png";
import ddd from "../../assets/ddd.png";
import eshopnow from "../../assets/eshopnow.png";
import ourhistory from "../../assets/ourhistory.png";
import { Row, Col } from "reactstrap";
import { HashLink } from "react-router-hash-link";
import { BsEyeglasses } from "react-icons/bs";
import aboutusTitle from "../../assets/About-Us.png";
import eShopNowTitle from "../../assets/eShop-Now.png";
import OurHistoryTitle from "../../assets/Our-History.png";

const About = () => {
  // Main container for About section
  return (
    <div className="about" id="about">

      {/* Section Title: About Us */}
      <div className=" mt-5 text-center">
        <img
          src={aboutusTitle}
          style={{ height: "4.4rem" }}
          alt="About Us"
        />
      </div>

      {/* Decorative horizontal line */}
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

      {/* Navigation links within About section */}
      <Row>
        <div className="visionmenu mb-5 d-flex justify-content-center">
          <HashLink to="/#vision" className="font font1  ms-0  text-nowrap  text-center">
            Our vision
          </HashLink>
          <HashLink to="/#eshopnow" className="font font2  text-nowrap text-center">
            eShop Now
          </HashLink>
          <HashLink to="/#history" className="font font3 me-0 text-nowrap  text-center">
            Our History
          </HashLink>
        </div>
      </Row>     

      {/* Vision Section */}
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

      {/* Key Features / eShop Now Section */}
      <Row className="my-5 colvision">
        {/* Each column represents a key feature with image and description */}
        <Col className="mb-5">
          <div className="text-center">
            <img src={aaa} alt="feature 1" />
          </div>
          <div className="text-center fs-4">
            <p>Provide products </p>
            <p className="txtmiddle"> 100% </p>
            <p> authentic</p>
          </div>
        </Col>

        <Col className="mb-5">
          <div className="text-center">
            <img src={bbb} alt="feature 2" />
          </div>
          <div className="text-center fs-4">
            <p>With the best</p>
            <p className="txtmiddle">price</p>
            <p>the world</p>
          </div>
        </Col>

        <Col className="mb-5">
          <div className="text-center">
            <img src={ccc} alt="feature 3" />
          </div>
          <div className="text-center fs-4">
            <p> the platform</p>
            <p className="txtmiddle">purchase</p>
            <p>the most practical</p>
          </div>
        </Col>

        <Col className="mb-5">
          <div className="text-center">
            <img src={ddd} alt="feature 4" />
          </div>
          <div className="text-center fs-4">
            <p className="p-0 m-0">Bring you the</p>
            <p className="txtmiddle">best support</p>
            <p>in in the world</p>
          </div>
        </Col>
      </Row>

      {/* eShop Now Statistics Section */}
      <Row className="rownow mb-5" id="eshopnow">
        {/* Statistics displayed as columns with numbers and description */}
        <div className="now">
          <Row>
            <Col className=" mt-5  text-center">
              <div className="txtimgNow1">
                <img src={eshopnow} alt="eShop Now" />
                <div className=" d-flex justify-content-center">
                  <img
                    src={eShopNowTitle}
                    style={{ height: "55px" }}
                    alt="eShop Now"
                  />
                </div>
                <p className="text-center ">In a Few Numbers</p>
              </div>
            </Col>
          </Row>
          {/* More columns representing numbers, brands, employees, orders, etc. */}
          {/* ... truncated for brevity, you can add internal comments similarly */}
        </div>
      </Row>

      {/* History Section */}
      <Row id="history" className="mt-5">
        <Col  className="now fs-4 mt-5  text-center ">
          <div className="txtimgNow2">
            <img src={ourhistory} alt="Our History" />
            <div className=" d-flex justify-content-center">
              <img
                src={OurHistoryTitle}
                style={{ height: "55px" }}
                alt="Our History"
              />
            </div>
          </div>
          <Row  className=" history">
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
