function Contact() {
  return (
    <div className="absolute bottom-0 w-full z-50 px-4 py-6 sm:px-6 sm:py-8 md:p-10 text-right">
      <h1 className="font-zalando font-bold md:font-medium text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-[#08241D] leading-tight sm:leading-normal">
        START WITH US NOW
      </h1>
      <span className="text-[#08241D] font-medium text-xs sm:text-lg md:text-2xl lg:text-3xl mt-2 sm:mt-4 block">
        follow us on facebook{" "}
        <a 
          href="https://www.facebook.com/surelifefbpage" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-[#392c1d] hover:text-[#08241D] transition-all duration-300 cursor-pointer font-semibold px-3 py-2 rounded-lg hover:bg-[#c69c6d] hover:bg-opacity-20 border-2 border-transparent hover:border-[#c69c6d]"
        >
          @Surelife Philippines Main
        </a>
      </span>
    </div>
  );
}

export default Contact;