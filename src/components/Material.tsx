import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen } from "lucide-react";

const Material = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="material" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ bottom: "10%", right: "10%", animationDelay: "5s" }}>
        ∂
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Learning Material</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Memahami Persamaan Diferensial Linear
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">Persamaan Diferensial Linear</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Persamaan diferensial linear adalah persamaan yang melibatkan fungsi dan turunannya
                dengan koefisien yang merupakan fungsi dari variabel bebas atau konstanta.
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-2xl p-8 mb-6">
            <h4 className="text-xl font-semibold mb-4 text-accent">Bentuk Umum:</h4>
            <div className="text-center py-8 overflow-x-auto">
              <div className="text-2xl md:text-3xl font-mono text-foreground">
                a<sub>n</sub>(x)y<sup>(n)</sup> + a<sub>n-1</sub>(x)y<sup>(n-1)</sup> + ... + a<sub>1</sub>(x)y' + a<sub>0</sub>(x)y = g(x)
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-primary">Homogen</h4>
              <p className="text-sm text-foreground/70">
                Ketika g(x) = 0, persamaan disebut homogen
              </p>
              <div className="mt-4 text-center text-xl font-mono text-foreground/80">
                y'' + py' + qy = 0
              </div>
            </div>
            <div className="glass-card rounded-xl p-6">
              <h4 className="text-lg font-semibold mb-3 text-secondary">Non-Homogen</h4>
              <p className="text-sm text-foreground/70">
                Ketika g(x) ≠ 0, persamaan disebut non-homogen
              </p>
              <div className="mt-4 text-center text-xl font-mono text-foreground/80">
                y'' + py' + qy = g(x)
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Material;
