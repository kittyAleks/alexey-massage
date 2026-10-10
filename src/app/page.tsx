import { About } from "@/components/About";
import { BookingProvider } from "@/components/BookingDialog";
import { Contacts } from "@/components/Contacts";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileCta } from "@/components/MobileCta";
import { Reviews } from "@/components/Reviews";
import { Services } from "@/components/Services";

export default function Home() {
  return (
    <BookingProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <Gallery />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
      <MobileCta />
    </BookingProvider>
  );
}
