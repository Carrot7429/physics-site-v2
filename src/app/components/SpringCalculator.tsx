import { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { motion } from 'motion/react';

export function SpringCalculator() {
  const [mode, setMode] = useState<'elastic' | 'constant'>('elastic');
  const [elasticSolveFor, setElasticSolveFor] = useState<'E' | 'k' | 'x'>('E');
  const [constantSolveFor, setConstantSolveFor] = useState<'K' | 'F' | 'd'>('K');

  const [springConstant, setSpringConstant] = useState(100);
  const [displacement, setDisplacement] = useState(0.5);
  const [elasticEnergy, setElasticEnergy] = useState(12.5);
  const [force, setForce] = useState(50);
  const [distance, setDistance] = useState(0.5);

  const calculateElastic = () => {
    if (elasticSolveFor === 'E') {
      return 0.5 * springConstant * displacement * displacement;
    } else if (elasticSolveFor === 'k') {
      return displacement !== 0 ? (2 * elasticEnergy) / (displacement * displacement) : 0;
    } else {
      return springConstant !== 0 ? Math.sqrt((2 * elasticEnergy) / springConstant) : 0;
    }
  };

  const calculateConstant = () => {
    if (constantSolveFor === 'K') {
      return distance !== 0 ? force / distance : 0;
    } else if (constantSolveFor === 'F') {
      return springConstant * distance;
    } else {
      return springConstant !== 0 ? force / springConstant : 0;
    }
  };

  const getCurrentDisplacement = () => {
    if (mode === 'elastic') {
      return elasticSolveFor === 'x' ? calculateElastic() : displacement;
    } else {
      return constantSolveFor === 'd' ? calculateConstant() : distance;
    }
  };

  const getCurrentSpringConstant = () => {
    if (mode === 'elastic' && elasticSolveFor === 'k') {
      return calculateElastic();
    } else if (mode === 'constant' && constantSolveFor === 'K') {
      return calculateConstant();
    } else {
      return springConstant;
    }
  };

  const getScaleFactor = () => {
    const displacement = getCurrentDisplacement();
    if (displacement <= 2) return 1;
    return 2 / displacement;
  };

  const getVisualDisplacement = () => {
    return getCurrentDisplacement() * getScaleFactor();
  };

  return (
    <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
      <div className="grid gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Spring Mechanics</p>
            <h3 className="text-3xl font-semibold text-slate-100">Elastic Lab Station</h3>
          </div>
          <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
            <span className="font-mono text-cyan-300">E = ½kx² • F = kd</span>
          </div>
        </div>
        <p className="text-sm leading-6 text-slate-400">
          Toggle between elastic energy and spring constant mode, then tune the parameters in a precision dark lab panel.
        </p>
      </div>

      <div className="mt-6 flex gap-2 mb-6">
        {(['elastic', 'constant'] as const).map((option) => (
          <button
            key={option}
            onClick={() => setMode(option)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === option
                ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                : 'bg-slate-950/70 text-slate-300 border border-slate-800'
            }`}
          >
            {option === 'elastic' ? 'Elastic Energy' : 'Spring Constant'}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          {mode === 'elastic' && (
            <>
              <div className="flex gap-2 items-center mb-6">
                <span className="text-sm">Solve for:</span>
                  <ToggleGroup.Root
                  type="single"
                  value={elasticSolveFor}
                  onValueChange={(value) => value && setElasticSolveFor(value as 'E' | 'k' | 'x')}
                  className="flex flex-wrap gap-2"
                >
                  {(['E', 'k', 'x'] as const).map((value) => (
                    <ToggleGroup.Item
                      key={value}
                      value={value}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                        elasticSolveFor === value
                          ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                          : 'bg-slate-950/70 text-slate-300 border border-slate-800'
                      }`}
                    >
                      {value === 'E'
                        ? 'E (Energy)'
                        : value === 'k'
                        ? 'k (Constant)'
                        : 'x (Displacement)'}
                    </ToggleGroup.Item>
                  ))}
                </ToggleGroup.Root>
              </div>

              {elasticSolveFor !== 'k' && (
                <div>
                  <label className="text-sm">
                    Spring Constant k (N/m): {springConstant}
                  </label>
                  <Slider.Root
                    value={[springConstant]}
                    onValueChange={(values) => setSpringConstant(values[0])}
                    max={500}
                    step={5}
                    className="relative flex items-center w-full h-5 mt-2"
                  >
                    <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                      <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              {elasticSolveFor !== 'x' && (
                <div>
                  <label className="text-sm">
                    Displacement x (m): {displacement}
                  </label>
                  <Slider.Root
                    value={[displacement]}
                    onValueChange={(values) => setDisplacement(values[0])}
                    max={2}
                    step={0.1}
                    className="relative flex items-center w-full h-5 mt-2"
                  >
                    <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                      <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              {elasticSolveFor !== 'E' && (
                <div>
                  <label className="text-sm">
                    Elastic Energy (J): {elasticEnergy}
                  </label>
                  <Slider.Root
                    value={[elasticEnergy]}
                    onValueChange={(values) => setElasticEnergy(values[0])}
                    max={500}
                    step={1}
                    className="relative flex items-center w-full h-5 mt-2"
                  >
                    <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                      <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 mt-4 shadow-sm">
                <div className="text-sm text-slate-400 mb-2">
                  Formula: {elasticSolveFor === 'E' && 'E = ½kx²'}
                  {elasticSolveFor === 'k' && 'k = 2E / x²'}
                  {elasticSolveFor === 'x' && 'x = √(2E / k)'}
                </div>
                <div className="text-3xl font-semibold text-slate-100">
                  {elasticSolveFor === 'E' && `E = ${calculateElastic().toFixed(2)} J`}
                  {elasticSolveFor === 'k' && `k = ${calculateElastic().toFixed(2)} N/m`}
                  {elasticSolveFor === 'x' && `x = ${calculateElastic().toFixed(2)} m`}
                </div>
              </div>
            </>
          )}

          {mode === 'constant' && (
            <>
              <div className="flex gap-2 items-center mb-6">
                <span className="text-sm">Solve for:</span>
                <ToggleGroup.Root
                  type="single"
                  value={constantSolveFor}
                  onValueChange={(value) => value && setConstantSolveFor(value as 'K' | 'F' | 'd')}
                  className="flex gap-1"
                >
                  <ToggleGroup.Item
                    value="K"
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      constantSolveFor === 'K'
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                        : 'bg-slate-950/70 text-slate-300 border border-slate-800'
                    }`}
                  >
                    K (Constant)
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="F"
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      constantSolveFor === 'F'
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                        : 'bg-slate-950/70 text-slate-300 border border-slate-800'
                    }`}
                  >
                    F (Force)
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="d"
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      constantSolveFor === 'd'
                        ? 'bg-cyan-500 text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.18)]'
                        : 'bg-slate-950/70 text-slate-300 border border-slate-800'
                    }`}
                  >
                    d (Distance)
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </div>

              {constantSolveFor !== 'F' && (
                <div>
                  <label className="text-sm">Force (N): {force}</label>
                  <Slider.Root
                    value={[force]}
                    onValueChange={(values) => setForce(values[0])}
                    max={500}
                    step={5}
                    className="relative flex items-center w-full h-5 mt-2"
                  >
                    <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                      <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              {constantSolveFor !== 'd' && (
                <div>
                  <label className="text-sm">Distance (m): {distance}</label>
                  <Slider.Root
                    value={[distance]}
                    onValueChange={(values) => setDistance(values[0])}
                    max={2}
                    step={0.1}
                    className="relative flex items-center w-full h-5 mt-2"
                  >
                    <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                      <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              {constantSolveFor !== 'K' && (
                <div>
                  <label className="text-sm">
                    Spring Constant k (N/m): {springConstant}
                  </label>
                  <Slider.Root
                    value={[springConstant]}
                    onValueChange={(values) => setSpringConstant(values[0])}
                    max={500}
                    step={5}
                    className="relative flex items-center w-full h-5 mt-2"
                  >
                    <Slider.Track className="bg-slate-800 relative grow h-2 rounded-full">
                      <Slider.Range className="absolute bg-cyan-500 h-full rounded-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.25)] cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 mt-4 shadow-sm">
                <div className="text-sm text-slate-400 mb-2">
                  Formula: {constantSolveFor === 'K' && 'K = F / d'}
                  {constantSolveFor === 'F' && 'F = K × d'}
                  {constantSolveFor === 'd' && 'd = F / K'}
                </div>
                <div className="text-3xl font-semibold text-slate-100">
                  {constantSolveFor === 'K' && `K = ${calculateConstant().toFixed(2)} N/m`}
                  {constantSolveFor === 'F' && `F = ${calculateConstant().toFixed(2)} N`}
                  {constantSolveFor === 'd' && `d = ${calculateConstant().toFixed(2)} m`}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative h-96 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 overflow-hidden p-4">
          <div className="text-xs text-slate-400 text-center pt-2">
            {mode === 'elastic' && (
              <>
                k = {getCurrentSpringConstant().toFixed(1)} N/m |
                x = {getCurrentDisplacement().toFixed(2)} m
              </>
            )}
            {mode === 'constant' && (
              <>
                K = {getCurrentSpringConstant().toFixed(1)} N/m |
                d = {getCurrentDisplacement().toFixed(2)} m
              </>
            )}
          </div>

          <div className="flex flex-col items-center justify-start flex-1 pt-4">
            <div className="w-24 h-2 rounded-full bg-slate-800" />

            <div className="relative flex flex-col items-center" style={{ marginTop: '4px' }}>
              <svg width="100" height="140" viewBox="0 0 100 140" className="block">
                <defs>
                  <pattern
                    id="spring-coil"
                    patternUnits="userSpaceOnUse"
                    width="20"
                    height={10 + getVisualDisplacement() * 5}
                  >
                    <path
                      d="M 10 0 Q 4 2.5, 10 5 T 10 10"
                      stroke="#0ea5e9"
                      strokeWidth={Math.max(2.5, Math.min(7, getCurrentSpringConstant() / 40))}
                      fill="none"
                      strokeLinecap="round"
                    />
                  </pattern>
                </defs>

                <motion.rect
                  x="46"
                  y="0"
                  width="8"
                  height="100"
                  fill="url(#spring-coil)"
                  animate={{
                    height: 100 + getVisualDisplacement() * 40,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              </svg>

              <motion.div
                className="w-20 h-20 rounded-full bg-cyan-500 text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.25)] flex items-center justify-center"
                style={{
                  cursor: mode === 'elastic' && elasticSolveFor !== 'x' ? 'grab' : 'default',
                  marginTop: '-2px',
                }}
                animate={{
                  y: getVisualDisplacement() * 40,
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                drag={mode === 'elastic' && elasticSolveFor !== 'x' ? "y" : false}
                dragConstraints={{ top: 0, bottom: 80 }}
                dragElastic={0.05}
                onDrag={(event, info) => {
                  if (mode === 'elastic' && elasticSolveFor !== 'x') {
                    const newDisplacement = Math.max(0, Math.min(2, info.offset.y / 40));
                    setDisplacement(parseFloat(newDisplacement.toFixed(2)));
                  }
                }}
              >
                <div className="text-xs text-white text-center">
                  {mode === 'elastic' && elasticSolveFor !== 'x' ? (
                    <>Drag<br/>me!</>
                  ) : (
                    <>Visual<br/>Model</>
                  )}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="space-y-2">
            {getCurrentDisplacement() > 2 && (
              <div className="text-xs text-center rounded-full border border-slate-700 bg-slate-950/90 px-2 py-1 text-slate-300">
                Scale: {getCurrentDisplacement().toFixed(2)}m (scaled to fit)
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
