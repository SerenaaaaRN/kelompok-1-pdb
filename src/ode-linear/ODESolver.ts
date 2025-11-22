import nerdamer from 'nerdamer';
import 'nerdamer/Calculus';
import 'nerdamer/Solve';
import { ODEInput, ODESolution } from './types';

export const solveODE = (input: ODEInput): ODESolution => {
  const { P, Q, x0, y0 } = input;

  try {
    // Step 1: Calculate integral of P(x)
    const integralP = nerdamer(`integrate(${P}, x)`).toString();
    const integralPLatex = nerdamer(`integrate(${P}, x)`).toTeX();

    // Step 2: Calculate integrating factor μ(x) = e^(∫P(x)dx)
    const mu = nerdamer(`e^(${integralP})`).toString();
    const muLatex = nerdamer(`e^(${integralP})`).toTeX();

    // Step 3: Calculate μ(x) * Q(x)
    const muQ = nerdamer(`(${mu}) * (${Q})`).expand().toString();
    const muQLatex = nerdamer(`(${mu}) * (${Q})`).expand().toTeX();

    // Step 4: Calculate ∫μ(x)Q(x)dx
    const integralMuQ = nerdamer(`integrate((${mu}) * (${Q}), x)`).toString();
    const integralMuQLatex = nerdamer(`integrate((${mu}) * (${Q}), x)`).toTeX();

    // Step 5: General solution y(x) = (1/μ(x)) * (∫μ(x)Q(x)dx + C)
    const generalSolution = nerdamer(`((${integralMuQ}) + C) / (${mu})`).toString();
    const generalSolutionLatex = nerdamer(`((${integralMuQ}) + C) / (${mu})`).toTeX();

    let C: number | undefined;
    let particularSolution: string | undefined;
    let particularSolutionLatex: string | undefined;

    // If initial conditions are provided, calculate C
    if (x0 !== undefined && y0 !== undefined) {
      try {
        // Substitute x0 and y0 into general solution to solve for C
        const substituted = nerdamer(generalSolution, { x: x0.toString(), y: y0.toString() });
        const solveForC = nerdamer(`solve(${y0} = ${substituted.toString()}, C)`);
        C = parseFloat(solveForC.toString());

        // Calculate particular solution with C
        particularSolution = nerdamer(generalSolution, { C: C.toString() }).toString();
        particularSolutionLatex = nerdamer(generalSolution, { C: C.toString() }).toTeX();
      } catch (error) {
        console.warn('Could not calculate particular solution:', error);
      }
    }

    return {
      mu,
      muLatex,
      integralP,
      integralPLatex,
      muQ,
      muQLatex,
      integralMuQ,
      integralMuQLatex,
      generalSolution,
      generalSolutionLatex,
      C,
      particularSolution,
      particularSolutionLatex,
    };
  } catch (error) {
    throw new Error(`Error solving ODE: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const evaluateSolution = (solution: string, xValues: number[]): number[] => {
  try {
    return xValues.map((x) => {
      try {
        const result = nerdamer(solution, { x: x.toString(), C: '0' }).evaluate();
        const value = parseFloat(result.toString());
        return isFinite(value) ? value : 0;
      } catch {
        return 0;
      }
    });
  } catch (error) {
    console.error('Error evaluating solution:', error);
    return xValues.map(() => 0);
  }
};
