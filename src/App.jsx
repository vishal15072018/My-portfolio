import Navbar from "./Components/Navbar";

import Home from "./Sections/Home";
import About from "./Sections/About";
import Skills from "./Sections/Skills";
import Projects from "./Sections/Projects";
import Contact from "./Sections/Contact";
import Footer from "./Sections/Footer";
import CustomCurser from "./Components/CustomCurser";
import React from "react";
import IntroAnimation from "./Components/IntroAnimation";
import { tr } from "framer-motion/client";
import StarParticlesBackground from "./Components/StarParticlesBackground";

function App() {
  const[introDone, setIntroDone] = React.useState(false);
  return (
    <>
{!introDone && <IntroAnimation onFinish={() => setIntroDone(true)} />}
  {introDone && (
    <div className="relative gradient text-white">


      <CustomCurser />
      <StarParticlesBackground />
      <Navbar />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
    )}
    </>
  );
}

export default App;
