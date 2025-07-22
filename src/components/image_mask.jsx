import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import "../css_files/m_img.css";

const MaskedImage = () => {
  const imageControls = useAnimation();
  const titleControls = useAnimation();
  const navbarControls = useAnimation();
  const searchBarControls = useAnimation();

  useEffect(() => {
    // Start the image animation first
    imageControls.start("visible").then(() => {
      // Start the navbar, title, and search bar animations after the image animation completes
      navbarControls.start("visible");
      titleControls.start("visible");
      searchBarControls.start("visible");
    });
  }, [imageControls, titleControls, navbarControls, searchBarControls]);

  const maskVariants = {
    hidden: { clipPath: "inset(50% 50% 50% 50%)" },
    visible: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const navbarVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut" },
    },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: "easeOut", delay: 0.5 },
    },
  };

  return (
    <div className="animation-container">
      {/* Navbar */}
      <motion.nav
        className="navbar"
        initial="hidden"
        animate={navbarControls}
        variants={navbarVariants}
      >
        <ul className="navbar-links">
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </motion.nav>

      {/* Image Animation */}
      <motion.div
        className="image-mask"
        initial="hidden"
        animate={imageControls}
        variants={maskVariants}
      >
        <img
          src="https://plus.unsplash.com/premium_photo-1667121492625-c5355b5fbdbd?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Masked Animation"
          className="masked-image"
        />
      </motion.div>

      {/* Search Bar */}
      <motion.div
        className="search_bar"
        initial="hidden"
        animate={searchBarControls}
        variants={searchBarVariants}
      >
        <div className="dest in"></div>
        <div className="date in"></div>
        <div className="NOP in"></div>
        <div className="book in">
          <button className="join">Begin Journey</button>
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="title"
        initial="hidden"
        animate={titleControls}
        variants={titleVariants}
      >
        HIDEOUT
      </motion.h1>
    </div>
  );
};

export default MaskedImage;
