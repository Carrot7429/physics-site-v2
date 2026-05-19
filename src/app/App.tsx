import { WorkPowerCalculator } from './components/WorkPowerCalculator';
import { GPECalculator } from './components/GPECalculator';
import { KineticCalculator } from './components/KineticCalculator';
import { SpringCalculator } from './components/SpringCalculator';
import { ConservationChallenge } from './components/ConservationChallenge';
import { WindupToy } from './components/WindupToy';

export default function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/95 py-6 shadow-[0_10px_40px_rgba(15,23,42,0.55)]">
        <div className="max-w-screen-xl mx-auto px-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">
                Physics Instrumentation
              </p>
              <h1 className="text-4xl font-semibold text-slate-100">Energy Lab</h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-slate-400">
              Interactive physics simulations for academic and engineering study, delivered in a premium laboratory dashboard interface.
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-5 py-8 space-y-8">
        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <h2 className="text-3xl font-semibold text-slate-100">Welcome to the Energy Lab</h2>
              <p className="max-w-3xl text-sm leading-7 text-slate-400">
                Explore the fundamental principles of energy through interactive simulations and advanced calculation stations. These modules combine core physics concepts with real-time instrumentation and visual diagnostics.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-5 py-4 text-sm text-slate-300 shadow-inner">
              <span className="font-mono text-cyan-300">E_total = constant</span>
            </div>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)] space-y-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Core Concepts</p>
              <h2 className="text-2xl font-semibold text-slate-100">Laboratory Modules</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Use the calculators and challenges below to inspect energy, work, power, potential, kinetic, and elastic systems in a refined dashboard.
            </p>
          </div>
          <div className="space-y-8">
            <WorkPowerCalculator />
            <div className="grid gap-6 xl:grid-cols-2">
              <GPECalculator />
              <KineticCalculator />
            </div>
            <SpringCalculator />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Interactive Challenge</p>
              <h2 className="text-2xl font-semibold text-slate-100">Conservation Challenge</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Drag energy bars and verify conservation of energy with an intuitive experimental workspace.
            </p>
          </div>
          <div className="mt-6">
            <ConservationChallenge />
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.35em] text-cyan-300/80">Dynamic Simulation</p>
              <h2 className="text-2xl font-semibold text-slate-100">Wind-up Toy</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Observe energy transfer in motion and thermal dissipation with a laboratory-grade animated model.
            </p>
          </div>
          <div className="mt-6">
            <WindupToy />
          </div>
        </section>

        <footer className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 text-center text-sm text-slate-400 shadow-[0_20px_40px_rgba(15,23,42,0.35)]">
          <p>Energy Lab — premium physics education interface designed for classroom and engineering review.</p>
        </footer>
      </main>
    </div>
  );
}
