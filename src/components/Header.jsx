"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import header_logo from "/images/header_logo.svg"

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const navItems = [
    { name: "About us", path: "/about" },
    { name: "Our Team", path: "/team" },
    { name: "Our Services", path: "/services" },
    { name: "FAQs", path: "/faqs" },
    { name: "Support", path: "/support" },
    { name: "Policy", path: "/policy" },
    { name: "Parcel", path: "/parcel" },
  ]

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-10 w-full bg-white lg:px-12 px-4 py-2 flex justify-between items-center shadow-md text-grey-450"
    >
      {/* Logo Section */}
      <Link to="/">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center">
          <img src={header_logo || "/placeholder.svg"} alt="Trustway Logistics Logo" className="w-28" />
        </motion.div>
      </Link>

      {/* Navigation Menu */}
      <div className="hidden lg:flex flex-1 justify-center">
        <ul className="flex space-x-6 font-semibold text-base">
          {navItems.map((item, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05, color: "#ff6600" }}
              className="underline-offset-2 hover:border-b-orange-450 hover:border-b-[1px] border-b-[1px] border-b-white transition-all ease-in duration-500"
            >
              <Link to={item.path}>{item.name}</Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Track Cargo Button */}
      <div className="flex gap-4 items-center">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link to="/user">
            <button className="border-orange-450 hover:text-white hover:bg-orange-450 transition-colors duration-500 ease-linear border-2 text-sm text-orange-450 rounded-lg px-4 py-1">
              Track Cargo
            </button>
          </Link>
        </motion.div>

        {/* Hamburger Menu Icon */}
        <div className="lg:hidden flex items-center">
          <motion.button whileTap={{ scale: 0.9 }} onClick={toggleMenu} className="btn btn-circle swap swap-rotate">
            <input type="checkbox" checked={menuOpen} readOnly />
            <svg
              className={`swap-${menuOpen ? "on" : "off"} fill-current`}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              {menuOpen ? (
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              ) : (
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              )}
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute top-16 right-0 bg-white w-full shadow-lg lg:hidden"
          >
            <ul className="flex flex-col items-center space-y-10 p-4 font-semibold text-lg">
              {navItems.map((item, index) => (
                <motion.li key={index} whileHover={{ scale: 1.05, color: "#ff6600" }} whileTap={{ scale: 0.95 }}>
                  <Link to={item.path}>{item.name}</Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default Header

