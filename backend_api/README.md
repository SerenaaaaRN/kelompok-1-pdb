# ODE Solver Backend API

Backend API untuk Kalkulus Solver menggunakan FastAPI dan SymPy.

## Setup

1. Install dependencies:
```bash
cd backend_api
pip install -r requirements.txt
```

2. Run server:
```bash
python main.py
```

Atau dengan uvicorn:
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Server akan berjalan di: `http://localhost:8000`

## API Documentation

Setelah server berjalan, buka:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Endpoints

### POST /api/solve-ode

Solve first-order linear ODE: dy/dx + P(x)*y = Q(x)

**Request Body:**
```json
{
  "P": "1",
  "Q": "exp(x)",
  "x0": 0,
  "y0": 1,
  "x_min": -5,
  "x_max": 5,
  "num_points": 100
}
```

**Response:**
```json
{
  "success": true,
  "steps": [...],
  "general_solution": "...",
  "general_solution_latex": "...",
  "particular_solution": "...",
  "particular_solution_latex": "...",
  "C": 0.5,
  "plot_data": {
    "x": [...],
    "y": [...],
    "x_min": -5,
    "x_max": 5
  }
}
```

## Development

API ini menggunakan:
- **FastAPI**: Web framework
- **SymPy**: Symbolic mathematics
- **NumPy**: Numerical computations
- **Pydantic**: Data validation
