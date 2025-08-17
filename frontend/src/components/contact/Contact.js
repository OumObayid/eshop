/*
 * eShop Project - Contact Component
 * Description: Displays the contact section with a contact form, company info, and map.
 * Handles user input and sends messages to the admin email via API.
 * Includes loading, success, and error states for user feedback.
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

import { useState } from "react";
import axios from "axios";

import "./Contact.css";
import contactTitle from "../../assets/contact.png";

const Contact = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Loading and feedback messages
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Update form fields on user input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    const BASE_URL_APIEMAIL = process.env.REACT_APP_API_BASE_URL_EMAIL;

    const dataMessage = {
      to: process.env.REACT_APP_EMAIL_ADMIN,
      subject: formData.subject,
      message: `<p><strong>De :</strong> ${formData.email}</p>
                <p><strong>Message :</strong></p>
                <p>${formData.message}</p>`,
    };

    try {
      const response = await axios.post(
        `${BASE_URL_APIEMAIL}/apiEmail/email/sendEmail.php`,
        dataMessage
      );

      if (response.data.success) {
        setSuccess("Message envoyé avec succès !");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setError("Erreur lors de l'envoi du message.");
      }
    } catch (err) {
      console.error(err);
      setError("Erreur de connexion au serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact" id="contact">
      {/* Header image */}
      <div className="mb-3 text-center">
        <img
          src={contactTitle}
          style={{ height: "6.25rem" }}
          alt="Contact"
        />
      </div>

      {/* Divider line */}
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

      <div className="p-4">
        {/* Section title */}
        <div className="section-title mb-5 text-center">
          <p className="fs-3">
            Convinced to start an interview with us? <br />
            Send us a message and we'll get back to you as soon as possible!
          </p>
        </div>

        {/* Company info cards */}
        <div className="infos row">
          <div className="col-lg-6">
            <div className="shadow text-center mb-4 py-3">
              <p><i className="fas fa-map-marker-alt"></i></p>
              <h5><strong>Address</strong></h5>
              <p>45, Boulevard Hassan II Casablanca</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="shadow text-center mb-4 pt-3 pb-3">
              <p><i className="fas fa-at"></i></p>
              <h5><strong>Email Us</strong></h5>
              <p>Obayid@company.com</p>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="shadow text-center mb-4 pt-3 pb-3">
              <p><i className="fas fa-phone-alt"></i></p>
              <h5><strong>Call Us</strong></h5>
              <p>+212 555 555 555</p>
            </div>
          </div>
        </div>

        {/* Contact form and map */}
        <div className="frmcart row d-flex justify-content-between pe-2">
          {/* Contact form */}
          <div className="col-lg-6 mb-3">
            <form
              onSubmit={handleSubmit}
              id="myForm"
              className="shadow col-12 mb-3 p-3"
              name="contact"
              method="post"
            >
              <div className="form-row row">
                <div className="input-icons col-md-6 form-group mb-4">
                  <i className="far fa-user"></i>
                  <input
                    type="text"
                    name="name"
                    className="form-control name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your Name"
                  />
                </div>
                <div className="input-icons col-md-6 form-group mb-4">
                  <i className="far fa-envelope"></i>
                  <input
                    type="email"
                    className="form-control email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
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
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject"
                />
              </div>

              <div className="form-group mb-4">
                <textarea
                  className="form-control message"
                  name="message"
                  rows="7"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                ></textarea>
              </div>

              {/* Submission button and feedback messages */}
              <div className="text-center">
                <button id="submit" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {success && <p style={{ color: "green" }}>{success}</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}
              </div>
            </form>
          </div>

          {/* Google Map */}
          <div className="shadow map mb-3 col-lg-6 p-0">
            <iframe
              title="address"
              className="shadow-card"
              src="https://maps.google.com/maps?q=45,%20Boulevard%20Hassan%20II%20casablanca&t=&z=13&ie=UTF8&iwloc=&output=embed"
              style={{ width: "100%", height: "335px" }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
