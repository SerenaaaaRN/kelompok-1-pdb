import { motion } from "framer-motion";
import { BlockMath } from "react-katex";
import { ODESolution, ODEInput } from "./types";
import { CheckCircle2 } from "lucide-react";

interface ODEStepsProps {
  input: ODEInput;
  solution: ODESolution;
}

const ODESteps = ({ input, solution }: ODEStepsProps) => {
  const steps = [
    {
      title: "Langkah 1: Bentuk Umum ODE",
      description: "Persamaan diferensial linear orde 1",
      latex: `\\frac{dy}{dx} + (${input.P})y = ${input.Q}`,
    },
    {
      title: "Langkah 2: Faktor Integrasi",
      description: "Hitung faktor integrasi μ(x) = e^(∫P(x)dx)",
      latex: `\\mu(x) = e^{\\int (${input.P}) \\, dx} = ${solution.muLatex}`,
    },
    {
      title: "Langkah 3: Kalikan ODE dengan μ(x)",
      description: "Kalikan seluruh persamaan dengan faktor integrasi",
      latex: `${solution.muLatex} \\frac{dy}{dx} + ${solution.muLatex} (${input.P}) y = ${solution.muQLatex}`,
    },
    {
      title: "Langkah 4: Identifikasi Turunan Lengkap",
      description: "Sisi kiri adalah turunan dari μ(x)y",
      latex: `\\frac{d}{dx}[${solution.muLatex} \\cdot y] = ${solution.muQLatex}`,
    },
    {
      title: "Langkah 5: Integrasikan Kedua Sisi",
      description: "Integrasikan untuk mendapatkan μ(x)y",
      latex: `${solution.muLatex} \\cdot y = \\int ${solution.muQLatex} \\, dx = ${solution.integralMuQLatex} + C`,
    },
    {
      title: "Langkah 6: Solusi Akhir",
      description: "Bagi dengan μ(x) untuk mendapatkan y(x)",
      latex: `y(x) = ${solution.generalSolutionLatex}`,
    },
  ];

  if (solution.particularSolutionLatex) {
    steps.push({
      title: "Langkah 7: Solusi Khusus",
      description: `Dengan kondisi awal y(${input.x0}) = ${input.y0}, didapat C = ${solution.C?.toFixed(4)}`,
      latex: `y(x) = ${solution.particularSolutionLatex}`,
    });
  }

  return (
    <div className="space-y-6">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="glass-card rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300"
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-xl font-bold text-foreground mb-2">{step.title}</h4>
              <p className="text-sm text-foreground/70">{step.description}</p>
            </div>
          </div>
          
          <div className="bg-muted/30 rounded-xl p-6 overflow-x-auto">
            <div className="text-center">
              <BlockMath math={step.latex} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ODESteps;
