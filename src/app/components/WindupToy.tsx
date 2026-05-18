import { useState, useEffect } from 'react';
import { motion, useAnimate } from 'motion/react';
import { RotateCw, Timer } from 'lucide-react';

export function WindupToy() {
  const [scope, animate] = useAnimate();
  const [isWound, setIsWound] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [springEnergy, setSpringEnergy] = useState(0);
  const [kineticEnergy, setKineticEnergy] = useState(0);
  const [thermalEnergy, setThermalEnergy] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 0.01);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const windUp = async () => {
    setIsWound(true);
    setSpringEnergy(100);
    setKineticEnergy(0);
    setThermalEnergy(0);

    await animate(
      '#wind-key',
      { rotate: [0, 360, 720] },
      { duration: 1, ease: 'easeInOut' }
    );
  };

  const release = async () => {
    if (!isWound) return;

    setIsMoving(true);
    setElapsedTime(0);
    setIsTimerRunning(true);
    const totalEnergy = springEnergy;
    const animationDuration = 3;

    await animate(
      '#toy',
      { x: [0, 300] },
      {
        duration: animationDuration,
        ease: 'easeOut',
        onUpdate: (latest) => {
          const progress = (latest as number) / 300;
          const currentKE = totalEnergy * (1 - progress) * 0.8;
          const currentSpring = totalEnergy * (1 - progress) * 0.2;
          const currentThermal = totalEnergy * progress;

          setSpringEnergy(currentSpring);
          setKineticEnergy(currentKE);
          setThermalEnergy(currentThermal);
        },
      }
    );

    setIsTimerRunning(false);
    setSpringEnergy(0);
    setKineticEnergy(0);
    setThermalEnergy(100);
    setIsMoving(false);
    setIsWound(false);
  };

  const reset = async () => {
    await animate('#toy', { x: 0 }, { duration: 0.5 });
    setSpringEnergy(0);
    setKineticEnergy(0);
    setThermalEnergy(0);
    setIsWound(false);
    setIsMoving(false);
    setElapsedTime(0);
    setIsTimerRunning(false);
  };

  return (
    <div className="bg-gray-100 border border-black p-5">
      <h3 className="mb-4">Wind-up Toy Animation</h3>
      <p className="text-sm mb-4">
        Watch as spring energy (E_spring) transforms into kinetic energy (KE) and finally thermal energy (E_thermal) as the toy comes to a stop.
      </p>

      <div ref={scope} className="relative h-48 bg-white border border-black overflow-hidden mb-4">
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300" />

        <motion.div
          id="toy"
          className="absolute bottom-4 left-8 w-20 h-20 bg-blue-600 border border-black flex items-center justify-center"
        >
          <motion.div
            id="wind-key"
            className="text-white relative"
            animate={isWound && !isMoving ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <RotateCw className="w-10 h-10" />
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-blue-600 border border-black"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1"
            animate={isMoving ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="w-2 h-2 bg-gray-300 border border-black" />
            <div className="w-2 h-2 bg-gray-300 border border-black" />
          </motion.div>
        </motion.div>

        <div className="absolute top-4 left-4 space-y-1">
          <div className="text-xs">
            <span className="text-blue-600">E_spring:</span> {springEnergy.toFixed(1)} J
          </div>
          <div className="text-xs">
            <span className="text-blue-600">KE:</span> {kineticEnergy.toFixed(1)} J
          </div>
          <div className="text-xs">
            <span className="text-orange-400">E_thermal:</span> {thermalEnergy.toFixed(1)} J
          </div>
        </div>

        <div className="absolute top-4 right-4 bg-white border border-black px-3 py-2">
          <div className="flex items-center gap-2 mb-1">
            <Timer className="w-4 h-4 text-blue-600" />
            <span className="text-xs">Stopwatch</span>
          </div>
          <div className="text-lg">
            {elapsedTime.toFixed(2)}s
          </div>
          <div className="text-xs mt-1">
            Power: {elapsedTime > 0 ? (100 / elapsedTime).toFixed(2) : '0.00'} W
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Spring Energy</span>
            <span>{springEnergy.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-300 border border-black overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              style={{ width: `${springEnergy}%` }}
              animate={{ width: `${springEnergy}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Kinetic Energy</span>
            <span>{kineticEnergy.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-300 border border-black overflow-hidden">
            <motion.div
              className="h-full bg-blue-600"
              style={{ width: `${kineticEnergy}%` }}
              animate={{ width: `${kineticEnergy}%` }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span>Thermal Energy</span>
            <span>{thermalEnergy.toFixed(0)}%</span>
          </div>
          <div className="h-2 bg-gray-300 border border-black overflow-hidden">
            <motion.div
              className="h-full bg-orange-500"
              style={{ width: `${thermalEnergy}%` }}
              animate={{ width: `${thermalEnergy}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={windUp}
          disabled={isWound || isMoving}
          className="px-4 py-2 bg-blue-600 text-white border border-black hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Wind Up
        </button>
        <button
          onClick={release}
          disabled={!isWound || isMoving}
          className="px-4 py-2 bg-blue-600 text-white border border-black hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Release
        </button>
        <button
          onClick={reset}
          disabled={isMoving}
          className="px-4 py-2 bg-white hover:bg-gray-100 border border-black disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
