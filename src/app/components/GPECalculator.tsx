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
    <div className="bg-white border border-black p-5">
      <h3 className="mb-4 text-black">Gravitational Potential Energy Lab</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="flex gap-2 items-center mb-6">
            <span className="text-sm text-black">Solve for:</span>
            <ToggleGroup.Root
              type="single"
              value={solveFor}
              onValueChange={(value) => value && setSolveFor(value as 'GPE' | 'm' | 'h')}
              className="flex gap-1"
            >
              <ToggleGroup.Item
                value="GPE"
                className={`px-3 py-1 border border-black text-sm ${
                  solveFor === 'GPE' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                GPE
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="m"
                className={`px-3 py-1 border border-black text-sm ${
                  solveFor === 'm' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                m (Mass)
              </ToggleGroup.Item>
              <ToggleGroup.Item
                value="h"
                className={`px-3 py-1 border border-black text-sm ${
                  solveFor === 'h' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                h (Height)
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {solveFor !== 'm' && (
            <div>
              <label className="text-sm text-black">Mass (kg): {mass}</label>
              <Slider.Root
                value={[mass]}
                onValueChange={(values) => setMass(values[0])}
                max={20}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-100 relative grow h-2 border border-black">
                  <Slider.Range className="absolute bg-blue-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {solveFor !== 'h' && (
            <div>
              <label className="text-sm text-black">Height (m): {height}</label>
              <Slider.Root
                value={[height]}
                onValueChange={(values) => setHeight(values[0])}
                max={20}
                step={0.5}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-100 relative grow h-2 border border-black">
                  <Slider.Range className="absolute bg-blue-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          {solveFor !== 'GPE' && (
            <div>
              <label className="text-sm text-black">GPE (J): {gpe}</label>
              <Slider.Root
                value={[Math.min(gpe, 100)]}
                onValueChange={(values) => setGpe(values[0])}
                max={4000}
                min={0}
                step={5}
                className="relative flex items-center w-full h-5 mt-2"
              >
                <Slider.Track className="bg-gray-100 relative grow h-2 border border-black">
                  <Slider.Range className="absolute bg-blue-600 h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
              </Slider.Root>
            </div>
          )}

          <div className="bg-gray-100 border border-black p-5">
            <div className="text-sm text-black mb-1">
              Formula: {solveFor === 'GPE' && 'GPE = mgh'}
              {solveFor === 'm' && 'm = GPE / (gh)'}
              {solveFor === 'h' && 'h = GPE / (gm)'}
            </div>
            <div className="text-xs text-black mb-2">(g = 10 m/s²)</div>
            <div className="text-2xl text-black">
              {solveFor === 'GPE' && `GPE = ${calculate().toFixed(2)} J`}
              {solveFor === 'm' && `m = ${calculate().toFixed(2)} kg`}
              {solveFor === 'h' && `h = ${calculate().toFixed(2)} m`}
            </div>
          </div>
        </div>

        <div className="relative h-64 bg-gray-100 border border-black overflow-hidden">
          <div className="absolute left-0 bottom-2 w-1 bg-black" style={{ height: '100%' }}>
            {getCurrentHeight() <= 20 ? (
              [0, 5, 10, 15, 20].map((h) => (
                <div
                  key={h}
                  className="absolute right-0 w-3 h-px bg-black"
                  style={{ bottom: `${(h / 20) * 100}%` }}
                >
                  <span className="absolute right-4 text-xs text-black -translate-y-1/2">
                    {h}m
                  </span>
                </div>
              ))
            ) : (
              Array.from({ length: 5 }, (_, i) => {
                const h = (getCurrentHeight() / 4) * i;
                return (
                  <div
                    key={i}
                    className="absolute right-0 w-3 h-px bg-black"
                    style={{ bottom: `${(i / 4) * 100}%` }}
                  >
                    <span className="absolute right-4 text-xs text-black -translate-y-1/2">
                      {h.toFixed(0)}m
                    </span>
                  </div>
                );
              })
            )}
          </div>
          <motion.div
            className="absolute left-0 right-0 bg-gray-100 transition-all border-t border-black"
            style={{
              height: '8px',
              bottom: 0,
            }}
          />
          <motion.div
            className="absolute w-10 h-10 bg-blue-600 border border-black"
            style={{
              left: '50%',
              bottom: `${(getVisualHeight() * getScaleFactor() / 20) * 92}%`,
              transform: 'translateX(-50%)',
            }}
            animate={{
              bottom: `${(getVisualHeight() * getScaleFactor() / 20) * 92}%`,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs text-white">{solveFor === 'm' ? calculate().toFixed(1) : mass}kg</span>
            </div>
          </motion.div>
          {getCurrentHeight() > 20 && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 text-xs text-black bg-white px-2 py-1 border border-black">
              Scale: {getCurrentHeight().toFixed(1)}m (max on screen)
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
