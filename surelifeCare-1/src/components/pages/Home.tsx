import bgImage from "../../assets/images/Background.png";
import SLCLogo from "../../assets/images/SurelifeLogo.png";
import Navbar from '../primitives/Navbar'

function Home() {
  return (
    <div className="relative w-full min-h-screen">
      <img
        src={bgImage}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />

    
      <Navbar />

      {/* Add padding-top to account for navbar height */}
      <div className="pt-20"> {/* Adjust this value based on your navbar height */}
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center space-y-4 px-6">
          <img
            src={SLCLogo}
            alt="Company Logo"
            className="w-40 md:w-60 lg:w-72 drop-shadow-lg"
          />
          <h1
            className="font-italianno italic font-semibold text-4xl md:text-5xl drop-shadow-xl
               bg-gradient-to-b from-[#F7F0E5] via-[#DEC79E] to-[#E0C499]
               bg-clip-text text-transparent"
          >
            Smile to a worry free financial future
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;