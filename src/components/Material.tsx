import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { BookOpen, GitFork, Target } from "lucide-react";
import { BlockMath } from "react-katex";

const Material = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="material" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ bottom: "10%", right: "10%", animationDelay: "5s" }}>
        ∂
      </div>
      <div className="math-symbol" style={{ top: "20%", left: "5%", animationDelay: "2s" }}>
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
            <span className="text-gradient">Learning Material</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Memahami Persamaan Diferensial Linear & Jenis Solusinya
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 max-w-5xl mx-auto"
        >
          {/* --- BAGIAN 1: Definisi Dasar --- */}
          <div className="flex items-start gap-6 mb-10 border-b border-white/10 pb-10">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold mb-4">Persamaan Diferensial Linear Orde 1</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Persamaan diferensial linear adalah persamaan yang melibatkan fungsi dan turunannya
                dengan koefisien yang merupakan fungsi dari variabel bebas atau konstanta.
              </p>
              
              {/* Bentuk Umum & Solusi Umum (Existing Code) */}
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-muted/30 rounded-2xl p-6 border border-white/5">
                    <h4 className="text-sm font-semibold mb-2 text-accent uppercase tracking-wider">Bentuk Umum</h4>
                    <div className="overflow-x-auto">
                        <BlockMath math="\frac{dy}{dx} + P(x)y = Q(x)" />
                    </div>
                </div>
                <div className="bg-muted/30 rounded-2xl p-6 border border-white/5">
                    <h4 className="text-sm font-semibold mb-2 text-accent uppercase tracking-wider">Rumus Solusi Umum</h4>
                    <div className="overflow-x-auto">
                        <BlockMath math={`y = e^{-\\int P(x)dx} \\left( \\int Q(x)e^{\\int P(x)dx} dx + C \\right)`}/>
                    </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- BAGIAN 2: Perbedaan Solusi (NEW MATERIAL) --- */}
          <div>
            <h3 className="text-2xl font-bold mb-6 text-center">Perbedaan Jenis Solusi</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
                
              {/* Kartu Solusi Umum */}
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                            <GitFork className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-blue-400">Solusi Umum</h4>
                    </div>
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                        Solusi yang masih memuat <strong>konstanta sebarang (C)</strong>. 
                        Ini merepresentasikan "keluarga kurva" (banyak kemungkinan grafik).
                    </p>
                    <div className="bg-black/20 rounded-xl p-4 text-center">
                        <p className="text-xs text-foreground/50 mb-2">Contoh:</p>
                        <BlockMath math="y = x^2 + C" />
                    </div>
                </div>
              </div>

              {/* Kartu Solusi Eksak */}
              <div className="relative group">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 h-full">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400">
                            <Target className="w-6 h-6" />
                        </div>
                        <h4 className="text-xl font-bold text-emerald-400">Solusi Eksak</h4>
                    </div>
                    <p className="text-sm text-foreground/70 mb-4 leading-relaxed">
                        Solusi spesifik dimana <strong>nilai C sudah ditemukan</strong>. 
                        Didapat dengan mensubstitusi <em>Nilai Awal</em> (Initial Value) ke solusi umum.
                    </p>
                    <div className="bg-black/20 rounded-xl p-4 text-center">
                        <p className="text-xs text-foreground/50 mb-2">Contoh (jika y(0)=1, maka C=1):</p>
                        <BlockMath math="y = x^2 + 1" />
                    </div>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default Material;