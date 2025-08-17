/*
 * eShop Project
 * Copyright (c) 2025 Oumaima El Obayid
 *
 * This file is part of the eShop application.
 * It is licensed under the MIT License.
 * You may freely use, modify, and distribute this file
 * provided that the above copyright notice and this
 * permission notice appear in all copies.
 *
 * MIT License details: https://opensource.org/licenses/MIT
 */

import { Helmet } from "../../components";

const Policy = () => {
  return (
    <Helmet>
      <div className="container my-5">
        <h1 className="mb-4 " style={{ color: "var(--color-orange)" ,marginTop:"80px"}}>Privacy Policy</h1>
        <p className="text-muted mb-4">Last updated: January 10, 2023</p>

        <p>
          This Privacy Policy describes Our policies and procedures on the
          collection, use and disclosure of Your information when You use the
          Service and tells You about Your privacy rights and how the law protects
          You.
        </p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Interpretation and Definitions</h4>

        <h5 className="mb-2">Interpretation</h5>
        <p>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions shall
          have the same meaning regardless of whether they appear in singular or
          in plural.
        </p>

        <h5 className="mb-2">Definitions</h5>
        <p>For the purposes of this Privacy Policy:</p>
        <ul style={{ fontSize: "1.1rem" }}>
          <li><strong>Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
          <li><strong>Company</strong> refers to eshop.</li>
          <li><strong>Cookies</strong> are small files placed on Your device by a website.</li>
          <li><strong>Country</strong> refers to Morocco.</li>
          <li><strong>Device</strong> means any device that can access the Service.</li>
          <li><strong>Personal Data</strong> is any information relating to an identified or identifiable individual.</li>
          <li><strong>Service</strong> refers to the Website.</li>
          <li><strong>Service Provider</strong> refers to any person or company processing data on behalf of the Company.</li>
          <li><strong>Usage Data</strong> refers to data collected automatically from the Service.</li>
          <li>
            <strong>Website</strong> refers to eshop, accessible from{" "}
            <a href={process.env.REACT_APP_BASE_URL} target="_blank" rel="noopener noreferrer">
              {process.env.REACT_APP_BASE_URL}
            </a>
          </li>
          <li><strong>You</strong> means the individual accessing or using the Service.</li>
        </ul>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Collecting and Using Your Personal Data</h4>

        <h5 className="mb-2">Types of Data Collected</h5>
        <h6 className="mb-2">Personal Data</h6>
        <p>
          While using Our Service, We may ask You to provide certain personally identifiable information:
        </p>
        <ul style={{ fontSize: "1.1rem" }}>
          <li>Email address</li>
          <li>First name and last name</li>
          <li>Phone number</li>
          <li>Address, State, Province, ZIP/Postal code, City</li>
          <li>Usage Data</li>
        </ul>

        <h6 className="mb-2">Usage Data</h6>
        <p>Usage Data is collected automatically when using the Service.</p>

        <h5 className="mt-4 mb-2">Tracking Technologies and Cookies</h5>
        <p>We use Cookies and similar tracking technologies to track activity on Our Service and store certain information.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Use of Your Personal Data</h4>
        <p>The Company may use Personal Data for purposes including:</p>
        <ul style={{ fontSize: "1.1rem" }}>
          <li>To provide and maintain our Service</li>
          <li>To manage Your Account</li>
          <li>For performance of a contract</li>
          <li>To contact You</li>
          <li>To provide news, offers, and information</li>
          <li>To manage Your requests</li>
          <li>For business transfers</li>
          <li>For other purposes like data analysis</li>
        </ul>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Retention of Your Personal Data</h4>
        <p>We retain Personal Data only as long as necessary to comply with legal obligations and improve our Service.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Transfer of Your Personal Data</h4>
        <p>Your information may be processed outside of Your jurisdiction.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Delete Your Personal Data</h4>
        <p>You have the right to delete or request deletion of your Personal Data.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Disclosure of Your Personal Data</h4>
        <p>We may share Your information with service providers, affiliates, business partners, and with Your consent.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Security of Your Personal Data</h4>
        <p>We take reasonable steps to protect Your Personal Data but cannot guarantee absolute security.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Children's Privacy</h4>
        <p>Our Service does not address anyone under 13.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Links to Other Websites</h4>
        <p>Our Service may contain links to third-party websites.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Changes to this Privacy Policy</h4>
        <p>We may update this Privacy Policy periodically and notify You via email or on the Service.</p>

        <h4 className="mt-5 mb-3" style={{ color: "var(--color-orange)" }}>Contact Us</h4>
        <p>If you have questions, contact us by email: {process.env.REACT_APP_EMAIL_ADMIN}</p>
      </div>
    </Helmet>
  );
};

export default Policy;
