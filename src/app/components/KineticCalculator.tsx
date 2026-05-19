import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'motion/react';

export function KineticCalculator() {
  const [solveFor, setSolveFor] = useState<'KE' | 'm' | 'v'>('KE');
  const [mass, setMass] = useState(10);
  const [velocity, setVelocity] = useState(5);
  const [ke, setKe] = useState(125);

  const calculate = () => {
    if (solveFor === 'KE') {
      return 0.5 * mass * velocity * velocity;
    } else if (solveFor === 'm') {
      return velocity !== 0 ? (2 * ke) / (velocity * velocity) : 0;
    } else {
      return mass !== 0 ? Math.sqrt((2 * ke) / mass) : 0;
    }
  };

  const getCurrentVelocity = () => {
    return solveFor === 'v' ? calculate() : velocity;
  };

  const getCurrentMass = () => {
    return solveFor === 'm' ? calculate() : mass;
  };

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Kinetic Energy</p>
            <h3 className="text-3xl font-semibold text-slate-100">Kinetic Sandbox</h3>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
            <span className="font-mono text-cyan-300">KE = ½mv²</span>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-400">
          Explore how mass and velocity influence kinetic energy with a responsive velocity tracker and precision sliders.
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
        <div className="space-y-6">
          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm uppercase tracking-[0.3em] text-slate-500">Solve for</span>
              <ToggleGroup.Root
                type="single"
                value={solveFor}
                onValueChange={(value) => value && setSolveFor(value as 'KE' | 'm' | 'v')}
                className="flex gap-2"
              >
                {(['KE', 'm', 'v'] as const).map((value) => (
                  <ToggleGroup.Item
                    key={value}
                    value={value}
                    className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                      solveFor === value
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                        : 'bg-slate-950/70 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {value === 'KE' ? 'KE' : value === 'm' ? 'm (Mass)' : 'v (Velocity)'}
                  </ToggleGroup.Item>
                ))}
              </ToggleGroup.Root>
            </div>
          </div>

          {solveFor !== 'm' && (
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
              <label className="text-sm text-slate-300">Mass (kg): <span className="font-semibold text-slate-100">{mass}</span></label>
              <Slider.Root
                value={[mass]}
                onValueChange={(values) => setMass(values[0])}
                max={50}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-3"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {solveFor !== 'v' && (
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
              <label className="text-sm text-slate-300">Velocity (m/s): <span className="font-semibold text-slate-100">{velocity}</span></label>
              <Slider.Root
                value={[velocity]}
                onValueChange={(values) => setVelocity(values[0])}
                max={30}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-3"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {solveFor !== 'KE' && (
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
              <label className="text-sm text-slate-300">Kinetic Energy (J): <span className="font-semibold text-slate-100">{ke}</span></label>
              <Slider.Root
                value={[ke]}
                onValueChange={(values) => setKe(values[0])}
                max={5000}
                step={10}
                className="relative flex items-center w-full h-5 mt-3"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
            <div className="text-sm text-slate-500 mb-2">
              Formula: {solveFor === 'KE' && 'KE = ½mv²'}
              {solveFor === 'm' && 'm = 2KE / v²'}
              {solveFor === 'v' && 'v = √(2KE / m)'}
            </div>
            <div className="text-3xl font-semibold text-slate-100">
              {solveFor === 'KE' && `KE = ${calculate().toFixed(2)} J`}
              {solveFor === 'm' && `m = ${calculate().toFixed(2)} kg`}
              {solveFor === 'v' && `v = ${calculate().toFixed(2)} m/s`}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4 text-sm text-slate-400">
            <span>Motion Benchmark</span>
            <span className="font-mono text-cyan-300">{getCurrentVelocity().toFixed(1)} m/s</span>
          </div>
          <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950/80">
            <div className="absolute inset-x-5 bottom-6 h-2 rounded-full bg-slate-800" />
            <motion.div
              key={`${mass}-${velocity}-${ke}-${solveFor}`}
              className="absolute bottom-10 h-16 w-16 rounded-full bg-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.25)] flex items-center justify-center text-xs font-semibold text-slate-950"
              animate={{
                left: ['12%', '78%', '12%'],
              }}
              transition={{
                duration: Math.max(0.5, 10 / Math.max(1, getCurrentVelocity())),
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              {getCurrentMass().toFixed(1)}kg
            </motion.div>
            <div className="absolute top-5 left-5 text-sm text-slate-400">Velocity</div>
          </div>
        </div>
      </div>
    </div>
  );
}
