import { useEffect, useMemo, useRef, useState } from "react";
import img1 from "../assets/img1.png";
import img2 from "../assets/img2.png";
import img4 from "../assets/img4.jpeg";
import photo2 from "../assets/photo2.png";
import photo4 from "../assets/photo4.jpeg";
import photo5 from "../assets/photo5.png";
import img5 from "../assets/img5.png";



import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

/* ---------- Mobile Hook ---------- */
const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.matchMedia(query).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    const handler = (e) => setIsMobile(e.matches);

    mql.addEventListener("change", handler);
    setIsMobile(mql.matches);

    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

/* ---------- Projects Component ---------- */
export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef(null);

  const projects = useMemo(
    () => [
       {
      title: "AlphaChat",
        bgColor: "#0B1C2D",
        image: isMobile ? photo5 : img5,
        link: "https://alpha-chat-beta.vercel.app/",

      },
      {
        title: "OTT PLATFORM",
        bgColor: "#050B1E",
        image: img1,
      },
      {
        title: "Phishing URL Detection",
        bgColor: "#0B1C2D",
        image: isMobile ? photo2 : img2,
      },
      {
        title: "Weather Prediction Application",
        bgColor: "#4e817f",
        image: isMobile ? photo4 : img4,
        link: "https://weather-app-biy0.onrender.com/",
      },
    ],
    [isMobile]
  );

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="relative text-white"
      style={{
        height: `${projects.length * 50}vh`,
        backgroundColor: activeProject.bgColor,
        transition: "background-color 400ms ease",
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2
          className={`text-3xl font-semibold z-10 ${
            isMobile ? "mt-4" : "mt-8"
          }`}
        >
          Projects
        </h2>

        <div className="relative w-full flex-1 flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute left-1/2 top-4/9 
              -translate-x-1/2 -translate-y-1/2 
              transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
              style={{ width: "60%", maxWidth: "700px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5 }}
                    className="text-center text-xl sm:text-4xl md:text-5xl font-semibold mb-5"
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div className="relative w-full h-[65vh] sm:h-[62vh] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
              </div>
            </div>
          ))}

          {/* View Project button ONLY for Weather Prediction */}
          {activeProject.link && (
            <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition"
              >
                View Project
              </a>
            </div>
          )}

           {/* View Project button for AlphaChat */}
          {activeProject.link && (
            <div className={`absolute ${isMobile ? "bottom-20" : "bottom-10"}`}>
              <a
                href={activeProject.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 font-semibold rounded-lg bg-white text-black hover:bg-gray-200 transition"
              >
                View Project
              </a>
            </div>
          )}


        </div>
      </div>
    </section>
  );
}
