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
    let interval: ReturnType<typeof setInterval>;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 0.01);
      }, 10);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
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
    
    const animationDuration = 3 + (Math.random() - 0.5);

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
    <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-950 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.65)]">
      <header className="grid gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">
              Experimental Dynamics
            </p>
            <h3 className="text-3xl font-semibold text-slate-100">
              Wind-up Toy Simulation
            </h3>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300 shadow-inner">
            <span className="font-mono text-cyan-300">
              E_spring → KE → E_thermal
            </span>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-6 text-slate-400">
        Watch as spring energy (E_spring) transforms into kinetic energy (KE) and finally thermal energy (E_thermal) as the toy comes to a stop.
      </p>
      </header>

      <div ref={scope} className="relative min-h-[34rem] overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[inset_0_0_40px_rgba(15,23,42,0.45)]">
        <div className="absolute inset-x-5 bottom-6 h-0.5 bg-slate-800" />

        <motion.div
          id="toy"
          className="absolute bottom-6 left-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700 bg-slate-800 text-slate-100 shadow-[0_20px_50px_rgba(15,23,42,0.35)]"
        >
          <motion.div
            id="wind-key"
            className="relative flex h-16 w-16 items-center justify-center rounded-full bg-slate-900/95 text-cyan-300 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            animate={isWound && !isMoving ? { rotate: [0, 10, -10, 0] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            <RotateCw className="h-8 w-8" />
            <motion.div
              className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.45)]"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            className="absolute -bottom-1 left-1/2 flex -translate-x-1/2 gap-1"
            animate={isMoving ? { rotate: [0, 360] } : {}}
            transition={{ duration: 0.2, repeat: Infinity, ease: 'linear' }}
          >
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
          </motion.div>
        </motion.div>

        <div className="absolute left-5 top-5 grid gap-3">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300 shadow-sm">
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Spring energy
            </div>
            <div className="mt-2 font-mono text-xl text-cyan-300">{springEnergy.toFixed(1)} J</div>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-3 text-sm text-slate-300 shadow-sm">
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
              Thermal output
            </div>
            <div className="mt-2 font-mono text-xl text-orange-300">{thermalEnergy.toFixed(1)} J</div>
          </div>
        </div>

        <div className="absolute right-5 top-5 rounded-3xl border border-slate-800 bg-slate-900/90 px-4 py-4 text-slate-300 shadow-sm">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-500">
            <Timer className="h-4 w-4 text-cyan-300" />
            <span>Stopwatch</span>
          </div>
          <div className="mt-3 font-mono text-3xl text-slate-100">{elapsedTime.toFixed(2)}s</div>
          <div className="mt-2 text-sm text-slate-400">
            Power output <span className="font-semibold text-cyan-300">{elapsedTime > 0 ? `${(100 / elapsedTime).toFixed(2)} W` : '0.00 W'}</span>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4 text-slate-300 shadow-sm transition-all duration-200 hover:scale-[1.01]">
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Spring</div>
          <div className="mt-3 font-mono text-2xl text-cyan-300">{springEnergy.toFixed(0)}%</div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4 text-slate-300 shadow-sm transition-all duration-200 hover:scale-[1.01]">
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Kinetic</div>
          <div className="mt-3 font-mono text-2xl text-cyan-300">{kineticEnergy.toFixed(0)}%</div>
        </div>
        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-4 text-slate-300 shadow-sm transition-all duration-200 hover:scale-[1.01]">
          <div className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">Thermal</div>
          <div className="mt-3 font-mono text-2xl text-orange-300">{thermalEnergy.toFixed(0)}%</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <button
          onClick={windUp}
          disabled={isWound || isMoving}
          className="rounded-3xl border border-cyan-600 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:scale-[1.01] hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Wind Up
        </button>
        <button
          onClick={release}
          disabled={!isWound || isMoving}
          className="rounded-3xl border border-cyan-600 bg-cyan-500/10 px-4 py-3 text-sm font-semibold text-cyan-200 transition-all duration-200 hover:scale-[1.01] hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Release
        </button>
        <button
          onClick={reset}
          disabled={isMoving}
          className="rounded-3xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-200 transition-all duration-200 hover:scale-[1.01] hover:border-slate-600 hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}