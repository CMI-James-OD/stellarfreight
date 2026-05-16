import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { services } from "../data/home";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const ServicesComponent = ({ showAll = false }) => {
  return (
    <div className="px-4 py-20 sm:px-8 lg:px-24 bg-gradient-to-b from-slate-50 to-white text-grey-450 text-opacity-90">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-grey-450 text-opacity-90">
          Our Services
        </h1>
      </motion.div>
      <motion.p
        className="py-6 text-center text-base md:text-base text-gray-600"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        While the first impression may be lasting, for online shoppers each
        phase of the customer journey is important. This includes the transport
        journey and receipt. Trustway Logistics Parcel is an add-on for your
        business that we operate with the utmost commitment. We also integrate
        Stellar-focused payment experiences to improve payment clarity from
        invoice intent to shipment progression.
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.slice(0, showAll ? services.length : 3).map((service, index) => (
          <motion.div
            key={service.id}
            className="flex"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 + index * 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-lg flex flex-col justify-between gap-3 bg-white rounded-xl overflow-hidden w-full border-slate-200">
              <img src={service.image} alt={service.alt} className="object-cover h-52 w-full" />
              <div className="flex flex-col justify-between w-full flex-1">
                <div className="px-6 py-4 flex flex-col gap-4">
                  <h1 className="text-lg font-semibold text-gray-800">{service.title}</h1>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <div className="px-6 py-4">
                  <Link to="/services">
                    <Button className="bg-[#e8772e] text-sm hover:bg-[#e8813d] text-white px-4 py-2 rounded-md">
                      Read more
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServicesComponent;
