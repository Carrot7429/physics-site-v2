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
    <div className="bg-gray-100 border border-black p-5">
      <h3 className="mb-4">Spring/Elastic Station</h3>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setMode('elastic')}
          className={`px-4 py-2 border border-black ${
            mode === 'elastic'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-black'
          }`}
        >
          Elastic Energy
        </button>
        <button
          onClick={() => setMode('constant')}
          className={`px-4 py-2 border border-black ${
            mode === 'constant'
              ? 'bg-blue-600 text-white'
              : 'bg-white text-black'
          }`}
        >
          Spring Constant
        </button>
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
                  className="flex gap-1"
                >
                  <ToggleGroup.Item
                    value="E"
                    className={`px-3 py-1 border border-black text-sm ${
                      elasticSolveFor === 'E' ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                  >
                    E (Energy)
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="k"
                    className={`px-3 py-1 border border-black text-sm ${
                      elasticSolveFor === 'k' ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                  >
                    k (Constant)
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="x"
                    className={`px-3 py-1 border border-black text-sm ${
                      elasticSolveFor === 'x' ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                  >
                    x (Displacement)
                  </ToggleGroup.Item>
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
                    <Slider.Track className="bg-gray-300 relative grow h-2">
                      <Slider.Range className="absolute bg-blue-600 h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
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
                    <Slider.Track className="bg-gray-300 relative grow h-2">
                      <Slider.Range className="absolute bg-blue-600 h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
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
                    <Slider.Track className="bg-gray-300 relative grow h-2">
                      <Slider.Range className="absolute bg-blue-600 h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              <div className="bg-white border border-black p-4 mt-4">
                <div className="text-sm mb-2">
                  Formula: {elasticSolveFor === 'E' && 'E = ½kx²'}
                  {elasticSolveFor === 'k' && 'k = 2E / x²'}
                  {elasticSolveFor === 'x' && 'x = √(2E / k)'}
                </div>
                <div className="text-xl">
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
                    className={`px-3 py-1 border border-black text-sm ${
                      constantSolveFor === 'K' ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                  >
                    K (Constant)
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="F"
                    className={`px-3 py-1 border border-black text-sm ${
                      constantSolveFor === 'F' ? 'bg-blue-600 text-white' : 'bg-white'
                    }`}
                  >
                    F (Force)
                  </ToggleGroup.Item>
                  <ToggleGroup.Item
                    value="d"
                    className={`px-3 py-1 border border-black text-sm ${
                      constantSolveFor === 'd' ? 'bg-blue-600 text-white' : 'bg-white'
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
                    <Slider.Track className="bg-gray-300 relative grow h-2">
                      <Slider.Range className="absolute bg-blue-600 h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
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
                    <Slider.Track className="bg-gray-300 relative grow h-2">
                      <Slider.Range className="absolute bg-blue-600 h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
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
                    <Slider.Track className="bg-gray-300 relative grow h-2">
                      <Slider.Range className="absolute bg-blue-600 h-full" />
                    </Slider.Track>
                    <Slider.Thumb className="block w-5 h-5 bg-blue-600 border border-black cursor-pointer" />
                  </Slider.Root>
                </div>
              )}

              <div className="bg-white border border-black p-4 mt-4">
                <div className="text-sm mb-2">
                  Formula: {constantSolveFor === 'K' && 'K = F / d'}
                  {constantSolveFor === 'F' && 'F = K × d'}
                  {constantSolveFor === 'd' && 'd = F / K'}
                </div>
                <div className="text-xl">
                  {constantSolveFor === 'K' && `K = ${calculateConstant().toFixed(2)} N/m`}
                  {constantSolveFor === 'F' && `F = ${calculateConstant().toFixed(2)} N`}
                  {constantSolveFor === 'd' && `d = ${calculateConstant().toFixed(2)} m`}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative h-96 bg-gray-100 border border-black overflow-hidden flex flex-col items-center justify-between p-4">
          <div className="text-xs text-center pt-2">
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
            <div className="w-24 h-2 bg-black" />

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
                className="w-20 h-20 bg-blue-600 border border-black flex items-center justify-center"
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
              <div className="text-xs text-center bg-white px-2 py-1 border border-black">
                Scale: {getCurrentDisplacement().toFixed(2)}m (scaled to fit)
              </div>
            )}
            <div className="text-sm text-center bg-white px-4 py-2 border border-black">
              {mode === 'elastic' ? (
                <span>E = {calculateElastic().toFixed(2)} J</span>
              ) : (
                <span>K = {calculateConstant().toFixed(2)} N/m</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
