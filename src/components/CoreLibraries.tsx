import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FunctionSquare, BarChart3, Layout } from "lucide-react";

const CoreLibraries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const libraries = [
    {
      image: "https://www.sympy.org/static/images/logo.png",
      name: "SymPy",
      description: "Symbolic mathematics library untuk menyelesaikan persamaan diferensial secara simbolik.",
    },
    {
      image: "https://icon.icepanel.io/Technology/svg/Matplotlib.svg",
      name: "Matplotlib",
      description: "Powerful plotting library untuk visualisasi grafik solusi persamaan diferensial.",
    },
    {
      image: "https://icon.icepanel.io/Technology/svg/Python.svg",
      name: "Tkinter",
      description: "GUI framework bawaan Python untuk membuat interface desktop yang user-friendly.",
    },
  ];


  return (
    <section id="libraries" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ top: "20%", left: "5%", animationDelay: "3s" }}>
        ∫
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Core Libraries</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Technology stack yang powerful untuk komputasi matematika
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {libraries.map((library, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card glass-card-hover rounded-2xl p-8 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <img
                    src={library.image}
                    alt={library.name}
                    className="w-20 h-20 object-contain rounded-xl bg-muted/30 p-2"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4">{library.name}</h3>
                <p className="text-foreground/70 leading-relaxed">{library.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreLibraries;
