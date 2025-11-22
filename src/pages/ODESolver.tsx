import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Calculator, Play, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { odeApiClient, ODEApiResponse } from "@/services/odeApi";
import ODESteps from "@/components/ODESteps";
import ODEGraph from "@/components/ODEGraph";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ODEInput {
  P: string;
  Q: string;
  x0?: number;
  y0?: number;
}

const ODESolver = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [input, setInput] = useState<ODEInput>({
    P: "1",
    Q: "exp(x)",
    x0: undefined,
    y0: undefined,
  });

  const [solution, setSolution] = useState<ODEApiResponse | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [backendStatus, setBackendStatus] = useState<'checking' | 'online' | 'offline'>('checking');

  // Check backend health on mount
  useState(() => {
    checkBackendHealth();
  });

  const checkBackendHealth = async () => {
    setBackendStatus('checking');
    const isHealthy = await odeApiClient.healthCheck();
    setBackendStatus(isHealthy ? 'online' : 'offline');
  };

  const handleCalculate = async () => {
    if (backendStatus === 'offline') {
      toast.error("Backend server tidak tersedia. Pastikan server Python sudah berjalan di http://localhost:8000");
      return;
    }

    setIsCalculating(true);
    try {
      const result = await odeApiClient.solveODE({
        P: input.P,
        Q: input.Q,
        x0: input.x0,
        y0: input.y0,
      });

      if (!result.success) {
        throw new Error(result.error || "Calculation failed");
      }

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
    <div className="gradient-bg min-h-screen">
      <Navbar />
      <section className="py-24 relative overflow-hidden">
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
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="text-gradient">ODE Linear Solver</span>
            </h1>
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-3xl font-bold">Input Persamaan</h2>
                  <div className="flex items-center gap-2">
                    {backendStatus === 'checking' && (
                      <span className="text-sm text-muted-foreground">Checking backend...</span>
                    )}
                    {backendStatus === 'online' && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Wifi className="w-4 h-4" />
                        <span>Backend Online</span>
                      </div>
                    )}
                    {backendStatus === 'offline' && (
                      <div className="flex items-center gap-2 text-sm text-red-600">
                        <WifiOff className="w-4 h-4" />
                        <span>Backend Offline</span>
                      </div>
                    )}
                  </div>
                </div>
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
                  Gunakan sintaks SymPy: *, /, **, sin(), cos(), exp(), log()
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
                  placeholder="Contoh: x**2 atau exp(x)"
                  className="bg-muted/30 border-border/50 text-lg"
                />
                <p className="text-sm text-foreground/50">
                  Fungsi bebas dari variabel x
                </p>
              </div>
            </div>

            <div className="bg-muted/20 rounded-xl p-6 mb-6">
              <h3 className="text-lg font-semibold mb-4 text-accent">
                Kondisi Awal (Opsional)
              </h3>
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
              disabled={isCalculating || backendStatus === 'offline'}
              className="w-full h-14 text-lg neon-glow"
              size="lg"
            >
              <Play className="w-5 h-5 mr-2" />
              {isCalculating ? "Menghitung..." : "Hitung Solusi"}
            </Button>
            {backendStatus === 'offline' && (
              <p className="text-sm text-red-600 text-center mt-4">
                Backend server offline. Jalankan: <code className="bg-muted px-2 py-1 rounded">cd backend_api && python main.py</code>
              </p>
            )}
          </motion.div>

          {solution && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-12 max-w-6xl mx-auto"
            >
              <div>
                <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
                  Langkah-Langkah Penyelesaian
                </h2>
                <ODESteps steps={solution.steps} />
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
                  Grafik Solusi
                </h2>
                <ODEGraph plotData={solution.plot_data} />
              </div>
            </motion.div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ODESolver;
