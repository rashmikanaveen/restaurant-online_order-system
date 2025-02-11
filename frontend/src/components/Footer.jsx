import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Linkedin } from "lucide-react"
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
      <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://github.com/rashmikanaveen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <Github className="h-6 w-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/rashmika-naveen/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <Linkedin className="h-6 w-6" />
          </a>
        </div>
    </footer>
    </div>
  );
};

export default Footer;