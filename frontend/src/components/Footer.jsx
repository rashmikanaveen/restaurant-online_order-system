import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/contact");
  };

  const handleTermsClick = (e) => {
    e.preventDefault();
    // Handle terms of service click
  };

  const handlePrivacyClick = (e) => {
    e.preventDefault();
    // Handle privacy policy click
  };

  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-6 px-16 font-sans tracking-wide w-auto ">
      <div className="flex justify-between items-center max-lg:flex-col text-center flex-wrap gap-4">
        <p className="text-[15px] leading-loose">All rights reserved.</p>

        <ul className="flex space-x-6 gap-y-2 max-lg:justify-center flex-wrap">
          <li><a href="#" onClick={handleTermsClick} className="text-[15px] hover:text-white">Terms of Service</a></li>
          <li><a href="#" onClick={handlePrivacyClick} className="text-[15px] hover:text-white">Privacy Policy</a></li>
          <li><a href="#" onClick={handleContactClick} className="text-[15px] hover:text-white">Contact</a></li>
        </ul>
      </div>
    </footer>
    </div>
  );
};

export default Footer;