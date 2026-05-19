import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'motion/react';

export function GPECalculator() {
  const [solveFor, setSolveFor] = useState<'GPE' | 'm' | 'h'>('GPE');
  const [mass, setMass] = useState(10);
  const [height, setHeight] = useState(5);
  const [gpe, setGpe] = useState(50);
  const g = 10;

  const calculate = () => {
    if (solveFor === 'GPE') {
      return mass * g * height;
    } else if (solveFor === 'm') {
      return height !== 0 ? gpe / (g * height) : 0;
    } else {
      return mass !== 0 ? gpe / (g * mass) : 0;
    }
  };

  const getCurrentHeight = () => {
    return solveFor === 'h' ? calculate() : height;
  };

  const getVisualHeight = () => {
    const h = getCurrentHeight();
    return h;
  };

  const getScaleFactor = () => {
    const h = getCurrentHeight();
    if (h <= 20) return 1;
    return 20 / h;
  };

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
      <div className="flex flex-col gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Gravitational Potential Energy</p>
            <h3 className="text-3xl font-semibold text-slate-100">Potential Energy Lab</h3>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
            <span className="font-mono text-cyan-300">GPE = mgh</span>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-400">
          Adjust mass, height, and potential energy to solve gravitational potential energy problems in a premium dark lab environment.
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
                onValueChange={(value) => value && setSolveFor(value as 'GPE' | 'm' | 'h')}
                className="flex gap-2"
              >
                {(['GPE', 'm', 'h'] as const).map((value) => (
                  <ToggleGroup.Item
                    key={value}
                    value={value}
                    className={`rounded-3xl px-4 py-2 text-sm font-semibold transition ${
                      solveFor === value
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                        : 'bg-slate-950/70 text-slate-300 border border-slate-800'
                    }`}
                  >
                    {value === 'GPE' ? 'GPE' : value === 'm' ? 'm (Mass)' : 'h (Height)'}
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
                max={20}
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

          {solveFor !== 'h' && (
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
              <label className="text-sm text-slate-300">Height (m): <span className="font-semibold text-slate-100">{height}</span></label>
              <Slider.Root
                value={[height]}
                onValueChange={(values) => setHeight(values[0])}
                max={20}
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

          {solveFor !== 'GPE' && (
            <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
              <label className="text-sm text-slate-300">GPE (J): <span className="font-semibold text-slate-100">{gpe}</span></label>
              <Slider.Root
                value={[Math.min(gpe, 2000)]}
                onValueChange={(values) => setGpe(values[0])}
                max={2000}
                min={0}
                step={5}
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
              Formula: {solveFor === 'GPE' && 'GPE = mgh'}
              {solveFor === 'm' && 'm = GPE / (gh)'}
              {solveFor === 'h' && 'h = GPE / (gm)'}
            </div>
            <div className="text-xs text-slate-500 mb-3">(g = 10 m/s²)</div>
            <div className="text-3xl font-semibold text-slate-100">
              {solveFor === 'GPE' && `GPE = ${calculate().toFixed(2)} J`}
              {solveFor === 'm' && `m = ${calculate().toFixed(2)} kg`}
              {solveFor === 'h' && `h = ${calculate().toFixed(2)} m`}
            </div>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-4 text-sm text-slate-400">
            <span>Height visualization</span>
            <span className="font-mono text-cyan-300">{getCurrentHeight().toFixed(1)} m</span>
          </div>

          <div className="relative h-64 overflow-hidden rounded-[1.5rem] border border-slate-800 bg-slate-950/80">
            <div className="absolute left-5 top-5 text-xs uppercase tracking-[0.3em] text-slate-500">Ground</div>
            <div className="absolute inset-x-5 bottom-5 h-2 rounded-full bg-slate-800" />
            <div className="absolute inset-x-5 top-6 bottom-16 rounded-[1.5rem] bg-slate-900/80" />
            <div className="absolute left-6 top-6 flex h-full w-1 flex-col justify-between text-[0.65rem] text-slate-500">
              {[20, 15, 10, 5, 0].map((value) => (
                <span key={value} className="relative -left-8">
                  {value}m
                </span>
              ))}
            </div>
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 flex h-20 w-16 items-center justify-center rounded-3xl bg-cyan-500 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)]"
              style={{
                bottom: `${(getVisualHeight() * getScaleFactor() / 20) * 78 + 8}%`,
              }}
              animate={{
                bottom: `${(getVisualHeight() * getScaleFactor() / 20) * 78 + 8}%`,
              }}
              transition={{ type: 'spring', stiffness: 100, damping: 16 }}
            >
              <span className="text-sm font-semibold">Mass</span>
            </motion.div>
            {getCurrentHeight() > 20 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full border border-slate-700 bg-slate-950/80 px-3 py-1 text-[0.7rem] text-slate-300">
                Scale: {getCurrentHeight().toFixed(1)}m (max on screen)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
