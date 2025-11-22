import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CoreLibraries from "@/components/CoreLibraries";
import Material from "@/components/Material";
import Demo from "@/components/Demo";
import Architecture from "@/components/Architecture";
import Team from "@/components/Team";
import Footer from "@/components/Footer";
import ODECalculator from "@/components/ODECalculator";
import WhyReact from "@/components/WhyReact";

const Index = () => {
  return (
    <div className="gradient-bg min-h-screen">
      <Navbar />
      <Hero />
      <Team />
      <WhyReact />
      <CoreLibraries />
      <Material />
      <Demo/>
      <ODECalculator />
      <Architecture/>
      <Footer />
    </div>
  );
};

export default Index;
