import Hero from "@/components/Hero/Hero";
import Image from "next/image";
import Promo from "@/components/Promo.js/promo";
import Services from "@/components/Services/Services";
import Testimonial from "@/components/Testimonials/testmonial";
export default function Home() {
  return (
    <>
    <Hero/>
    <Services/>
    <Promo/>
    <Testimonial/>
    </>
  );
}
