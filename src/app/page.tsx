import Navigation from "@/components/Navigation";
import LoadingScreen from "@/components/LoadingScreen";
import Hero from "@/components/sections/Hero";
import SelectedWork from "@/components/sections/SelectedWork";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <LoadingScreen />
      <Navigation />
      <main className="flex-1">
        <Hero />
        <SelectedWork />
        <Services />
        <About />
        <Process />
        <Contact />
      </main>
    </div>
  );
}
