import Image from "../../assets/images/Image.png";
import { motion } from "framer-motion";

function Services() {
  const textLines = [
    "We Help Create",
    "Memories of",
    "loved ones we",
    "will always",
    "remember",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}       
      whileInView={{ opacity: 1, y: 0 }}   
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-full min-h-screen  bg-[#08241D] flex flex-col items-center justify-center text-center py-12 px-4 sm:px-6 md:px-10 lg:px-16"
    >
      <h1 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl text-[#DEC79E] font-bold mb-10">
        OUR SERVICES
      </h1>

      <div className="flex flex-col md:flex-row items-center justify-center md:gap-8 w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}    
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col gap-2 text-[#DEC79E] font-libertinus text-center md:text-left order-1 md:order-2"
        >
          <div className="md:hidden text-lg sm:text-xl font-semibold text-left">
            We Help Create Memories of loved ones we will always remember
          </div>

          <div className="hidden md:flex md:flex-col md:gap-2">
            {textLines.map((line, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}  
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="text-3xl lg:text-5xl font-semibold"
              >
                {line}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.img
          src={Image}
          alt="Services"
          initial={{ opacity: 0, y: 50 }}     
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl h-auto rounded-md object-cover order-2 md:order-1 mt-2 md:mt-0"
        />
      </div>
    </motion.div>
  );
}

export default Services;
