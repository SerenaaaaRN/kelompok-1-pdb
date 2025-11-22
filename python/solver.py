import numpy as np
import matplotlib.pyplot as plt
import sympy as sp

def tampilkanSolusiManual(simbolP, simbolQ, x0, y0):
    print("\n" + "="*80)
    print(" SOLUSI MANUAL (METODE FAKTOR INTEGRASI)".center(80))
    print("="*80)

    x = sp.Symbol('x')

    print("\n📌 Langkah 1: Persamaan Diferensial Linear Orde 1")
    print(" Bentuk umum: dy/dx + P(x)y = Q(x)")
    print(f" Persamaan: dy/dx + ({simbolP})y = {simbolQ}\n")

    print("\n📌 Langkah 2: Menentukan Faktor Integrasi μ(x)")
    print("  μ(x) = exp( ∫ P(x) dx )")

    try:
        integralP = sp.integrate(simbolP, x)
        print(f"  ∫P(x) dx = ∫({simbolP}) dx = {integralP}")

        faktorIntegrasi = sp.exp(integralP)
        faktorIntegrasiSederhana = sp.simplify(faktorIntegrasi)
        print(f"  μ(x) = exp({integralP}) = {faktorIntegrasiSederhana}")

        print("\n📌 Langkah 3: Kalikan persamaan dengan μ(x)")
        print("  μ(x)*dy/dx + μ(x)*P(x)*y = μ(x)*Q(x)\n")

        ruasKanan = faktorIntegrasiSederhana * simbolQ
        print("\n📌 Langkah 4: Persamaan menjadi turunan dari μ(x)*y")
        print(f"  d/dx [ μ(x)*y ] = μ(x)*Q(x)")
        print(f"  d/dx [ {faktorIntegrasiSederhana} * y ] = {ruasKanan}\n")

        print("\n📌 Langkah 5: Integralkan kedua ruas")
        print(f"  ∫ d/dx({faktorIntegrasiSederhana}*y) dx = ∫ {ruasKanan} dx")

        try:
            integralRuasKanan = sp.integrate(ruasKanan, x)
            print(f"  {faktorIntegrasiSederhana} * y = {integralRuasKanan} + C\n")

            print("\n📌 Langkah 6: Solusi Umum")
            C = sp.Symbol('C')
            solusiUmum = (integralRuasKanan + C) / faktorIntegrasiSederhana
            solusiUmumSederhana = sp.simplify(solusiUmum)
            print(f"  y = ({integralRuasKanan} + C) / {faktorIntegrasiSederhana}\n")

            print("\n📌 Langkah 7: Terapkan Kondisi Awal")
            print(f"  y({x0}) = {y0}\n")

            nilaiYx0 = solusiUmumSederhana.subs(x, x0)
            persamaanC = sp.Eq(nilaiYx0, y0)
            print(f"  Subtitusi: {nilaiYx0} = {y0}")

            try:
                nilaiC = sp.solve(persamaanC, C)[0]
                print(f"  Diperoleh C = {nilaiC}")

                print("\n📌 Langkah 8: Solusi Khusus")
                solusiKhusus = solusiUmumSederhana.subs(C, nilaiC)
                solusiUmumSederhana = sp.simplify(solusiKhusus)
                print(f"  y(x) = {solusiUmumSederhana}\n")

            except:
                print("Tidak dapat menentukan konstanta C secara simbolik")

        except:
            print("Integral ruas kanan terlalu kompleks untuk diselesaikan")
    except Exception as e:
        print(f"Solusi manual tidak dapat ditampilkan: {e}")

def hitungSolusiEksak(simbolP, simbolQ, xNol, yNol, xAkhir, langkahH, x):
    """Mencoba menghitung solusi eksak menggunakan SymPy dsolve."""
    print("\n" + "="*80)
    print(" SOLUSI EKSAK (SYMPY DSOLVE)".center(80))
    print("="*80)
    print("\n⏳ Mencoba menghitung solusi eksak dengan SymPy...")

    try:
        y = sp.Function('y')
        persamaanDiferensial = sp.Eq(y(x).diff(x) + simbolP * y(x), simbolQ)
        kondisiAwal = {y(xNol): yNol}
        solusiEksak = sp.dsolve(persamaanDiferensial, y(x), ics=kondisiAwal)

        print("✅ Solusi eksak simbolik ditemukan!\n")
        print(solusiEksak)

        jumlahLangkah = int((xAkhir - xNol) / langkahH) + 1
        nilaiX = np.linspace(xNol, xAkhir, jumlahLangkah)
        fungsiYEksak = sp.lambdify(x, solusiEksak.rhs, 'numpy')
        nilaiYEksak = fungsiYEksak(nilaiX)

        return solusiEksak, nilaiX, nilaiYEksak

    except Exception as e:
        print("⚠ Solusi eksak simbolik tidak dapat dihitung oleh SymPy.")
        print(f"   Error: {e}")
        return None, None, None

def plotSolusiEksak(nilaiX, nilaiY, judul=""):
    if nilaiX is None or nilaiY is None:
        print("\n⚠ Tidak ada data untuk di-plot (mungkin solusi eksak gagal).")
        return

    print("\n Membuat visualisasi grafik untuk Solusi Eksak...")
    plt.figure(figsize=(10, 6))
    plt.plot(nilaiX, nilaiY, 'r-', label='Solusi Eksak (SymPy)', linewidth=2.5, alpha=0.8)

    plt.xlabel('x', fontsize=12, fontweight='bold')
    plt.ylabel('y', fontsize=12, fontweight='bold')
    plt.title('Plot Solusi Eksak', fontsize=13, fontweight='bold')
    plt.legend(loc='best', fontsize=10)
    plt.grid(True, alpha=0.4)

    plt.title(judul, fontsize=15, fontweight='bold', y=1.03)
    plt.show()