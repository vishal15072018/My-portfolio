import { useEffect, useMemo } from "react";
import StarParticlesBackground from "../Components/StarParticlesBackground";
import { motion } from "framer-motion";
import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import avator from "../assets/avator.png";

export default function Home() {
  const roles = useMemo(
    () => ["MERN Stack Developer", "Software Developer", ""],
    []
  );

  const [index, setIndex] = React.useState(0);
  const [subIndex, setSubIndex] = React.useState(0);
  const [deleting, setDeleting] = React.useState(false);

  useEffect(() => {
    const current = roles[index];

    const timeout = setTimeout(() => {
      if (!deleting && subIndex < current.length) {
        setSubIndex((v) => v + 1);
      } else if (!deleting && subIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && subIndex > 0) {
        setSubIndex((v) => v - 1);
      } else if (deleting && subIndex === 0) {
        setDeleting(false);
        setIndex((p) => (p + 1) % roles.length);
      }
    }, deleting ? 40 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <section
      id="home"
      className="w-full h-screen relative bg-black overflow-hidden"
    >
      <StarParticlesBackground />

      {/* Background glows */}
      <div className="absolute inset-0">
        <div
          className="
            absolute -top-32 -left-32
            w-[65vw] sm:w-[50vw] md:w-[45vw]
            h-[65vw] sm:h-[50vw] md:h-[45vw]
            max-w-[450px] max-h-[450px]
            rounded-full
            bg-gradient-to-r from-[#302b63] via-[#00b8f8] to-[#1cd8d2]
            opacity-25 sm:opacity-20 md:opacity-15
            blur-[90px] sm:blur-[120px] md:blur-[140px]
            animate-pulse
          "
        />

        <div
          className="
            absolute bottom-0 right-0
            w-[65vw] sm:w-[50vw] md:w-[45vw]
            h-[65vw] sm:h-[50vw] md:h-[45vw]
            max-w-[450px] max-h-[450px]
            rounded-full
            bg-gradient-to-r from-[#302b63] via-[#00b8f8] to-[#1cd8d2]
            opacity-25 sm:opacity-20 md:opacity-15
            blur-[90px] sm:blur-[120px] md:blur-[140px]
            animate-pulse delay-500
          "
        />
      </div>

      <div className="relative z-10 h-full w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        {/* Left content */}
        <div className="relative flex flex-col justify-center h-full lg:text-left text-center">
          <div className="w-full lg:pr-24 mx-auto max-w-[48rem]">

            {/* Typing roles */}
            <motion.div
              className="mb-3 text-xl sm:text-2xl md:text-3xl font-semibold text-white tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-[1px] ml-1 bg-white animate-pulse align-middle"
                style={{ height: "1em" }}
              />
            </motion.div>

            {/* Main heading */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text
                bg-gradient-to-r from-[#1cd8d2] via-[#00bf8f] to-[#302b63] drop-shadow-lg"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              Hello, I'm
              <br />
              <span className="text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl lg:whitespace-nowrap">
                Vishal Kumar
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="mt-5 text-base sm:text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I turn complex ideas into seamless, high-impact web experiences - building modern, scalable, and lightning-fast applications that make a difference.
            </motion.p>

            {/* Buttons */}
            <motion.div
              className="mt-9 flex flex-wrap items-center justify-center lg:justify-start gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <a
                href="#projects"
                className="px-6 py-3 rounded-full font-medium text-lg text-white
                  bg-gradient-to-r from-[#1cd8d2] via-[#00b8f8] to-[#302b63]
                  shadow-lg hover:scale-105 transition-all"
              >
                View My Work
              </a>

              <a
  href="/Resume.pdf"       // exact case of the file in public folder
  download                // lowercase
  target="_blank"         // optional, opens in new tab
  rel="noopener noreferrer"
  className="px-6 py-3 rounded-full font-medium text-lg text-black
             bg-white hover:bg-gray-200 shadow-lg hover:scale-105 transition-all"
>
  My Resume
</a>
            </motion.div>

            {/* Social icons */}
            <motion.div
              className="mt-7 flex gap-5 justify-center lg:justify-start text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/vi-vishal2510/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-[#00b8f8] transition-all"
              >
                <FaLinkedinIn />
              </motion.a>

              <motion.a
                href="https://github.com/vishal15072018"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl md:text-3xl hover:text-[#1cd8d2] transition"
              >
                <FaGithub />
              </motion.a>
            </motion.div>

          </div>
        </div>

        {/* Right content: Avatar */}
        <div className="relative hidden lg:block">
          <div
            className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              right: "10px",
              width: "min(22vw, 380px)",
              height: "min(36vw, 550px)",
              borderRadius: "50%",
              filter: "blur(36px)",
              opacity: 0.32,
              background:
                "conic-gradient(from 0deg, #1cd8d2, #00bf8f, #302b63, #1cd8d2)",
            }}
          />

          <motion.img
            src={avator}
            alt="Vishal Kumar"
            className="absolute top-1/2 -translate-y-1/2 object-contain select-none pointer-events-none"
            style={{
              right: "-30px",
              width: "min(40vw, 680px)",
              maxHeight: "80vh",
            }}
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
}
