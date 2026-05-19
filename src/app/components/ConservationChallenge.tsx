import { useState } from 'react';
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { CheckCircle2, XCircle } from 'lucide-react';

type EnergyType = 'elastic' | 'kinetic' | 'potential' | 'thermal';

interface EnergyBar {
  id: string;
  type: EnergyType;
  value: number;
  color: string;
}

const DraggableBar = ({
  bar,
  position,
  onRemove
}: {
  bar: EnergyBar;
  position: 'before' | 'after';
  onRemove?: (id: string) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'energy-bar',
    item: { id: bar.id, type: bar.type, value: bar.value, position },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop && onRemove) {
        onRemove(item.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`rounded-[1.5rem] border border-slate-800 px-3 py-3 cursor-move transition-all ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
      style={{
        backgroundColor: bar.color,
        height: `${bar.value * 2}px`,
        minHeight: '40px',
      }}
    >
      <div className="text-xs font-semibold text-white">
        {bar.type === 'elastic' && 'E_elastic'}
        {bar.type === 'kinetic' && 'KE'}
        {bar.type === 'potential' && 'PE'}
        {bar.type === 'thermal' && 'E_thermal'}
      </div>
      <div className="text-xs text-white">{bar.value}J</div>
    </div>
  );
};

const DropZone = ({
  position,
  bars,
  onDrop,
  onRemove,
}: {
  position: 'before' | 'after';
  bars: EnergyBar[];
  onDrop: (item: any, position: 'before' | 'after') => void;
  onRemove: (id: string) => void;
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'energy-bar',
    drop: (item) => {
      onDrop(item, position);
      return { dropped: true };
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`rounded-[1.5rem] border-2 border-dashed p-6 min-h-[240px] transition-all ${
        isOver ? 'border-cyan-500/80 bg-slate-950/70' : 'border-slate-700 bg-slate-950/60'
      }`}
    >
      <div className="text-sm mb-6 pb-2 border-b border-slate-800 text-slate-300">
        {position === 'before' ? 'Before (Initial Energy)' : 'After (Final Energy)'}
      </div>
      <div className="flex gap-3 items-end min-h-[160px] flex-wrap">
        {bars.map((bar) => (
          <DraggableBar key={bar.id} bar={bar} position={position} onRemove={onRemove} />
        ))}
        {bars.length === 0 && (
          <div className="text-xs text-slate-500 flex items-center justify-center w-full h-full">
            Drop energy bars here
          </div>
        )}
      </div>
    </div>
  );
};

const BankBar = ({
  bar,
  onRemove
}: {
  bar: EnergyBar;
  onRemove: (id: string) => void;
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'energy-bar',
    item: { id: bar.id, type: bar.type, value: bar.value, position: 'bank' },
    end: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (didDrop) {
        onRemove(item.id);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`rounded-3xl px-4 py-2 border-2 cursor-grab transition-all ${
        isDragging ? 'opacity-40' : 'opacity-100'
      }`}
      style={{
        backgroundColor: `${bar.color}20`,
        borderColor: bar.color,
      }}
    >
      <div className="text-xs font-semibold" style={{ color: bar.color }}>
        {bar.type === 'elastic' && 'E_elastic'}
        {bar.type === 'kinetic' && 'KE'}
        {bar.type === 'potential' && 'PE'}
        {bar.type === 'thermal' && 'E_thermal'}
      </div>
      <div className="text-xs" style={{ color: bar.color }}>
        {bar.value} J
      </div>
    </div>
  );
};

export function ConservationChallenge() {
  const [beforeBars, setBeforeBars] = useState<EnergyBar[]>([
    { id: 'elastic-initial', type: 'elastic', value: 100, color: '#0ea5e9' },
  ]);

  const [afterBars, setAfterBars] = useState<EnergyBar[]>([]);

  const [bankBars, setBankBars] = useState<EnergyBar[]>([
    { id: 'bank-ke-60', type: 'kinetic', value: 60, color: '#a855f7' },
    { id: 'bank-pe-40', type: 'potential', value: 40, color: '#8b5cf6' },
    { id: 'bank-thermal-30', type: 'thermal', value: 30, color: '#f59e0b' },
    { id: 'bank-ke-70', type: 'kinetic', value: 70, color: '#a855f7' },
    { id: 'bank-elastic-50', type: 'elastic', value: 50, color: '#0ea5e9' },
    { id: 'bank-pe-30', type: 'potential', value: 30, color: '#8b5cf6' },
  ]);

  const handleDrop = (item: any, targetPosition: 'before' | 'after' | 'bank') => {
    const sourcePosition = item.position;

    if (sourcePosition === 'before') {
      setBeforeBars((bars) => bars.filter((bar) => bar.id !== item.id));
    } else if (sourcePosition === 'after') {
      setAfterBars((bars) => bars.filter((bar) => bar.id !== item.id));
    } else if (sourcePosition === 'bank') {
      setBankBars((bars) => bars.filter((bar) => bar.id !== item.id));
    }

    const newBar = { id: item.id, type: item.type, value: item.value, color: getColor(item.type) };

    if (targetPosition === 'before') {
      setBeforeBars((bars) => [...bars, newBar]);
    } else if (targetPosition === 'after') {
      setAfterBars((bars) => [...bars, newBar]);
    } else if (targetPosition === 'bank') {
      setBankBars((bars) => [...bars, newBar]);
    }
  };

  const handleRemoveFromBefore = (id: string) => {
    const removedBar = beforeBars.find((bar) => bar.id === id);
    if (removedBar) {
      setBeforeBars((bars) => bars.filter((bar) => bar.id !== id));
      setBankBars((bars) => [...bars, removedBar]);
    }
  };

  const handleRemoveFromAfter = (id: string) => {
    const removedBar = afterBars.find((bar) => bar.id === id);
    if (removedBar) {
      setAfterBars((bars) => bars.filter((bar) => bar.id !== id));
      setBankBars((bars) => [...bars, removedBar]);
    }
  };

  const handleRemoveFromBank = (id: string) => {
    // Already handled by handleDrop
  };

  const getColor = (type: EnergyType) => {
    const colors = {
      elastic: '#0ea5e9',
      kinetic: '#a855f7',
      potential: '#8b5cf6',
      thermal: '#f59e0b',
    };
    return colors[type];
  };

  const beforeTotal = beforeBars.reduce((sum, bar) => sum + bar.value, 0);
  const afterTotal = afterBars.reduce((sum, bar) => sum + bar.value, 0);
  const isCorrect = Math.abs(beforeTotal - afterTotal) < 0.01 && afterTotal > 0;

  const reset = () => {
    setBeforeBars([{ id: 'elastic-initial', type: 'elastic', value: 100, color: '#0ea5e9' }]);
    setAfterBars([]);
    setBankBars([
      { id: 'bank-ke-60', type: 'kinetic', value: 60, color: '#a855f7' },
      { id: 'bank-pe-40', type: 'potential', value: 40, color: '#8b5cf6' },
      { id: 'bank-thermal-30', type: 'thermal', value: 30, color: '#f59e0b' },
      { id: 'bank-ke-70', type: 'kinetic', value: 70, color: '#a855f7' },
      { id: 'bank-elastic-50', type: 'elastic', value: 50, color: '#0ea5e9' },
      { id: 'bank-pe-30', type: 'potential', value: 30, color: '#8b5cf6' },
    ]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="rounded-[2rem] border border-slate-800 bg-slate-950/95 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.6)]">
        <div className="grid gap-4 rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-6 mb-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/80">Energy Conservation Lab</p>
              <h3 className="text-3xl font-semibold text-slate-100">Conservation Challenge</h3>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-sm text-slate-300">
              Drag bars to balance before and after energy totals
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-400">
            Drag energy bars from the pool below to demonstrate that total mechanical energy remains conserved. Remove a bar by dragging it out of a zone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <DropZone
            position="before"
            bars={beforeBars}
            onDrop={handleDrop}
            onRemove={handleRemoveFromBefore}
          />
          <DropZone
            position="after"
            bars={afterBars}
            onDrop={handleDrop}
            onRemove={handleRemoveFromAfter}
          />
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 mb-6 shadow-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-3">
            <div className="text-sm text-slate-400">
              Before Total: <span className="font-semibold text-slate-100">{beforeTotal} J</span>
            </div>
            <div className="text-sm text-slate-400">
              After Total: <span className="font-semibold text-slate-100">{afterTotal} J</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span className="text-emerald-300">
                  Correct! Energy is conserved: {beforeTotal} J = {afterTotal} J
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-slate-500" />
                <span className="text-slate-400">
                  Keep trying! The totals must match.
                </span>
              </>
            )}
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/95 p-5 mb-4 shadow-sm">
          <div className="text-sm mb-4 flex items-center gap-2 text-slate-300">
            <div className="w-2 h-2 rounded-full bg-cyan-500" />
            Energy Bank (Drag bars from here; drag them out to return)
          </div>
          <div className="flex flex-wrap gap-3 min-h-[60px]">
            {bankBars.map((bar) => (
              <BankBar key={bar.id} bar={bar} onRemove={handleRemoveFromBank} />
            ))}
            {bankBars.length === 0 && (
              <div className="text-xs text-slate-500 flex items-center justify-center w-full">
                All bars in use - drag bars here to return them
              </div>
            )}
          </div>
        </div>

        <button
          onClick={reset}
          className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_20px_40px_rgba(34,211,238,0.18)] transition hover:bg-cyan-400"
        >
          Reset Challenge
        </button>
      </div>
    </DndProvider>
  );
}
