import { useEffect, useRef } from "react";

export default function StarParticlesBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    //getContext is used to draw the stars and particles
    const ctx = canvas.getContext("2d");

    let stars = [];
    const starCount = 80;


// defining particles inside a class , from where they originate, what wiil be radius, color, speed and shape and many more 
    class Star {
      constructor() {
        this.reset();
      }

      reset() {
        //Particles can be originated from hz(x-axis) and ver(y-axis)
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        //defining size of the particles ranging from 2 pixel - 5 pixel
        this.size = Math.random() * 3 + 2;
        this.opacity = Math.random() * 0.8 + 0.2;
        //speed of particles at hz-axis and val-axis
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        //particle's twinkling speed
        this.twinkleSpeed = Math.random() * 0.03 + 0.01;
      }



      drawStar(x, y, r, points = 5) {
        const step = Math.PI / points;

        ctx.beginPath();
        for (let i = 0; i < 2 * points; i++) {
          const radius = i % 2 === 0 ? r : r / 2;
          const angle = i * step;

          ctx.lineTo(
            x + Math.cos(angle) * radius,
            y + Math.sin(angle) * radius
          );
        }

        ctx.closePath();
        ctx.fillStyle = `rgba(255,255,255,${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255,255,255,0.9)";
        ctx.fill();
      }


      //TO move the particles
      update() {
        //movement of particles at x-axis and y-axis
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += Math.sin(Date.now() * this.twinkleSpeed) * 0.02;


        //creation of wrap around effect 
        //star left se bahar ja rha h aur right se andar aa rha h and viceversa for others
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        this.drawStar(this.x, this.y, this.size);
      }
    }


    //function to create particles on canvas
    function createStars() {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    }


    //If size of window changes , size of canvas should be resize
    function handleResize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      createStars();
    }
    handleResize();
    window.addEventListener("resize", handleResize);


    //To keep Animation in loop
    //Animation will be frame by frame
    let animationId;
    function animate() {
      //When we go to next frame, previous frame should be remove. by doing this particles will not leave trail.
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => s.update());
      animationId = requestAnimationFrame(animate);
    }
    animate();

    //A cleanup function when particlesBackground function removes, animation will also remove and eventlistner also.
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
    //to run single-time
  }, []);



  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}
