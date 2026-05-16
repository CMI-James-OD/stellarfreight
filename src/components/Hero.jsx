// src/components/Hero.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { TailSpin } from "react-loader-spinner";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
const ship_logo = "/images/ship.svg";
const search_logo = "/images/search.svg";
const support_logo = "/images/support.svg";

const transitionSettings = {
  duration: 0.8,
  ease: [0.6, -0.05, 0.01, 0.99],
};

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const navigate = useNavigate();

  const handleTrackClick = () => {
    setIsLoading(true);
    if (trackingCode.trim()) {
      navigate(`/track/${trackingCode}`);
    }
    setIsLoading(false);
  };

  return (
    <div className="relative isolate mt-[7rem] flex min-h-[90vh] w-full items-center justify-center overflow-hidden lg:mt-[10rem]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')", filter: "brightness(42%)" }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,12,20,0.35)_0%,rgba(6,12,20,0.72)_85%),radial-gradient(circle_at_10%_20%,rgba(232,119,46,0.28),transparent_42%)]" />
      <div className="text-white text-center w-[90%] lg:w-[55%] flex flex-col justify-center items-center gap-6">
        <motion.h1
          className="text-[30px] lg:text-[35px] font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.1 }}
        >
          ACHIEVE MORE
        </motion.h1>
        <motion.p
          className="text-[14px] lg:text-[16px] font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.2 }}
        >
          LOGISTICS | CARGO | WAREHOUSING
        </motion.p>
        <motion.div
          className="grid w-full grid-cols-3 gap-3 text-center text-black text-[1rem] text-opacity-60 font-semibold border-zinc-500"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.4 }}
        >
          <Card className="flex-1 bg-white py-6 flex flex-col gap-2 justify-center items-center">
            <img src={ship_logo} className="w-8 lg:w-10" alt="Ship" /> Ship
          </Card>
          <Card className="bg-[#0b181e] border-[#0b181e] text-white gap-1 flex-1 py-6 flex flex-col justify-center items-center">
            <img src={search_logo} className="w-10 lg:w-14" alt="Track" /> Track
          </Card>
          <Card className="flex-1 bg-white py-6 flex flex-col gap-1 justify-center items-center">
            <img src={support_logo} className="w-8 lg:w-10" alt="Support" />{" "}
            Support
          </Card>
        </motion.div>
        <motion.div
          className="flex items-center w-full justify-center gap-2"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...transitionSettings, delay: 0.7 }}
        >
          <Input
            type="text"
            placeholder="Tracking ID"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            className="w-full h-12 border-gray-300 bg-white text-black"
          />
          <Button
            onClick={handleTrackClick}
            className="h-12 bg-[#e8772e] flex items-center justify-center text-white px-6 lg:px-[2rem] hover:bg-[#e8772e]"
          >
            {isLoading ? (
              <TailSpin
                visible={true}
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
              "Search"
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
