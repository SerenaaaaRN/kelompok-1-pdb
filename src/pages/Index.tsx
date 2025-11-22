import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyPython from "@/components/WhyPython";
import CoreLibraries from "@/components/CoreLibraries";
import Material from "@/components/Material";
import Demo from "@/components/Demo";
import Architecture from "@/components/Architecture";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />
      <Hero />
      <WhyPython />
      <CoreLibraries />
      <Material />
      <Demo />
      <Architecture />
      <Team />
      <Footer />
    </div>
  );
};

export default Index;
