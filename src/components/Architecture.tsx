import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FileCode, Layers, Settings, Palette, Terminal } from "lucide-react";

const Architecture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const files = [
    {
      icon: FileCode,
      name: "main.py",
      description: "Entry point aplikasi dan orchestration logic",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Layers,
      name: "solver.py",
      description: "Core engine untuk solving differential equations",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Palette,
      name: "visualizer.py",
      description: "Module untuk plotting dan visualization dengan Matplotlib",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: Settings,
      name: "gui.py",
      description: "Tkinter GUI components dan event handlers",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: Terminal,
      name: "utils.py",
      description: "Helper functions dan utility methods",
      color: "from-cyan-500 to-cyan-600",
    },
  ];

  return (
    <section id="architecture" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ top: "25%", right: "8%", animationDelay: "9s" }}>
        ∇
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Project Architecture</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Clean dan modular file structure
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {files.map((file, index) => {
            const Icon = file.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  bounce: 0.3
                }}
                className="glass-card glass-card-hover rounded-2xl p-6"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${file.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-mono">{file.name}</h3>
                <p className="text-sm text-foreground/70 leading-relaxed">{file.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 glass-card rounded-2xl p-8 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-4 text-center">Design Pattern</h3>
          <p className="text-foreground/70 text-center leading-relaxed">
            Menggunakan <span className="text-primary font-semibold">MVC (Model-View-Controller)</span> pattern
            untuk separation of concerns yang jelas antara logic, presentation, dan data flow.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Architecture;
