import React from "react";
import { assets } from "../../assets/assets";
import './Footer.css'

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            © 2025 FoodieExpress. All rights reserved. This platform brings you
            the finest dishes from top-rated restaurants near you with fast
            delivery, easy ordering, and delicious experiences every time. For
            support or inquiries, contact us anytime.
          </p>
          <div className="footer-social-icon">
          <img src={assets.facebook_icon} alt="" />
          <img src={assets.twitter_icon} alt="" />
          <img src={assets.linkedin_icon} alt="" />
        </div>
        </div>
        <div className="footer-content-center">
         <h2>COMPANY</h2>
         <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
         </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-221-456-9870</li>
                <li>contact@ankita.com</li>
            </ul>
        </div>
      </div>
      <hr/>
      <p className="footer-copyright">
        Copyright 2025 @ Ankita.com - All right reserved
      </p>
    </div>
  );
};

export default Footer;
