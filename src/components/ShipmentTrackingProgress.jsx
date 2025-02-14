"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, MoveRight } from "lucide-react";

const ShipmentProgressTracker = ({ cargo }) => {
  const [currentPosition, setCurrentPosition] = useState("start");

  useEffect(() => {
    switch (cargo.status) {
      case "Processed":
        setCurrentPosition("start");
        break;
      case "Shipped":
      case "En Route":
        setCurrentPosition("middle");
        break;
      case "Arrived":
        setCurrentPosition("end");
        break;
      default:
        setCurrentPosition("start");
    }
  }, [cargo.status]);

  const getProgress = (pos) => {
    switch (pos) {
      case "start":
        return 0;
      case "middle":
        return 50;
      case "end":
        return 100;
      default:
        return 0;
    }
  };

  const renderCountryLabel = (label) => {
    return label.split(" ").map((word, index) => (
      <span key={index} className="block ">
        {word}
      </span>
    ));
  };
  const renderCountryLabel2 = (label) => {
    const word = label.split(" ")[0]; // Take only the first word
    return <span className="block">{word}</span>;
  };
  
  const getStatusLabel = (status) => {
    const statusMap = {
      Processed: "In Progress",
      Shipped: "Dispatched",
      "En Route": "On Hold",
      Arrived: "Delivered",
    };
    return statusMap[status] || "Unknown"; // Fallback in case of an unexpected status
  };

  return (
    // Main container
    <div className="relative w-full max-w-3xl mx-auto px-4 flex pt-12 flex-col gap-y-4">
      <div className="relative">
        {/* Progress Bar Background - Increased height */}
        <div className="absolute h-2 w-full bg-gray-200 rounded-full" />

        {/* Active Progress Bar - Increased height and changed color */}
        <motion.div
          className="absolute h-2 bg-orange-500  rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${getProgress(currentPosition)}%` }}
          transition={{ duration: 0.5 }}
        />

        {/* Active Circle Marker - Increased size and changed color */}
        <motion.div
          className="absolute -top-[36px] flex justify-center items-center flex-col gap-y-2 -translate-y-1/2 -translate-x-[23px]" // Updated className
          initial={{ left: "0%" }}
          animate={{ left: `${getProgress(currentPosition)}%` }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col ">
            <div className="p-2 text-[8px] text-orange-900 text-center rounded-xl bg-orange-300">
              Location:
              {renderCountryLabel2(
                currentPosition === "start"
                  ? cargo?.countryFrom?.label || "Start"
                  : currentPosition === "middle"
                  ? cargo?.countryCurrent?.label || "Middle"
                  : cargo?.countryTo?.label || "End"
              )}
            </div>
            <MapPin className="w-auto h-8 rounded-full text-orange-500 " />
          </div>

          <div className="relative">
            {" "}
            <div className="w-6 h-6 rounded-full bg-orange-500" />
            {/* Pulsing effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-orange-500/50"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 0, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>

        {/* Labels - Adjusted positioning for larger progress bar */}
      </div>
      <div className="mt-2 text-center">
        <span className="bg-orange-300  text-[8px] px-2 py-1 rounded-full">
          {getStatusLabel(cargo.status)}
        </span>
      </div>
      <div className="w-full flex justify-center ">
        <div className=" grid grid-cols-5 grid-rows-1 gap-x-1 text-[9px]">
          {/* Start label */}
          <span
            className={`text-center   ${
              currentPosition === "start" ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {renderCountryLabel(cargo?.countryFrom?.label || "Start")}
          </span>
          <MoveRight className="text-gray-500" />
          <span
            className={` text-center  ${
              currentPosition === "middle" ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {renderCountryLabel(cargo?.countryCurrent?.label || "Middle")}
          </span>
          <MoveRight className="text-gray-500" />
          <span
            className={`text-center  ${
              currentPosition === "end" ? "text-orange-500" : "text-gray-400"
            }`}
          >
            {renderCountryLabel(cargo?.countryTo?.label || "End")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShipmentProgressTracker;
