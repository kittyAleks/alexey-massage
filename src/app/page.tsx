import { About } from "@/components/About";
import { Booking } from "@/components/Booking";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";
import { VideoPresentation } from "@/components/VideoPresentation";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <VideoPresentation />
        <Services />
        <Process />
        <Gallery />
        <Reviews />
        <Faq />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
