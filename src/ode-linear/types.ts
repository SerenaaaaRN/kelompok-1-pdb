export interface ODEInput {
  P: string;
  Q: string;
  x0?: number;
  y0?: number;
}

export interface ODESolution {
  mu: string;
  muLatex: string;
  integralP: string;
  integralPLatex: string;
  muQ: string;
  muQLatex: string;
  integralMuQ: string;
  integralMuQLatex: string;
  generalSolution: string;
  generalSolutionLatex: string;
  C?: number;
  particularSolution?: string;
  particularSolutionLatex?: string;
}

export interface ODEStep {
  title: string;
  description: string;
  latex: string;
}
