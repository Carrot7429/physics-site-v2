import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

export function WorkPowerCalculator() {
  const [mode, setMode] = useState<'work-calc' | 'power-calc'>('work-calc');
  const [workSolveFor, setWorkSolveFor] = useState<'W' | 'F' | 'd'>('W');
  const [powerSolveFor, setPowerSolveFor] = useState<'P' | 'W' | 't'>('P');

  const [force, setForce] = useState(50);
  const [distance, setDistance] = useState(10);
  const [work, setWork] = useState(500);
  const [time, setTime] = useState(5);
  const [power, setPower] = useState(100);

  const calculateWork = () => {
    if (workSolveFor === 'W') {
      return force * distance;
    } else if (workSolveFor === 'F') {
      return distance !== 0 ? work / distance : 0;
    } else {
      return force !== 0 ? work / force : 0;
    }
  };

  const calculatePower = () => {
    if (powerSolveFor === 'P') {
      return time !== 0 ? work / time : 0;
    } else if (powerSolveFor === 'W') {
      return power * time;
    } else {
      return power !== 0 ? work / power : 0;
    }
  };

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-900/95 p-6 shadow-[0_20px_60px_rgba(15,23,42,0.45)]">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <h3 className="text-2xl font-semibold text-slate-100">Work & Power Station</h3>
          <p className="max-w-2xl text-sm leading-6 text-slate-400">
            Choose the equation, manipulate inputs, and inspect the calculated result in real time.
          </p>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-inner">
          <span className="font-mono text-cyan-300">W = F × d • P = W / t</span>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <button
          onClick={() => setMode('work-calc')}
          className={`rounded-3xl border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            mode === 'work-calc'
              ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200 shadow-[0_10px_30px_rgba(6,182,212,0.15)]'
              : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200 hover:bg-slate-900'
          }`}
        >
          Work Calculator
        </button>
        <button
          onClick={() => setMode('power-calc')}
          className={`rounded-3xl border px-4 py-2 text-sm font-semibold transition-all duration-200 ${
            mode === 'power-calc'
              ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200 shadow-[0_10px_30px_rgba(6,182,212,0.15)]'
              : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200 hover:bg-slate-900'
          }`}
        >
          Power Calculator
        </button>
      </div>

      {mode === 'work-calc' && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2 items-center text-sm text-slate-400">
            <span>Solve for:</span>
            <ToggleGroup.Root
              type="single"
              value={workSolveFor}
              onValueChange={(value) => value && setWorkSolveFor(value as 'W' | 'F' | 'd')}
              className="flex flex-wrap gap-2"
            >
              <ToggleGroup.Item
                value="W"
                className={`rounded-3xl px-3 py-2 text-sm transition-all duration-200 border ${
                  workSolveFor === 'W'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
                }`}
              >
                W (Work)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="F"
                className={`rounded-3xl px-3 py-2 text-sm transition-all duration-200 border ${
                  workSolveFor === 'F'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
                }`}
              >
                F (Force)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="d"
                className={`rounded-3xl px-3 py-2 text-sm transition-all duration-200 border ${
                  workSolveFor === 'd'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
                }`}
              >
                d (Distance)
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {workSolveFor !== 'F' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
              <div className="text-sm text-slate-300">Force (N)</div>
              <div className="mt-2 font-mono text-xl text-cyan-300">{force}</div>
              <Slider.Root
                value={[force]}
                onValueChange={(values) => setForce(values[0])}
                max={200}
                step={1}
                className="relative flex items-center w-full h-5 mt-4"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-cyan-300 border border-slate-700 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]" />
              </Slider.Root>
            </div>
          )}

          {workSolveFor !== 'd' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
              <div className="text-sm text-slate-300">Distance (m)</div>
              <div className="mt-2 font-mono text-xl text-cyan-300">{distance}</div>
              <Slider.Root
                value={[distance]}
                onValueChange={(values) => setDistance(values[0])}
                max={50}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-4"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-cyan-300 border border-slate-700 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]" />
              </Slider.Root>
            </div>
          )}

          {workSolveFor !== 'W' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
              <div className="text-sm text-slate-300">Work (J)</div>
              <div className="mt-2 font-mono text-xl text-cyan-300">{work}</div>
              <Slider.Root
                value={[work]}
                onValueChange={(values) => setWork(values[0])}
                max={5000}
                step={10}
                className="relative flex items-center w-full h-5 mt-4"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-cyan-300 border border-slate-700 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]" />
              </Slider.Root>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-slate-300 shadow-sm">
            <div className="text-sm">
              Formula: {workSolveFor === 'W' && 'W = F × d'}
              {workSolveFor === 'F' && 'F = W / d'}
              {workSolveFor === 'd' && 'd = W / F'}
            </div>
            <div className="mt-4 font-mono text-2xl text-cyan-300">
              {workSolveFor === 'W' && `W = ${calculateWork().toFixed(2)} J`}
              {workSolveFor === 'F' && `F = ${calculateWork().toFixed(2)} N`}
              {workSolveFor === 'd' && `d = ${calculateWork().toFixed(2)} m`}
            </div>
          </div>
        </div>
      )}

      {mode === 'power-calc' && (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2 items-center text-sm text-slate-400">
            <span>Solve for:</span>
            <ToggleGroup.Root
              type="single"
              value={powerSolveFor}
              onValueChange={(value) => value && setPowerSolveFor(value as 'P' | 'W' | 't')}
              className="flex flex-wrap gap-2"
            >
              <ToggleGroup.Item
                value="P"
                className={`rounded-3xl px-3 py-2 text-sm transition-all duration-200 border ${
                  powerSolveFor === 'P'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
                }`}
              >
                P (Power)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="W"
                className={`rounded-3xl px-3 py-2 text-sm transition-all duration-200 border ${
                  powerSolveFor === 'W'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
                }`}
              >
                W (Work)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="t"
                className={`rounded-3xl px-3 py-2 text-sm transition-all duration-200 border ${
                  powerSolveFor === 't'
                    ? 'border-cyan-500 bg-cyan-500/15 text-cyan-200'
                    : 'border-slate-700 bg-slate-950 text-slate-300 hover:border-cyan-500 hover:text-cyan-200'
                }`}
              >
                t (Time)
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {powerSolveFor !== 'W' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
              <div className="text-sm text-slate-300">Work (J)</div>
              <div className="mt-2 font-mono text-xl text-cyan-300">{work}</div>
              <Slider.Root
                value={[work]}
                onValueChange={(values) => setWork(values[0])}
                max={5000}
                step={10}
                className="relative flex items-center w-full h-5 mt-4"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-cyan-300 border border-slate-700 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]" />
              </Slider.Root>
            </div>
          )}

          {powerSolveFor !== 't' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
              <div className="text-sm text-slate-300">Time (s)</div>
              <div className="mt-2 font-mono text-xl text-cyan-300">{time}</div>
              <Slider.Root
                value={[time]}
                onValueChange={(values) => setTime(values[0])}
                max={60}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-4"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-cyan-300 border border-slate-700 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]" />
              </Slider.Root>
            </div>
          )}

          {powerSolveFor !== 'P' && (
            <div className="rounded-3xl border border-slate-800 bg-slate-950 p-4 shadow-sm">
              <div className="text-sm text-slate-300">Power (W)</div>
              <div className="mt-2 font-mono text-xl text-cyan-300">{power}</div>
              <Slider.Root
                value={[power]}
                onValueChange={(values) => setPower(values[0])}
                max={1000}
                step={5}
                className="relative flex items-center w-full h-5 mt-4"
              >
                <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                  <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block h-5 w-5 rounded-full bg-cyan-300 border border-slate-700 shadow-[0_0_0_4px_rgba(6,182,212,0.12)]" />
              </Slider.Root>
            </div>
          )}

          <div className="rounded-3xl border border-slate-800 bg-slate-950 p-5 text-slate-300 shadow-sm">
            <div className="text-sm">
              Formula: {powerSolveFor === 'P' && 'P = W / t'}
              {powerSolveFor === 'W' && 'W = P × t'}
              {powerSolveFor === 't' && 't = W / P'}
            </div>
            <div className="mt-4 font-mono text-2xl text-cyan-300">
              {powerSolveFor === 'P' && `P = ${calculatePower().toFixed(2)} W`}
              {powerSolveFor === 'W' && `W = ${calculatePower().toFixed(2)} J`}
              {powerSolveFor === 't' && `t = ${calculatePower().toFixed(2)} s`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
