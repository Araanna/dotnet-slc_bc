import Contact from "../pages/Contact";
function HeroMessage() {
  return (
    <div className="relative max-w-full min-h-[120vh] bg-[#B5E099] z-[-50]">
      <div
        className="absolute top-0 left-0 w-full bg-[#08241D] z-[-30]"
        style={{
          borderBottomLeftRadius: "2rem",
          height: "calc(140vh - 15rem)",
          transform: "skewY(-10deg)",
          transformOrigin: "top left",
          marginTop: "-5rem",
          marginBottom: "-5rem",
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full text-center px-10 pt-[25vh] pb-48">
        <h1 className="mt-6 font-dancing text-3xl md:text-5xl lg:text-7xl text-[#DEC79E] px-10 pb-8">
          "Those we love don't go away, they walk beside us every day. Unseen,
          unheard, but always near, still loved, still missed, and very dear."
        </h1>
      </div>

      <Contact />
    </div>
  );
}

export default HeroMessage;