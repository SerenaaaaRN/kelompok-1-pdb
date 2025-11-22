import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FunctionSquare, BarChart3, Layout } from "lucide-react";

const CoreLibraries = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const libraries = [
    {
      icon: FunctionSquare,
      name: "SymPy",
      description: "Symbolic mathematics library untuk menyelesaikan persamaan diferensial secara simbolik.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart3,
      name: "Matplotlib",
      description: "Powerful plotting library untuk visualisasi grafik solusi persamaan diferensial.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Layout,
      name: "Tkinter",
      description: "GUI framework bawaan Python untuk membuat interface desktop yang user-friendly.",
      color: "from-orange-500 to-red-500",
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
            Technology stack yang powerful untuk mathematical computing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {libraries.map((library, index) => {
            const Icon = library.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card glass-card-hover rounded-2xl p-8 text-center"
              >
                <div className="mb-6 flex justify-center">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${library.color} flex items-center justify-center transform rotate-6 hover:rotate-0 transition-transform duration-300`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
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
