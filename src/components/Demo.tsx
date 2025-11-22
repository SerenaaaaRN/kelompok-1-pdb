import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Play, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const Demo = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    "Input persamaan diferensial dengan syntax natural",
    "Solusi simbolik otomatis menggunakan SymPy",
    "Visualisasi grafik interaktif real-time",
    "Export hasil ke berbagai format",
    "Step-by-step solution breakdown",
  ];

  return (
    <section id="demo" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ top: "15%", left: "8%", animationDelay: "7s" }}>
        Σ
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">App Demo</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Lihat Kalkulus Solver dalam aksi
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="glass-card glass-card-hover rounded-3xl p-4 aspect-video flex items-center justify-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
            <Button
              size="lg"
              className="relative z-10 w-20 h-20 rounded-full neon-glow bg-primary hover:bg-primary/90"
            >
              <Play className="w-10 h-10 ml-1" />
            </Button>
            <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-foreground/5">
              DEMO
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold mb-6">Key Features</h3>
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4 glass-card rounded-xl p-4 hover:scale-105 transition-transform duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <p className="text-foreground/80 leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
