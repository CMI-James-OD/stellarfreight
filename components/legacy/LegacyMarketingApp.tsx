"use client";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import About from "@/src/Page/About";
import FAQs from "@/src/Page/FAQs";
import Home from "@/src/Page/Home";
import Parcel from "@/src/Page/Parcel";
import Policy from "@/src/Page/Policy";
import Services from "@/src/Page/Services";
import Support from "@/src/Page/Support";
import Team from "@/src/Page/Team";

export function LegacyMarketingApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/support" element={<Support />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/parcel" element={<Parcel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}