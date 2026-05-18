import { WorkPowerCalculator } from './components/WorkPowerCalculator';
import { GPECalculator } from './components/GPECalculator';
import { KineticCalculator } from './components/KineticCalculator';
import { SpringCalculator } from './components/SpringCalculator';
import { ConservationChallenge } from './components/ConservationChallenge';
import { WindupToy } from './components/WindupToy';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-black bg-white p-5">
        <div className="max-w-screen-xl mx-auto">
          <h1>Energy Lab</h1>
          <p className="text-sm">Interactive Physics Simulations</p>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto p-5">
        <section className="mb-8">
          <h2 className="mb-4">Welcome to Energy Lab</h2>
          <p className="mb-6">
            Explore the fundamental principles of energy through interactive simulations and calculations.
            Understanding energy is key to understanding how our universe works.
          </p>
        </section>

        <section className="mb-8 bg-gray-100 border border-black p-5">
          <h3 className="mb-2">What is Energy?</h3>
          <p>
            In science, energy is defined as the capacity to do work. It exists in many forms, including kinetic (motion), potential (stored), thermal (heat), and elastic energy. A core concept in physics is the law of conservation of energy, which states that energy cannot be created or destroyed; it can only be transformed from one form to another.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="mb-4">Core Concepts</h2>
          <div className="space-y-6">
            <WorkPowerCalculator />
            <div className="grid md:grid-cols-2 gap-6">
              <GPECalculator />
              <KineticCalculator />
            </div>
            <SpringCalculator />
          </div>
        </section>

        <section className="mb-8">
          <h2 className="mb-4">Interactive Challenge</h2>
          <ConservationChallenge />
        </section>

        <section className="mb-8">
          <h2 className="mb-4">Physics Simulation</h2>
          <WindupToy />
        </section>

        <footer className="mt-12 pt-8 border-t border-black text-center">
          <p>Energy Lab - Interactive Physics Education</p>
        </footer>
      </main>
    </div>
  );
}
