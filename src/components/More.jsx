import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { moreServices } from "../data/home";

const MoreServices = () => {
  return (
    <div className="bg-white lg:px-24 px-4 py-20">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          More
        </motion.h2>
        <motion.p
          className="mb-[5rem]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
          viewport={{ once: true }}
        >
          WE MAINTAIN AN EXTENSIVE NETWORK OF OFFICES IN ALL MAJOR LOCATIONS TO
          ASSIST YOU WITH ALL YOUR SHIPPING NEEDS.
        </motion.p>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-14">
          {moreServices.map((service, index) => (
            <motion.div
              key={service.id}
              className="bg-white p-8 shadow-lg rounded-lg relative z-10 group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: "easeInOut",
                delay: 0.4 + index * 0.2,
              }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                <div className="w-fit flex justify-center items-center p-2 border-2 border-orange-450 bg-white rounded-full transition-all duration-500 ease-linear group-hover:bg-orange-450">
                  <span className="text-orange-450 transition-all duration-500 ease-linear group-hover:text-white text-6xl flex justify-center items-center h-[2rem] w-[2rem]">
                    {React.createElement(service.icon)}
                  </span>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2 text-orange-450">
                {service.title}
              </h3>
              <p className="text-base text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
        <Link to="/services">
          <motion.p
            className="text-orange-500 font-bold mt-8 inline-block hover:underline"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.4 }}
            viewport={{ once: true }}
          >
            All Services
          </motion.p>
        </Link>
      </div>
    </div>
  );
};

export default MoreServices;
