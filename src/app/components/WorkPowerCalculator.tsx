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
    <div className="bg-gray-100 border border-black p-5">
      <h3 className="mb-4">Work and Power</h3>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('work-calc')}
          className={`px-4 py-2 border border-black ${
            mode === 'work-calc' ? 'bg-blue-600 text-white' : 'bg-white text-black'
          }`}
        >
          Work Calculator
        </button>
        <button
          onClick={() => setMode('power-calc')}
          className={`px-4 py-2 border border-black ${
            mode === 'power-calc' ? 'bg-gray-600 text-white' : 'bg-white text-black'
          }`}
        >
          Power Calculator
        </button>
      </div>

      {mode === 'work-calc' && (
        <div className="space-y-5">
          <div className="flex gap-2 items-center mb-6">
            <span className="text-sm">Solve for:</span>
            <ToggleGroup.Root
              type="single"
              value={workSolveFor}
              onValueChange={(value) => value && setWorkSolveFor(value as 'W' | 'F' | 'd')}
              className="flex gap-1"
            >
              <ToggleGroup.Item
                value="W"
                className={`px-3 py-1 border border-black text-sm ${
                  workSolveFor === 'W' ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                W (Work)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="F"
                className={`px-3 py-1 border border-black text-sm ${
                  workSolveFor === 'F' ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                F (Force)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="d"
                className={`px-3 py-1 border border-black text-sm ${
                  workSolveFor === 'd' ? 'bg-blue-600 text-white' : 'bg-white'
                }`}
              >
                d (Distance)
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {workSolveFor !== 'F' && (
            <div>
              <label className="text-sm">Force (N): {force}</label>
              <Slider.Root
                value={[force]}
                onValueChange={(values) => setForce(values[0])}
                max={200}
                step={1}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-300 relative grow h-2">
                  <Slider.Range className="absolute bg-blue-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {workSolveFor !== 'd' && (
            <div>
              <label className="text-sm">Distance (m): {distance}</label>
              <Slider.Root
                value={[distance]}
                onValueChange={(values) => setDistance(values[0])}
                max={50}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-300 relative grow h-2">
                  <Slider.Range className="absolute bg-blue-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {workSolveFor !== 'W' && (
            <div>
              <label className="text-sm">Work (J): {work}</label>
              <Slider.Root
                value={[work]}
                onValueChange={(values) => setWork(values[0])}
                max={5000}
                step={10}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-300 relative grow h-2">
                  <Slider.Range className="absolute bg-blue-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          <div className="bg-white border border-black p-4 mt-4">
            <div className="text-sm mb-2">
              Formula: {workSolveFor === 'W' && 'W = F × d'}
              {workSolveFor === 'F' && 'F = W / d'}
              {workSolveFor === 'd' && 'd = W / F'}
            </div>
            <div className="text-xl">
              {workSolveFor === 'W' && `W = ${calculateWork().toFixed(2)} J`}
              {workSolveFor === 'F' && `F = ${calculateWork().toFixed(2)} N`}
              {workSolveFor === 'd' && `d = ${calculateWork().toFixed(2)} m`}
            </div>
          </div>
        </div>
      )}

      {mode === 'power-calc' && (
        <div className="space-y-5">
          <div className="flex gap-2 items-center mb-6">
            <span className="text-sm">Solve for:</span>
            <ToggleGroup.Root
              type="single"
              value={powerSolveFor}
              onValueChange={(value) => value && setPowerSolveFor(value as 'P' | 'W' | 't')}
              className="flex gap-1"
            >
              <ToggleGroup.Item
                value="P"
                className={`px-3 py-1 border border-black text-sm ${
                  powerSolveFor === 'P' ? 'bg-gray-600 text-white' : 'bg-white'
                }`}
              >
                P (Power)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="W"
                className={`px-3 py-1 border border-black text-sm ${
                  powerSolveFor === 'W' ? 'bg-gray-600 text-white' : 'bg-white'
                }`}
              >
                W (Work)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="t"
                className={`px-3 py-1 border border-black text-sm ${
                  powerSolveFor === 't' ? 'bg-gray-600 text-white' : 'bg-white'
                }`}
              >
                t (Time)
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {powerSolveFor !== 'W' && (
            <div>
              <label className="text-sm">Work (J): {work}</label>
              <Slider.Root
                value={[work]}
                onValueChange={(values) => setWork(values[0])}
                max={5000}
                step={10}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-300 relative grow h-2">
                  <Slider.Range className="absolute bg-gray-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-gray-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {powerSolveFor !== 't' && (
            <div>
              <label className="text-sm">Time (s): {time}</label>
              <Slider.Root
                value={[time]}
                onValueChange={(values) => setTime(values[0])}
                max={60}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-300 relative grow h-2">
                  <Slider.Range className="absolute bg-gray-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-gray-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {powerSolveFor !== 'P' && (
            <div>
              <label className="text-sm">Power (W): {power}</label>
              <Slider.Root
                value={[power]}
                onValueChange={(values) => setPower(values[0])}
                max={1000}
                step={5}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-300 relative grow h-2">
                  <Slider.Range className="absolute bg-gray-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-gray-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          <div className="bg-white border border-black p-4 mt-4">
            <div className="text-sm mb-2">
              Formula: {powerSolveFor === 'P' && 'P = W / t'}
              {powerSolveFor === 'W' && 'W = P × t'}
              {powerSolveFor === 't' && 't = W / P'}
            </div>
            <div className="text-xl">
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
