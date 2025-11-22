import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyPython from "@/components/WhyPython";
import CoreLibraries from "@/components/CoreLibraries";
import Material from "@/components/Material";
import Demo from "@/components/Demo";
import Architecture from "@/components/Architecture";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import ODECalculator from "@/components/ODECalculator";

const Index = () => {
  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />
      <Hero />
      <Team />
      <WhyPython />
      <CoreLibraries />
      <Material />
      <ODECalculator />
      <Demo />
      <Architecture />
      <Footer />
    </div>
  );
};

export default Index;
