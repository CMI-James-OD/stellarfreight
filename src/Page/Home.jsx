// src/Page/Home.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Hero from "../components/Hero";
import AboutHome from "../components/AboutUs";
import ServicesComponent from "../components/ServicesComponent";
import WhyChooseUs from "../components/WhyChooseUs";
import MoreServices from "../components/More";
import FAQ from "../components/FAQComponent";
import TeamComponent from "../components/TeamComponent";
import Support from "../components/Support";
import Partners from "../components/Partners";
import ClientCarousel from "../components/ClientCarousel";
import Footer from "../components/Footer";
import ImageCarousel from "../components/ImageCarousel";
import useImageLoader from "../hooks/useImageLoader";
import { ColorRing } from "react-loader-spinner";
import { IoLogoWhatsapp } from "react-icons/io5";
import FAQComponent from "../components/FAQComponent";

const Home = () => {
  const heroImages = [
    "/images/ship.svg",
    "/images/search.svg",
    "/images/support.svg",
  ];

  const imagesLoaded = useImageLoader(heroImages);
  const location = useLocation();

  // Save scroll position when navigating away
  useEffect(() => {
    if (location.state && location.state.scrollPosition) {
      window.scrollTo(0, location.state.scrollPosition);
    }

    const handleSaveScrollPosition = () => {
      const scrollPosition = window.scrollY;
      if (window.history.state) {
        window.history.replaceState(
          { ...window.history.state, scrollPosition },
          ""
        );
      } else {
        window.history.replaceState({ scrollPosition }, "");
      }
    };

    window.addEventListener("beforeunload", handleSaveScrollPosition);
    return () => {
      window.removeEventListener("beforeunload", handleSaveScrollPosition);
    };
  }, [location]);

  return imagesLoaded ? (
    <div className="relative bg-[#f6f8fb]">
      <Header />
      <a
        href="https://wa.me/2348148001157"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-3 left-2 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg z-[1000]"
      >
        <IoLogoWhatsapp className="w-8 h-8" />
      </a>
      <section className="relative overflow-hidden">
        <Hero />
      </section>
      <section className="relative bg-white border-t border-slate-200/70">
        <AboutHome isTruncated={true} />
      </section>
      <section className="relative bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/70">
        <ServicesComponent showAll={false}/>
      </section>
      <section className="relative border-t border-slate-200/70">
        <WhyChooseUs />
      </section>
      <section className="relative bg-white border-t border-slate-200/70">
        <MoreServices />
      </section>
      <section className="relative bg-gradient-to-b from-white to-slate-50 border-t border-slate-200/70">
        <TeamComponent />
      </section>
      <section className="relative bg-white border-t border-slate-200/70">
        <FAQComponent/>
      </section>
      <section className="relative bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/70">
        <ClientCarousel />
      </section>
      <section className="relative bg-white border-t border-slate-200/70">
        <Support />
      </section>
      <section className="relative bg-gradient-to-b from-slate-50 to-white border-t border-slate-200/70">
        <Partners />
      </section>
      <Footer />
    </div>
  ) : (
    <div className="w-full h-screen flex items-center bg-grey-450 justify-center">
      <ColorRing
        visible={true}
        height="120"
        width="120"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e8772e", "#d47d38", "#be6c44", "#a65c50", "#814239"]}
      />
    </div>
  );
};

export default Home;
