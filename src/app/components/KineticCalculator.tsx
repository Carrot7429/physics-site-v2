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
    <div className="bg-white border border-black p-5">
      <h3 className="mb-4 text-black">Kinetic Energy Sandbox</h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <div className="flex gap-2 items-center mb-6">
            <span className="text-sm text-black">Solve for:</span>
            <ToggleGroup.Root
              type="single"
              value={solveFor}
              onValueChange={(value) => value && setSolveFor(value as 'KE' | 'm' | 'v')}
              className="flex gap-1"
            >
              <ToggleGroup.Item
                value="KE"
                className={`px-3 py-1 border border-black text-sm ${
                  solveFor === 'KE' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                KE
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
                value="v"
                className={`px-3 py-1 border border-black text-sm ${
                  solveFor === 'v' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-black'
                }`}
              >
                v (Velocity)
              </ToggleGroup.Item>
            </ToggleGroup.Root>
          </div>

          {solveFor !== 'm' && (
            <div>
              <label className="text-sm text-black">Mass (kg): {mass}</label>
              <Slider.Root
                value={[mass]}
                onValueChange={(values) => setMass(values[0])}
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

          {solveFor !== 'v' && (
            <div>
              <label className="text-sm text-black">Velocity (m/s): {velocity}</label>
              <Slider.Root
                value={[velocity]}
                onValueChange={(values) => setVelocity(values[0])}
                max={30}
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

          {solveFor !== 'KE' && (
            <div>
              <label className="text-sm text-black">Kinetic Energy (J): {ke}</label>
              <Slider.Root
                value={[ke]}
                onValueChange={(values) => setKe(values[0])}
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
              Formula: {solveFor === 'KE' && 'KE = ½mv²'}
              {solveFor === 'm' && 'm = 2KE / v²'}
              {solveFor === 'v' && 'v = √(2KE / m)'}
            </div>
            <div className="text-xl">
              {solveFor === 'KE' && `KE = ${calculate().toFixed(2)} J`}
              {solveFor === 'm' && `m = ${calculate().toFixed(2)} kg`}
              {solveFor === 'v' && `v = ${calculate().toFixed(2)} m/s`}
            </div>
          </div>
        </div>

        <div className="relative h-64 bg-gray-100 border border-black overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-300" />
          <motion.div
            key={`${mass}-${velocity}-${ke}-${solveFor}`}
            className="absolute bottom-2 w-12 h-12 bg-blue-600 border border-black flex items-center justify-center"
            animate={{
              left: ['10%', '80%', '10%'],
            }}
            transition={{
              duration: Math.max(0.5, 10 / Math.max(1, getCurrentVelocity())),
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="text-xs text-white">{getCurrentMass().toFixed(1)}kg</div>
          </motion.div>
          <div className="absolute top-4 left-4 text-xs text-black">
            Velocity: {getCurrentVelocity().toFixed(1)} m/s
          </div>
        </div>
      </div>
    </div>
  );
}
