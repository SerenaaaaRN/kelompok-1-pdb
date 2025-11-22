import { motion } from "framer-motion";
import Plot from "react-plotly.js";
import { ODESolution } from "./types";
import { evaluateSolution } from "./ODESolver";
import { useEffect, useState } from "react";

interface ODEGraphProps {
  solution: ODESolution;
}

const ODEGraph = ({ solution }: ODEGraphProps) => {
  const [plotData, setPlotData] = useState<any[]>([]);

  useEffect(() => {
    // Generate x values from -5 to 5
    const xValues = Array.from({ length: 200 }, (_, i) => -5 + (i * 10) / 199);
    
    // Use particular solution if available, otherwise general solution with C=0
    const solutionToPlot = solution.particularSolution || solution.generalSolution;
    const yValues = evaluateSolution(solutionToPlot, xValues);

    setPlotData([
      {
        x: xValues,
        y: yValues,
        type: "scatter",
        mode: "lines",
        name: "y(x)",
        line: {
          color: "rgb(168, 85, 247)",
          width: 3,
        },
      },
    ]);
  }, [solution]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-card rounded-2xl p-6"
    >
      <h3 className="text-2xl font-bold mb-6 text-gradient">Grafik Solusi y(x)</h3>
      
      <div className="bg-muted/30 rounded-xl p-4">
        <Plot
          data={plotData}
          layout={{
            autosize: true,
            paper_bgcolor: "rgba(0,0,0,0)",
            plot_bgcolor: "rgba(0,0,0,0)",
            font: {
              color: "#e5e5e5",
              family: "Inter, system-ui, sans-serif",
            },
            xaxis: {
              title: "x",
              gridcolor: "rgba(255,255,255,0.1)",
              zerolinecolor: "rgba(255,255,255,0.2)",
            },
            yaxis: {
              title: "y",
              gridcolor: "rgba(255,255,255,0.1)",
              zerolinecolor: "rgba(255,255,255,0.2)",
            },
            margin: { t: 30, r: 30, b: 50, l: 50 },
          }}
          config={{
            responsive: true,
            displayModeBar: true,
            displaylogo: false,
          }}
          className="w-full"
          style={{ width: "100%", height: "500px" }}
        />
      </div>

      <p className="text-sm text-foreground/60 mt-4 text-center">
        Grafik interaktif - gunakan mouse untuk zoom dan pan
      </p>
    </motion.div>
  );
};

export default ODEGraph;
