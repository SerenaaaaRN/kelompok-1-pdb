from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional, List
import sympy as sp
import numpy as np

app = FastAPI(title="ODE Solver API", version="1.0.0")

# CORS middleware untuk allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Dalam production, ganti dengan domain specific
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ODERequest(BaseModel):
    P: str
    Q: str
    x0: Optional[float] = None
    y0: Optional[float] = None
    x_min: float = -5
    x_max: float = 5
    num_points: int = 100


class ODEResponse(BaseModel):
    success: bool
    steps: List[dict]
    general_solution: str
    general_solution_latex: str
    particular_solution: Optional[str] = None
    particular_solution_latex: Optional[str] = None
    C: Optional[float] = None
    plot_data: dict
    error: Optional[str] = None


def sympy_to_latex(expr) -> str:
    """Convert SymPy expression to LaTeX string"""
    return sp.latex(expr)


def solve_ode_sympy(P_str: str, Q_str: str, x0: Optional[float], y0: Optional[float]):
    """
    Solve first-order linear ODE: dy/dx + P(x)*y = Q(x)
    Using integrating factor method with SymPy
    """
    x = sp.Symbol('x')
    C = sp.Symbol('C')
    
    try:
        # Parse input functions
        P = sp.sympify(P_str)
        Q = sp.sympify(Q_str)
        
        steps = []
        
        # Step 1: ODE Form
        steps.append({
            "title": "Langkah 1: Bentuk Umum ODE",
            "description": "Persamaan diferensial linear orde 1",
            "latex": f"\\frac{{dy}}{{dx}} + ({sympy_to_latex(P)})y = {sympy_to_latex(Q)}"
        })
        
        # Step 2: Integrating Factor
        integral_P = sp.integrate(P, x)
        mu = sp.exp(integral_P)
        mu_simplified = sp.simplify(mu)
        
        steps.append({
            "title": "Langkah 2: Faktor Integrasi",
            "description": "Hitung faktor integrasi μ(x) = e^(∫P(x)dx)",
            "latex": f"\\mu(x) = e^{{\\int ({sympy_to_latex(P)}) \\, dx}} = {sympy_to_latex(mu_simplified)}"
        })
        
        # Step 3: Multiply by mu(x)
        mu_Q = sp.simplify(mu_simplified * Q)
        steps.append({
            "title": "Langkah 3: Kalikan ODE dengan μ(x)",
            "description": "Kalikan seluruh persamaan dengan faktor integrasi",
            "latex": f"{sympy_to_latex(mu_simplified)} \\frac{{dy}}{{dx}} + {sympy_to_latex(mu_simplified)} ({sympy_to_latex(P)}) y = {sympy_to_latex(mu_Q)}"
        })
        
        # Step 4: Derivative form
        steps.append({
            "title": "Langkah 4: Identifikasi Turunan Lengkap",
            "description": "Sisi kiri adalah turunan dari μ(x)y",
            "latex": f"\\frac{{d}}{{dx}}[{sympy_to_latex(mu_simplified)} \\cdot y] = {sympy_to_latex(mu_Q)}"
        })
        
        # Step 5: Integrate both sides
        integral_mu_Q = sp.integrate(mu_Q, x)
        integral_mu_Q_simplified = sp.simplify(integral_mu_Q)
        
        steps.append({
            "title": "Langkah 5: Integrasikan Kedua Sisi",
            "description": "Integrasikan untuk mendapatkan μ(x)y",
            "latex": f"{sympy_to_latex(mu_simplified)} \\cdot y = \\int {sympy_to_latex(mu_Q)} \\, dx = {sympy_to_latex(integral_mu_Q_simplified)} + C"
        })
        
        # Step 6: General Solution
        general_solution = (integral_mu_Q_simplified + C) / mu_simplified
        general_solution_simplified = sp.simplify(general_solution)
        
        steps.append({
            "title": "Langkah 6: Solusi Umum",
            "description": "Bagi dengan μ(x) untuk mendapatkan y(x)",
            "latex": f"y(x) = {sympy_to_latex(general_solution_simplified)}"
        })
        
        # Calculate C if initial conditions provided
        C_value = None
        particular_solution = None
        particular_solution_latex = None
        
        if x0 is not None and y0 is not None:
            y_at_x0 = general_solution_simplified.subs(x, x0)
            eq = sp.Eq(y_at_x0, y0)
            C_solutions = sp.solve(eq, C)
            
            if C_solutions:
                C_value = float(C_solutions[0])
                particular_solution = general_solution_simplified.subs(C, C_value)
                particular_solution_simplified = sp.simplify(particular_solution)
                particular_solution_latex = sympy_to_latex(particular_solution_simplified)
                
                steps.append({
                    "title": "Langkah 7: Solusi Khusus",
                    "description": f"Dengan kondisi awal y({x0}) = {y0}, didapat C = {C_value:.4f}",
                    "latex": f"y(x) = {particular_solution_latex}"
                })
        
        return {
            "steps": steps,
            "general_solution": str(general_solution_simplified),
            "general_solution_latex": sympy_to_latex(general_solution_simplified),
            "particular_solution": str(particular_solution) if particular_solution else None,
            "particular_solution_latex": particular_solution_latex,
            "C": C_value,
            "mu": mu_simplified,
            "integral_mu_Q": integral_mu_Q_simplified
        }
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error solving ODE: {str(e)}")


@app.get("/api")
async def root():
    return {"message": "ODE Solver API is running", "version": "1.0.0"}


@app.get("/api/health")
async def health():
    return {"status": "healthy"}


@app.post("/api/solve-ode", response_model=ODEResponse)
async def solve_ode(request: ODERequest):
    """
    Solve first-order linear ODE
    """
    try:
        # Solve ODE using SymPy
        solution = solve_ode_sympy(request.P, request.Q, request.x0, request.y0)
        
        # Generate plot data
        x = sp.Symbol('x')
        C = sp.Symbol('C')
        
        # Use particular solution if available, else general solution with C=0
        if solution["particular_solution"]:
            plot_expr = sp.sympify(solution["particular_solution"])
        else:
            plot_expr = sp.sympify(solution["general_solution"]).subs(C, 0)
        
        # Create lambdified function for numerical evaluation
        try:
            f = sp.lambdify(x, plot_expr, 'numpy')
            x_values = np.linspace(request.x_min, request.x_max, request.num_points)
            y_values = f(x_values)
            
            # Filter out invalid values (inf, nan)
            valid_mask = np.isfinite(y_values)
            x_plot = x_values[valid_mask].tolist()
            y_plot = y_values[valid_mask].tolist()
        except Exception as e:
            print(f"Plot generation error: {e}")
            x_plot = []
            y_plot = []
        
        plot_data = {
            "x": x_plot,
            "y": y_plot,
            "x_min": request.x_min,
            "x_max": request.x_max
        }
        
        return ODEResponse(
            success=True,
            steps=solution["steps"],
            general_solution=solution["general_solution"],
            general_solution_latex=solution["general_solution_latex"],
            particular_solution=solution["particular_solution"],
            particular_solution_latex=solution["particular_solution_latex"],
            C=solution["C"],
            plot_data=plot_data
        )
        
    except HTTPException as he:
        raise he
    except Exception as e:
        return ODEResponse(
            success=False,
            steps=[],
            general_solution="",
            general_solution_latex="",
            plot_data={"x": [], "y": [], "x_min": request.x_min, "x_max": request.x_max},
            error=str(e)
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
