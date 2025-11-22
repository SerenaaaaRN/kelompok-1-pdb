import sympy as sp
from solver import hitungSolusiEksak, plotSolusiEksak, tampilkanSolusiManual

def dapatkanInputPengguna():
    """Mendapatkan input dari pengguna untuk persamaan diferensial dan parameter."""
    print("\nINPUT PERSAMAAN DIFERENSIAL")
    print("-" * 80)
    print("Masukkan fungsi P(x) dan Q(x) dalam notasi Python/SymPy\n")
    # print("Contoh: 2*x, x**2, sin(x), cos(x), exp(x), 1/x, sqrt(x), dll.\n")

    ekspresiP = input("Masukkan P(x): ").strip() or "1"
    ekspresiQ = input("Masukkan Q(x): ").strip() or "x"

    print("\n📊 KONDISI AWAL DAN PARAMETER")
    print("-" * 80)

    inputXNol = input("Nilai awal x₀ [default: 0]: ").strip()
    xNol = float(inputXNol) if inputXNol else 0.0

    inputYNol = input("Nilai awal y₀ [default: 1]: ").strip()
    yNol = float(inputYNol) if inputYNol else 1.0

    inputXAkhir = input("Nilai akhir x [default: 2]: ").strip()
    xAkhir = float(inputXAkhir) if inputXAkhir else 2.0

    inputH = input("Step size h (untuk plotting) [default: 0.1]: ").strip()
    langkahH = float(inputH) if inputH else 0.1

    return ekspresiP, ekspresiQ, xNol, yNol, xAkhir, langkahH

def tampilkanInformasiPersamaan(ekspresiP, ekspresiQ, xNol, yNol, xAkhir, langkahH):
    """Menampilkan informasi persamaan yang telah diinput."""
    print("\n" + "="*80)
    print(" INFORMASI PERSAMAAN".center(80))
    print("="*80)
    print(f"\n📌 Persamaan: dy/dx + ({ekspresiP})y = {ekspresiQ}")
    print(f"📌 Kondisi awal: y({xNol}) = {yNol}")
    print(f"📌 Interval: x ∈ [{xNol}, {xAkhir}]")
    print(f"📌 Step size: h = {langkahH}")


def tampilkanTabelSolusi(nilaiX, nilaiYEksak):
    """Menampilkan hasil solusi dalam bentuk tabel."""
    print("\n" + "="*80)
    print(" TABEL HASIL SOLUSI EKSAK (10 titik pertama)".center(80))
    print("="*80)

    if nilaiX is not None and nilaiYEksak is not None:
        print(f"{'x':>15} {'y_Eksak':>20}")
        print("-" * 80)

        titikTampil = min(10, len(nilaiX))
        for i in range(titikTampil):
            print(f"{nilaiX[i]:>15.4f} {nilaiYEksak[i]:>20.8f}")

        if len(nilaiX) > 10:
            print("   ...")
            i = -1
            print(f"{nilaiX[i]:>15.4f} {nilaiYEksak[i]:>20.8f}")
    else:
        print("⚠ Tidak ada data tabel untuk ditampilkan.")

if __name__ == "__main__":
    """Fungsi utama untuk menjalankan program."""
    print("="*80)
    print(" PENYELESAIAN PERSAMAAN DIFERENSIAL LINEAR ORDE 1".center(80))
    print(" dy/dx + P(x)y = Q(x)".center(80))
    print("="*80)

    ekspresiP, ekspresiQ, xNol, yNol, xAkhir, langkahH = dapatkanInputPengguna()
    tampilkanInformasiPersamaan(ekspresiP, ekspresiQ, xNol, yNol, xAkhir, langkahH)

    try:
        x = sp.Symbol('x')
        simbolP = sp.sympify(ekspresiP)
        simbolQ = sp.sympify(ekspresiQ)

        tampilkanSolusiManual(simbolP, simbolQ, xNol, yNol)

        solusiEksak, nilaiX, nilaiYEksak = hitungSolusiEksak(simbolP, simbolQ, xNol, yNol, xAkhir, langkahH, x)

        tampilkanTabelSolusi(nilaiX, nilaiYEksak)

        judulPlot = f"Solusi Eksak: dy/dx + ({ekspresiP})y = {ekspresiQ}"
        plotSolusiEksak(nilaiX, nilaiYEksak, judul=judulPlot)

        print("\n" + "="*80)
        print(" ✅ PROGRAM SELESAI!".center(80))
        print("="*80)

    except Exception as e:
        print(f"\n❌ ERROR: {e}")
        print("Pastikan input P(x) dan Q(x) menggunakan sintaks yang benar!")
        print("Contoh valid: 2*x, x**2, sin(x), cos(x), exp(x), 1/x")