"use client";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import emblaCarousel from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import image1 from "../utils/birthdayhall.png";
import { FlipWords } from "./flip-words";
import Link from "next/link";

const Hero = () => {
  const emblaRef = useRef(null);
  const autoplay = useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  ).current;

  const words = ["Eats ", "Watch ", "Enjoy "];
  const words1 = ["Good ", "Great ", "Amazing "];
  const words2 = ["Feel ", "Experience ", "Embrace "];
  const words3 = ["Good ", "Wonderful ", "Incredible "];

  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    if (emblaRef.current) {
      const embla = emblaCarousel(emblaRef.current, { loop: true }, [autoplay]);
      return () => embla.destroy();
    }
  }, [autoplay]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2200); // Change duration as needed

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="w-full h-screen relative">
      <div className="embla w-full h-screen overflow-hidden absolute z-1" ref={emblaRef}>
        <div className="embla__container flex">
          <div className="embla__slide relative w-full h-screen flex-shrink-0">
            <Image
              alt="birthday hall"
              src={image1}
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="embla__slide relative w-full h-screen flex-shrink-0">
            <Image
              alt="another image"
              src="https://th.bing.com/th/id/OIP.JJ9Sal9zGh3EjpsWyENBcgHaEK?w=297&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="embla__slide relative w-full h-screen flex-shrink-0">
            <Image
              alt="placeholder image"
              src="https://www.historictheatrephotos.com/Resources/Theatre-Photos/Hollywood-Entertainment-District-Los-Angeles/Photos/Events/Auditorium_during_Open_House_event.jpg"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
      <div className="relative z-3 top-[calc(100vh-65%)] sm:top-[calc(100vh-30%)] md:top-[calc(100vh-65%)] lg:top-[calc(100vh-60%)]" style={{justifyContent:'center',display:'flex'}}>
        <div className="flex flex-col items-center px-4 gap-8 mx-[1rem] md:mx-[5rem] w-fit">
          <div className="text-neutral-600 dark:text-neutral-400 gap-1 text-center">
            <FlipWords words={words} />
            <FlipWords words={words1} />
            <FlipWords words={words2} />
            <FlipWords words={words3} />
            <br />
          </div>
          <div className="text-[#ff4e00fa] font-extrabold text-center">
            <span className="text-3xl md:text-7xl">Cafe Sparsha in House!</span>
          </div>
          <div className="flex flex-col items-center w-full md:flex-row sm:w-[80vw] justify-center">
            <Link className="w-auto m-2 border-[#ff4e00fa] p-2 text-lg sm:p-3 sm:text-xl md:p-4 md:text-2xl border-2 rounded-full text-white hover:bg-[#ff4e00fa]" href="/birthdayhallbooking">Birthday Hall Booking</Link>
            <Link className="w-auto m-2 border-[#ff4e00fa] p-2 text-lg sm:p-3 sm:text-xl md:p-4 md:text-2xl border-2 rounded-full text-white hover:bg-[#ff4e00fa]" href="/resturent">Restaurant Seat Booking</Link>
            <Link className="w-auto m-2 border-[#ff4e00fa] p-2 text-lg sm:p-3 sm:text-xl md:p-4 md:text-2xl border-2 rounded-full text-white hover:bg-[#ff4e00fa]" href="/theater-booking">Private Theater Booking</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
