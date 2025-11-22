import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Solve Differential Equations",
    "Visualize Mathematical Solutions",
    "Learn Calculus Interactively",
  ];

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (typedText.length < currentPhrase.length) {
            setTypedText(currentPhrase.slice(0, typedText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (typedText.length > 0) {
            setTypedText(currentPhrase.slice(0, typedText.length - 1));
          } else {
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % phrases.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, currentIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Math watermarks */}
      <div className="math-symbol" style={{ top: "10%", left: "10%", animationDelay: "0s" }}>
        ∫
      </div>
      <div className="math-symbol" style={{ top: "20%", right: "15%", animationDelay: "2s" }}>
        ∂
      </div>
      <div className="math-symbol" style={{ bottom: "15%", left: "20%", animationDelay: "4s" }}>
        Σ
      </div>
      <div className="math-symbol" style={{ top: "60%", right: "10%", animationDelay: "6s" }}>
        ∇
      </div>
      <div className="math-symbol" style={{ bottom: "25%", right: "25%", animationDelay: "8s" }}>
        ∞
      </div>
      <div className="math-symbol" style={{ top: "40%", left: "15%", animationDelay: "10s" }}>
        π
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="floating"
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="text-gradient">Kelompok Kalkulus 1</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mb-8"
          >
            <div className="text-2xl md:text-4xl font-semibold h-16 md:h-20 flex items-center justify-center">
              <span className="text-foreground/90">{typedText}</span>
              <span className="inline-block w-1 h-8 md:h-10 bg-primary ml-1 animate-pulse"></span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Aplikasi berbasis Python untuk menyelesaikan persamaan diferensial linear ordo 1
            dengan visualisasi interaktif menggunakan library python s SymPy, Matplotlib, dan Tkinter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5, type: "spring", bounce: 0.5 }}
          >
            <Button
              size="lg"
              className="neon-glow text-lg px-8 py-6 rounded-xl font-semibold bg-primary hover:bg-primary/90 group"
            >
              Explore the Project
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
