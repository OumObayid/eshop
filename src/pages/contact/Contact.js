import React from "react";
import {Helmet} from "../../components";
import "./Contact.css";
const Contact = () => {
  return (
    <Helmet title="contact">
      <section className=" contact" id="contact">
        <div className="h3 text-center  mb-4 title mt-4 d-flex align-items-center justify-content-center">
          <strong>Let's Get In Touch</strong>
        </div>
        <div className="container  p-4 ">
          <div className="section-title mb-5 text-center ">
            <p className="fs-3">
              Convinced to start an interview with us? <br />Send us a message and
              we'll get back to you as soon as possible!
            </p>
          </div>
          <div className="infos row">
            <div className=" col-lg-6">
              <div className="shadow text-center mb-4 py-3">
                <p>
                  <i className="fas fa-map-marker-alt"></i>
                </p>
                <h5>
                  <strong> Address</strong>
                </h5>
                <p>45, Boulevard Hassan II casablanca</p>
              </div>
            </div>

            <div className=" col-lg-3 col-md-6">
              <div className="shadow text-center mb-4 pt-3 pb-3">
                <p>
                  <i className="fas fa-at"></i>
                </p>
                <h5>
                  <strong>Email Us</strong>
                </h5>
                <p>Obayid@company.com</p>
              </div>
            </div>
            <div className=" col-lg-3 col-md-6">
              <div className="shadow text-center mb-4 pt-3 pb-3">
                <p>
                  <i className="fas fa-phone-alt"></i>
                </p>
                <h5>
                  <strong>Call Us</strong>
                </h5>
                <p>+212 555 555 555</p>
              </div>
            </div>
          </div>
          <div className=" frmcart row d-flex justify-content-between pe-2">
            <div className="col-lg-6 mb-3">
              <form
                id="myForm"
                className="shadow col-12 mb-3 p-3"
                name="contact"
                method="post"
                action="#"
              >
                <div className="form-row row">
                  <div className="input-icons col-md-6 form-group mb-4">
                    <i className="far fa-user"></i>
                    <input
                      type="text"
                      name="name"
                      className="form-control name"
                      id="name"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="input-icons col-md-6 form-group mb-4">
                    <i className="far fa-envelope"></i>
                    <input
                      type="email"
                      className="form-control email"
                      name="email"
                      id="email"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                <div className="input-icons form-group mb-4">
                  <i className="far fa-file-alt"></i>
                  <input
                    type="text"
                    className="form-control subject"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                  />
                </div>
                <div className="form-group mb-4">
                  <textarea
                    className="form-control message"
                    name="message"
                    id="message"
                    rows="7"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <div
                  id="message-submit"
                  className="text-center text-danger"
                ></div>
                <div className="text-center">
                  <button id="submit" type="submit">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="shadow map mb-3 col-lg-6 p-0 ">              
              <iframe
                title="adress"
                className="shadow-card "
                src="https://maps.google.com/maps?q=45,%20Boulevard%20Hassan%20II%20casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed"        
                style={{ width: "100%", height: "335px",  }}                
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </Helmet>
  );
};

export default Contact;
