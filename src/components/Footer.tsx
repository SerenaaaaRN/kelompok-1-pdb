import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">∫ Kalkulus Solver</h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Python-based differential equation solver dengan visualisasi interaktif.
              Project Kalkulus 2025 by kel 1.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Why Python", "Libraries", "Material", "Demo", "Architecture", "Team"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="text-foreground/70 hover:text-primary text-sm transition-colors duration-200"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect</h4>
            <div className="flex gap-3 mb-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg glass-card hover:bg-primary/20 flex items-center justify-center transition-colors duration-200"
              >
                <Github className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg glass-card hover:bg-primary/20 flex items-center justify-center transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-lg glass-card hover:bg-primary/20 flex items-center justify-center transition-colors duration-200"
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </div>
            <p className="text-foreground/60 text-sm">
              kalkulus.solver@university.edu
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center">
          <p className="text-foreground/60 text-sm flex items-center justify-center gap-2">
            Made with Python, NumPy, SymPy, Matplotlib & Tkinter
          </p>
          <p className="text-foreground/50 text-xs mt-2">
            © 2025 Kalkulus Solver. Presentation Project.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
