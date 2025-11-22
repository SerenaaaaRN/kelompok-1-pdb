import { motion } from "framer-motion";
import Plot from "react-plotly.js";

interface PlotData {
  x: number[];
  y: number[];
  x_min: number;
  x_max: number;
}

interface ODEGraphProps {
  plotData: PlotData;
}

const ODEGraph = ({ plotData }: ODEGraphProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card rounded-2xl p-6"
    >
      <Plot
        data={[
          {
            x: plotData.x,
            y: plotData.y,
            type: "scatter",
            mode: "lines",
            line: {
              color: "hsl(var(--primary))",
              width: 3,
            },
            name: "y(x)",
          },
        ]}
        layout={{
          autosize: true,
          paper_bgcolor: "rgba(0,0,0,0)",
          plot_bgcolor: "rgba(0,0,0,0)",
          font: {
            color: "hsl(var(--foreground))",
            family: "system-ui, -apple-system, sans-serif",
          },
          xaxis: {
            title: "x",
            gridcolor: "hsl(var(--border))",
            zerolinecolor: "hsl(var(--border))",
          },
          yaxis: {
            title: "y",
            gridcolor: "hsl(var(--border))",
            zerolinecolor: "hsl(var(--border))",
          },
          margin: {
            l: 60,
            r: 40,
            t: 40,
            b: 60,
          },
        }}
        config={{
          responsive: true,
          displayModeBar: true,
          displaylogo: false,
        }}
        className="w-full"
        style={{ width: "100%", height: "500px" }}
      />
    </motion.div>
  );
};

export default ODEGraph;
