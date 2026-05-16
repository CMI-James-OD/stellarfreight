"use client";

import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Package, X } from "lucide-react";
import { Button } from "../../components/ui/button";

const headerLogo = "/images/header_logo.svg";

const navItems = [
  { name: "About us", path: "/about" },
  { name: "Our Team", path: "/team" },
  { name: "Our Services", path: "/services" },
  { name: "FAQs", path: "/faqs" },
  { name: "Support", path: "/support" },
  { name: "Policy", path: "/policy" },
  { name: "Parcel", path: "/parcel" },
];

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const scrollStopTimeoutRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 10);

      if (currentY < 72) {
        setShowHeader(true);
      } else if (currentY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }

      setLastScrollY(currentY);

      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }

      scrollStopTimeoutRef.current = setTimeout(() => {
        setShowHeader(true);
      }, 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollStopTimeoutRef.current) {
        clearTimeout(scrollStopTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full border-b border-slate-200/70 bg-white/85 backdrop-blur-md transition-all duration-500 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        } ${isScrolled ? "shadow-lg" : "shadow-sm"}`}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-6">
          <Link to="/" className="group flex items-center">
            <img
              src={headerLogo}
              alt="Trustway Logistics Logo"
              className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <nav className="hidden h-full items-center gap-4 lg:flex">
            {navItems.map((item) => (
              <div key={item.path} className="relative flex h-full items-center">
                <Link
                  to={item.path}
                  className={`relative px-2 text-sm font-semibold transition-colors duration-300 ${
                    isActive(item.path)
                      ? "text-orange-500"
                      : "text-slate-700 hover:text-orange-500"
                  }`}
                >
                  <span className="inline-flex items-center gap-1">
                    {item.name}
                    <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </span>
                  <span
                    className={`absolute -bottom-[21px] left-0 h-0.5 w-full origin-left bg-orange-500 transition-transform duration-300 ${
                      isActive(item.path) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/track">
              <Button className="border border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-white">
                Track Cargo
              </Button>
            </Link>
            <Link to="/admin">
              <Button className="bg-slate-900 hover:bg-slate-800">
                <Package className="mr-2 h-4 w-4" />
                Admin
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 lg:hidden"
            aria-label="Open mobile menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/45 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 220 }}
              className="absolute right-0 top-0 h-full w-80 border-l border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-orange-50 to-orange-100 p-5">
                  <img src={headerLogo} alt="Trustway Logistics Logo" className="h-9 w-auto" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="rounded-full p-2 text-slate-600 transition hover:bg-white"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto p-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium transition-all duration-300 ${
                          isActive(item.path)
                            ? "border-orange-300 bg-orange-50 text-orange-600"
                            : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        {item.name}
                        <ChevronDown className="h-4 w-4 opacity-60" />
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                <div className="space-y-3 border-t border-slate-200 bg-gradient-to-r from-orange-50 to-orange-100 p-5">
                  <Link to="/track" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button className="w-full border border-orange-500 bg-white text-orange-500 hover:bg-orange-500 hover:text-white">Track Cargo</Button>
                  </Link>
                  <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="block">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800">
                      <Package className="mr-2 h-4 w-4" />
                      Admin
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;