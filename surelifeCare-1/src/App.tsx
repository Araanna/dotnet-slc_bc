import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Services from "./components/pages/Services";
import Products from "./components/pages/Products";
import HeroMessage from "./components/pages/HeroMessage";
import Footer from "./components/primitives/Footer";
import Navbar from "./components/primitives/Navbar";
import About from "./components/pages/AboutUs";
import Masonry from './components/primitives/Masonary';
import { galleryItems } from "./data/galleryItems";
import "./App.css";

function App() {
  return (
    <main className="min-h-screen flex flex-col scroll-smooth m-0 w-full overflow-x-hidden">
      <Navbar />

      <div className="flex-1 m-0 w-full">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <>
                <section id="home" className="w-full">
                  <Home />
                </section>

                <section id="services" className="w-full">
                  <Services />
                </section>

                <section id="products" className="w-full">
                  <Products />
                </section>

                {/* Masonry Gallery Section - Hidden on mobile */}
                <section id="gallery" className="w-full py-8 md:py-16 lg:py-20 xl:py-[20rem] mb-[16rem] md:mb-16 lg:mb-20 xl:mb-[20rem] hidden md:block">
                  <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="flex justify-center items-center w-full">
                      <div className="w-full max-w-7xl mb-[20rem]">
                        <Masonry
                          items={galleryItems}
                          ease="power3.out"
                          duration={0.6}
                          stagger={0.05}
                          animateFrom="bottom"
                          scaleOnHover={true}
                          hoverScale={0.95}
                          blurToFocus={true}
                          colorShiftOnHover={false}           
                        />
                      </div>
                    </div>
                  </div>
                </section>

                <section id="hero" className="w-full">
                  <HeroMessage />
                </section>
              </>
            }
          />

          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <footer id="contact" className="w-full">
        <Footer />
      </footer>
    </main>
  );
}

export default App;