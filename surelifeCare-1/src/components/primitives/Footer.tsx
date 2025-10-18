import React from "react";
import { Phone, Mail } from "lucide-react";
import SLCLogo from "../../assets/images/SurelifeLogo.png";
import { FaFacebookF } from "react-icons/fa";

// --- Constants ---
const COLORS = {
  DARK_BG: "bg-[#08241D]",
  ACCENT_GOLD: "text-[#c69c6d]",
  BTN_GOLD: "bg-[#c69c6d]",
  TEXT_LIGHT: "text-gray-100",
  TEXT_FADED: "text-gray-400",
  BORDER_COLOR: "border-gray-600",
  HOVER_GOLD: "hover:text-[#c69c6d]",
  HOVER_BG_GOLD: "hover:bg-[#c69c6d]",
};

// --- Sub-Components ---
const ContactDetail: React.FC<{
  icon: React.ReactNode;
  text: string;
  type: "tel" | "mail";
}> = ({ icon, text, type }) => {
  const href =
    type === "tel" ? `tel:${text.replace(/[^0-9+]/g, "")}` : `mailto:${text}`;
  return (
    <a
      href={href}
      className="flex items-center space-x-3 group transition-all duration-300 ease-in-out transform hover:translate-x-1"
    >
      <span
        className={`${COLORS.ACCENT_GOLD} flex-shrink-0 transition-colors duration-300 group-hover:text-white group-hover:bg-[#c69c6d] p-1 rounded-full`}
      >
        {icon}
      </span>
      <span
        className={`text-sm md:text-base ${COLORS.TEXT_LIGHT} transition-colors duration-300 group-hover:text-[#c69c6d]`}
      >
        {text}
      </span>
    </a>
  );
};

const NavItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <li className="mb-3">
      <a
        href="#"
        className={`text-sm font-semibold tracking-wider ${COLORS.TEXT_LIGHT} relative transition-all duration-300 ease-in-out 
          hover:text-[#c69c6d] transform hover:translate-x-2
          before:content-[''] before:absolute before:left-0 before:bottom-0 
          before:w-0 before:h-0.5 before:bg-[#c69c6d] 
          before:transition-all before:duration-300 
          hover:before:w-full`}
      >
        {text}
      </a>
    </li>
  );
};

// --- Main Footer Component ---
const Footer: React.FC = () => {
  return (
    <footer
      className={`${COLORS.DARK_BG} font-['Inter',_sans-serif] w-full relative z-10 overflow-hidden`}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8">
          {/* Left: Google Map */}
          <div className="w-full lg:w-1/2 h-80 lg:h-96 rounded-md overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-500">
            <iframe
              title="SLC Location: 165 N. Bacalso Road, Cebu City"
              src="https://maps.google.com/maps?q=165%20n.%20bacalso%20road%20cebu%20city%206000%20Cebu%20City,%20Philippines&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0, filter: "grayscale(10%) invert(0)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-500 hover:grayscale-0"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col md:flex-row gap-12 md:gap-16 lg:gap-20 md:ml-20">
            <div className="flex-1 space-y-10">
              <div className="transform transition-all duration-500 hover:translate-y-1">
                <h2
                  className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative inline-block
                  after:content-[''] after:absolute after:left-0 after:-bottom-2 
                  after:w-12 after:h-0.5 after:bg-[#c69c6d] after:transition-all after:duration-300 
                  hover:after:w-16"
                >
                  Contact
                </h2>
                <div className="space-y-4">
                  <ContactDetail
                    icon={<Phone size={18} />}
                    text="0919 004 5635"
                    type="tel"
                  />
                  <ContactDetail
                    icon={<Mail size={18} />}
                    text="justclickcebu@gmail.com"
                    type="mail"
                  />
                </div>
              </div>

              {/* Working Hours */}
              <div className="transform transition-all duration-500 hover:translate-y-1">
                <h2
                  className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative inline-block
                  after:content-[''] after:absolute after:left-0 after:-bottom-2 
                  after:w-12 after:h-0.5 after:bg-[#c69c6d] after:transition-all after:duration-300 
                  hover:after:w-16"
                >
                  Working Hours
                </h2>
                <div className="space-y-2">
                  <p
                    className={`text-sm md:text-base ${COLORS.TEXT_LIGHT} transition-colors duration-300 hover:text-[#c69c6d]`}
                  >
                    Monday - Sunday
                  </p>
                  <p
                    className={`text-sm md:text-base ${COLORS.TEXT_LIGHT} transition-colors duration-300 hover:text-[#c69c6d]`}
                  >
                    08:00 am - 05:00 pm
                  </p>
                </div>
              </div>
            </div>

            {/* Information Column */}
            <div className="flex-1 transform transition-all duration-500 hover:translate-y-1">
              <h2
                className="text-lg font-bold text-white mb-6 uppercase tracking-wider relative inline-block
                after:content-[''] after:absolute after:left-0 after:-bottom-2 
                after:w-12 after:h-0.5 after:bg-[#c69c6d] after:transition-all after:duration-300 
                hover:after:w-16"
              >
                Information
              </h2>
              <nav>
                <ul className="space-y-1">
                  {["HOME", "ABOUT", "SERVICES", "WHAT WE DO", "CONTACT"].map(
                    (item) => (
                      <NavItem key={item} text={item} />
                    )
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Section with Logo and Social */}
      <div className={`border-t ${COLORS.BORDER_COLOR}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row items-center justify-end gap-6">
            {/* Logo */}
            <div className="transform transition-all duration-500 hover:scale-110">
              <div className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg overflow-hidden border-2 border-transparent hover:border-[#c69c6d] transition-colors duration-300">
                <img
                  src={SLCLogo}
                  alt="Sure Life Clinic Logo"
                  className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>

            {/* Social */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/surelifefbpage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 bg-transparent border-2 border-[#c69c6d] rounded-full flex items-center justify-center text-[#c69c6d] shadow-lg 
      transform transition-all duration-300 hover:scale-110 hover:bg-[#c69c6d] hover:text-white hover:border-[#c69c6d]
      group relative overflow-hidden"
                aria-label="Visit our Facebook page"
              >
                <FaFacebookF className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className={`py-4 border-t border-gray-700 bg-black bg-opacity-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <p
            className={`text-center text-xs ${COLORS.TEXT_FADED} transition-colors duration-300 hover:text-gray-200`}
          >
            Copyright &copy; 2025 | Developed by{" "}
            <span className="text-[#c69c6d] transition-colors duration-300 hover:text-white">
              Just Click Integrated Solutions
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
