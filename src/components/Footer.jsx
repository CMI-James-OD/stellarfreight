import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { TailSpin } from "react-loader-spinner";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

const headerLogo = "/images/header_logo.svg";

const Footer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [trackingCode, setTrackingCode] = useState("");
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const handleTrackClick = () => {
    setIsLoading(true);
    if (trackingCode.trim()) {
      navigate(`/track/${trackingCode}`);
    }
    setIsLoading(false);
  };

  const companyLinks = [
    { name: "About us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Terms of Services", path: "/policy" },
    { name: "Contact Us", path: "/support" },
  ];

  const moreLinks = [
    { name: "Track & Trace", path: "/track" },
    { name: "Request For A Shipment", path: "/" },
    { name: "Frequently Asked Questions", path: "/faqs" },
    { name: "Corporate Responsibility", path: "/policy" },
  ];

  return (
    <footer className="relative w-full overflow-hidden border-t border-slate-800 bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_38%)]" />
      <div className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <img src={headerLogo} alt="Trustway Logistics Logo" className="h-10 w-auto" />
            </Link>
            <address className="flex flex-col gap-2 text-sm not-italic text-slate-300">
              <p>347-349 Goswell Rd, The Angel, EC1V 7JN, UK</p>
              <p><strong>Phone:</strong> +62895342604103, +1(305)518-5146</p>
              <p><strong>Email:</strong> <a href="mailto:trustwaylogisticservices@gmail.com" className="text-orange-400 hover:text-orange-300">trustwaylogisticservices@gmail.com</a></p>
              <p><strong>Website:</strong> <a href="http://trustway-logistics1.vercel.app/" className="text-orange-400 hover:text-orange-300">www.trustwaylogistics.com</a></p>
            </address>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">OUR COMPANY</h3>
            <ul className="mt-4 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-slate-300 transition-colors hover:text-white">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-white">MORE FROM TRUSTWAY LOGISTICS</h3>
            <ul className="mt-4 space-y-2">
              {moreLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm text-slate-300 transition-colors hover:text-white">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white">Track & Trace</h3>
            <p className="text-sm text-slate-300">Enter your tracking ID to get live shipment updates.</p>
            <div className="flex flex-col gap-2">
              <Input
                type="text"
                placeholder="Tracking ID"
                value={trackingCode}
                onChange={(e) => setTrackingCode(e.target.value)}
                className="border-slate-700 bg-slate-900 text-white placeholder:text-slate-400"
              />
              <Button onClick={handleTrackClick} className="bg-orange-500 hover:bg-orange-600 text-white">
                {isLoading ? (
                  <TailSpin visible={true} height="20" width="20" color="#ffffff" ariaLabel="tail-spin-loading" />
                ) : (
                  "Track & Trace"
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-800 pt-6">
          <p className="text-sm leading-7 text-slate-400">
            Trustway Logistics is committed to safeguarding the privacy of our website users. When you visit our web pages, our servers temporarily store connection data for security purposes, including the computer's connection details, a list of the pages visited on our site, the date and duration of your visit, and identification data such as browser type and operating system. We also capture information about the website that referred you to ours. We do not collect additional personal information such as your name, address, telephone number, or email address unless provided voluntarily, for instance, when completing an online form, registering, participating in a survey or competition, fulfilling a contract, or requesting information. Any personal data you provide is used solely for the technical administration of our web pages and to fulfill your requests and preferences, primarily in connection with contracts or responding to your inquiries. This information helps us enhance the services we provide, tailor our website's content and services to better suit your needs, and improve overall usability.
          </p>

          <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-slate-400">© 2009 - {currentYear} Trustway Logistics. All Rights Reserved</div>
            <div className="flex items-center gap-2">
              <a href="#" aria-label="Facebook" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-transform hover:scale-105 hover:bg-[#1877F2]"><FaFacebookF className="text-slate-300 group-hover:text-white" /></a>
              <a href="#" aria-label="Instagram" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-transform hover:scale-105 hover:bg-[#E4405F]"><FaInstagram className="text-slate-300 group-hover:text-white" /></a>
              <a href="#" aria-label="X" className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-800 transition-transform hover:scale-105 hover:bg-black"><FaXTwitter className="text-slate-300 group-hover:text-white" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;