import FacebookPage from "../primitives/FacebookPage";




const About = () => {
  return (
    <section className="bg-[#08241D] text-[#DEC79E] min-h-screen flex flex-col items-center px-4 md:px-6 py-12">
      <div className="w-full flex flex-col items-center justify-center pt-28 pb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-[#B5E099]">About Us</h1>
        <p className="italic text-[#CFC3A4] max-w-3xl px-2 text-lg">
          “Because at <span className="font-semibold">SureLife Care</span>, we don’t just protect your future — we care for your present.”
        </p>
      </div>


      <div className="flex flex-col lg:flex-row lg:items-start justify-center w-full max-w-7xl gap-8 lg:gap-12 pb-16">
    
       
        <div className="w-full max-w-xl lg:w-1/2 flex justify-center order-1 lg:order-none">
         <FacebookPage />
        </div>

       
        <div className="w-full  space-y-4 order-2 ">
          
          <div className="space-y-3">
            {/* Company Profile */}
            <div className="collapse collapse-arrow   rounded-xl bg-[#0C3328]/70">
              <input type="radio" name="accordion" defaultChecked />
              <div className="collapse-title text-xl font-medium text-[#B5E099] border-b border-[#CFC3A4]/30">Company Profile</div>
              <div className="collapse-content text-justify space-y-3 p-4">
                <p>
                  Sure Life Care Marketing Services was established in July 2009 as a lay-away financial program
                  designed to help people in times of need at a very affordable cost. Sure Life has continued to
                  respond to the ever-growing demands and the changing market conditions, especially with the
                  devaluation of the peso, through our Price Protection Program.
                </p>
                <p>
                  With its unique lay-away financial program, Sure Life was able to capture 2,600 members within its
                  first year, growing by at least 600 members per month. Initially, the company only catered to a
                  5-year lay-away financial program, but today, we offer various commodities that are affordable to
                  consumers. We have also extended our services to provide discounts in different areas and fields
                  of basic needs and wants.
                </p>
                <p>
                  Sure Life envisions that every business partner can achieve financial freedom through its
                  ladderized marketing program. Let Sure Life be the vehicle for each and every individual to
                  achieve their dream of having a financially stable and worry-free future.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="collapse collapse-arrow   rounded-xl bg-[#0C3328]/70">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-[#B5E099] border-b border-[#CFC3A4]/30">Vision</div>
              <div className="collapse-content text-justify p-4">
                <p>
                  Surelife Care & Services envisions a community having an adequate financial program with direct
                  access to affordable services, accidental protection—dispensing unnecessary paper works and too
                  stringent company restrictions.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="collapse collapse-arrow  rounded-xl bg-[#0C3328]/70">
              <input type="radio" name="accordion" />
              <div className="collapse-title text-xl font-medium text-[#B5E099] border-b border-[#CFC3A4]/30">Mission</div>
              <div className="collapse-content text-justify space-y-3 p-4">
                <p>
                  By faith and tradition Filipinos have found strength and comfort in the giving of a final and
                  fitting tribute to our dearly departed. Surelife Care & Services, with affordable and complete
                  service care programs, is designed to serve as a consistent source of solace and support in one
                  of the most trying phases of our Christian lives.
                </p>
                <p>
                  With its Financial Program of investment, protection, and security, we prepare for the inevitable
                  and the unexpected—when the feeling of loss and economic disorientation is most acute wherever
                  and whenever it happens.
                </p>
              </div>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="flex justify-center lg:justify-start pt-4">
             <div className="border-2 border-[#B5E099]  w-fit px-8 py-3 bg-[#B5E099]/10  transition-colors cursor-pointer">
                <h1 className="text-xl font-semibold text-[#B5E099]">Get Started</h1>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
