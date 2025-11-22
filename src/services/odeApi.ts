// API Service untuk komunikasi dengan Python Backend
const API_BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:8000';
// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ODEApiRequest {
  P: string;
  Q: string;
  x0?: number;
  y0?: number;
  x_min?: number;
  x_max?: number;
  num_points?: number;
}

export interface ODEStep {
  title: string;
  description: string;
  latex: string;
}

export interface ODEApiResponse {
  success: boolean;
  steps: ODEStep[];
  general_solution: string;
  general_solution_latex: string;
  particular_solution?: string;
  particular_solution_latex?: string;
  C?: number;
  plot_data: {
    x: number[];
    y: number[];
    x_min: number;
    x_max: number;
  };
  error?: string;
}

export class ODEApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async solveODE(request: ODEApiRequest): Promise<ODEApiResponse> {
    const response = await fetch(`${this.baseUrl}/api/solve-ode`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        P: request.P,
        Q: request.Q,
        x0: request.x0,
        y0: request.y0,
        x_min: request.x_min ?? -5,
        x_max: request.x_max ?? 5,
        num_points: request.num_points ?? 100,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  }

  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/api/health`);
      return response.ok;
    } catch {
      return false;
    }
  }
}

export const odeApiClient = new ODEApiClient();
