import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Zap } from "lucide-react";

const WhyReact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const reasons = [
    {
      icon: Code2,
      title: "Interactive UI",
      description:
        "React is ideal for interactive UI-based mathematical tools.",
    },
    {
      icon: Zap,
      title: "Live Math Rendering",
      description:
        "Works well with KaTeX for live math rendering.",
    },
    {
      icon: Code2,
      title: "Symbolic Math Libraries",
      description:
        "JS math libraries available for symbolic operations: mathjs, nerdamer, algebrite.",
    },
    {
      icon: Zap,
      title: "Lightweight & Educational",
      description:
        "Great for educational calculus tools and lightweight compared to Python backend.",
    },
  ];

  return (
    <section id="why" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ top: "10%", right: "5%", animationDelay: "1s" }}>
        θ
      </div>

      <div ref={ref} className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Why React for Math Solver?</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            React is a modern framework for building interactive, educational, and visually rich math tools in the browser.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="glass-card glass-card-hover rounded-2xl p-8"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyReact;
