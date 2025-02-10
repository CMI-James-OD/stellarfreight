import React from "react";
import { motion } from "framer-motion";
import { teamMembers } from "../data/home";

const TeamComponent = () => {
  return (
    <div className="w-full lg:px-24 px-4 py-20">
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        viewport={{ once: true }}
      >
        Our Team
      </motion.h2>
      <motion.p
        className="mb-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        Meet some of the individuals who have helped us reach this milestone.
        Thank you.
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-lg shadow-md"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: 0.4 + index * 0.2,
            }}
            viewport={{ once: true }}
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-64 object-cover rounded-t-lg"
            />
            <div className="mt-4 text-center p-2">
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-gray-500 text-sm">{member.position}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeamComponent;
