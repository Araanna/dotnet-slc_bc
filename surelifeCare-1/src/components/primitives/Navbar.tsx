import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Automatically highlight "About" when on /about
    if (location.pathname === "/about") {
      setActive("about");
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 50);

      // Only run scroll detection on the homepage
      if (location.pathname !== "/") return;

      const sections = ["home", "services", "products"];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavigateAndScroll = (id: string) => {
    setIsMenuOpen(false);
    setActive(id);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 400);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const goToAbout = () => {
    navigate("/about");
    setActive("about");
    setIsMenuOpen(false);
  };

  const handleContact = () => {
    setActive("contact");
    setIsMenuOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      }, 400);
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }
  };

  const defaultStyle = "text-[#DEC79E] hover:text-[#B5E099] transition-colors";
  const activeStyle = "text-[#B5E099] font-semibold";

  return (
    <>
      <div
        className={`w-[90%] mx-auto my-4 flex flex-row justify-between items-center px-6 py-6 
          fixed top-4 left-1/2 -translate-x-1/2 bg-[#08241D]/70 z-50 
          rounded-2xl shadow-lg border border-[#DEC79E]/20 transition-all duration-300`}
      >
    
        <div className={`transition-all duration-300 ${isScrolled ? "md:scale-90" : "scale-100"}`}>
          <h1
            className={`font-bold text-left text-[#DEC79E] ${
              isScrolled
                ? "md:text-md text-base transition-all duration-300"
                : "md:text-xl text-base"
            }`}
          >
            SURELIFE CARE AND SERVICES
          </h1>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex flex-row items-center space-x-6 font-medium">
          <button
            onClick={() => handleNavigateAndScroll("home")}
            className={`${active === "home" ? activeStyle : defaultStyle}`}
          >
            Home
          </button>
          <button
            onClick={goToAbout}
            className={`${active === "about" ? activeStyle : defaultStyle}`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavigateAndScroll("services")}
            className={`${active === "services" ? activeStyle : defaultStyle}`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavigateAndScroll("products")}
            className={`${active === "products" ? activeStyle : defaultStyle}`}
          >
            What We Do
          </button>
          <button
            onClick={handleContact}
            className={`ml-4 px-3 py-2 rounded-xl font-medium tracking-wide shadow-lg 
              transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 
              ${
                active === "contact"
                  ? "bg-[#4c5f3f] text-[#B5E099]"
                  : "bg-[#B5E099] text-black hover:bg-[#4c5f3f] hover:text-[#B5E099]"
              }`}
          >
            Contact Us
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-[#DEC79E] p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="w-6 h-6 bg-green-950 p-1 rounded-md" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-[#08241D]/70 backdrop-blur-lg z-40 transition-all duration-300 md:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-start justify-start h-full pt-[10rem] pl-6 space-y-4">
          <button
            onClick={() => handleNavigateAndScroll("home")}
            className={`${active === "home" ? activeStyle : defaultStyle} text-lg`}
          >
            Home
          </button>
          <button
            onClick={goToAbout}
            className={`${active === "about" ? activeStyle : defaultStyle} text-lg`}
          >
            About Us
          </button>
          <button
            onClick={() => handleNavigateAndScroll("services")}
            className={`${active === "services" ? activeStyle : defaultStyle} text-lg`}
          >
            Services
          </button>
          <button
            onClick={() => handleNavigateAndScroll("products")}
            className={`${active === "products" ? activeStyle : defaultStyle} text-lg`}
          >
            What We Offer
          </button>
          <button
            onClick={handleContact}
            className={`${active === "contact" ? activeStyle : defaultStyle} text-lg`}
          >
            Contact
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
