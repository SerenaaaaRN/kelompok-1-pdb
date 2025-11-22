import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Play } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { solveODE } from "../ode-linear/ODESolver";
import { ODEInput, ODESolution } from "../ode-linear/types";
import ODESteps from "../ode-linear/ODESteps";
import ODEGraph from "../ode-linear/ODEGraph";
import { toast } from "sonner";

const ODECalculator = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [input, setInput] = useState<ODEInput>({
    P: "2*x",
    Q: "x^2",
    x0: undefined,
    y0: undefined,
  });

  const [solution, setSolution] = useState<ODESolution | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = () => {
    setIsCalculating(true);
    try {
      const result = solveODE(input);
      setSolution(result);
      toast.success("Penyelesaian berhasil dihitung!");
    } catch (error) {
      toast.error("Error: " + (error instanceof Error ? error.message : "Invalid input"));
      setSolution(null);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <section id="calculator" className="py-24 relative overflow-hidden">
      <div className="math-symbol" style={{ top: "20%", left: "5%", animationDelay: "2s" }}>
        ∫
      </div>
      <div className="math-symbol" style={{ bottom: "30%", right: "8%", animationDelay: "4s" }}>
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
            <span className="text-gradient">ODE Linear Solver</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Kalkulator Persamaan Diferensial Linear Orde 1 dengan Langkah Penyelesaian Lengkap
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-8 md:p-12 max-w-6xl mx-auto mb-12"
        >
          <div className="flex items-start gap-6 mb-8">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-3xl font-bold mb-4">Input Persamaan</h3>
              <p className="text-foreground/70 leading-relaxed mb-6">
                Masukkan fungsi P(x) dan Q(x) untuk persamaan: dy/dx + P(x)y = Q(x)
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="P" className="text-lg">
                Fungsi P(x)
              </Label>
              <Input
                id="P"
                value={input.P}
                onChange={(e) => setInput({ ...input, P: e.target.value })}
                placeholder="Contoh: 2*x atau 1/x"
                className="bg-muted/30 border-border/50 text-lg"
              />
              <p className="text-sm text-foreground/50">
                Gunakan sintaks nerdamer: *, /, ^, sin(), cos(), exp(), log()
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="Q" className="text-lg">
                Fungsi Q(x)
              </Label>
              <Input
                id="Q"
                value={input.Q}
                onChange={(e) => setInput({ ...input, Q: e.target.value })}
                placeholder="Contoh: x^2 atau exp(x)"
                className="bg-muted/30 border-border/50 text-lg"
              />
              <p className="text-sm text-foreground/50">
                Fungsi bebas dari variabel x
              </p>
            </div>
          </div>

          <div className="bg-muted/20 rounded-xl p-6 mb-6">
            <h4 className="text-lg font-semibold mb-4 text-accent">
              Kondisi Awal (Opsional)
            </h4>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="x0">x₀</Label>
                <Input
                  id="x0"
                  type="number"
                  value={input.x0 ?? ""}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      x0: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  placeholder="Contoh: 0"
                  className="bg-muted/30 border-border/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="y0">y₀</Label>
                <Input
                  id="y0"
                  type="number"
                  value={input.y0 ?? ""}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      y0: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  placeholder="Contoh: 1"
                  className="bg-muted/30 border-border/50"
                />
              </div>
            </div>
          </div>

          <Button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="w-full h-14 text-lg neon-glow"
            size="lg"
          >
            <Play className="w-5 h-5 mr-2" />
            {isCalculating ? "Menghitung..." : "Hitung Solusi"}
          </Button>
        </motion.div>

        {solution && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 max-w-6xl mx-auto"
          >
            <div>
              <h3 className="text-3xl font-bold mb-8 text-center text-gradient">
                Langkah-Langkah Penyelesaian
              </h3>
              <ODESteps input={input} solution={solution} />
            </div>

            <ODEGraph solution={solution} />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ODECalculator;
