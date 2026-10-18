import { useMemo, useState } from 'react';

/** Build a sorted array of { searchKey } for the visualization. */
const sampleKeys = [
  'apple', 'banana', 'cherry', 'grape', 'kiwi', 'lemon',
  'lion', 'lion cub', 'lion wildlife', 'mango', 'orange', 'peach',
].sort();

export default function AlgoVisualizer() {
  const [target, setTarget] = useState('lion');
  const [currentStep, setCurrentStep] = useState(null);

  const steps = useMemo(() => generateSteps(sampleKeys, target.trim().toLowerCase()), [target]);

  return (
    <div className="viz">
      <h3>Interactive Binary Search</h3>
      <p className="muted">
        Target: <input value={target} onChange={(e) => setTarget(e.target.value)} className="viz-input" />
      </p>
      <div className="viz-controls">
        <button className="btn-primary" onClick={() => setCurrentStep(0)} disabled={!steps.length}>
          Run
        </button>
        <button className="btn-secondary" onClick={() => setCurrentStep((s) => s == null ? 0 : Math.min(s + 1, steps.length - 1))} disabled={!steps.length}>
          Step
        </button>
        <button className="btn-secondary" onClick={() => setCurrentStep(null)}>Reset</button>
      </div>
      <div className="viz-array">
        {sampleKeys.map((k, i) => {
          const step = currentStep != null ? steps[currentStep] : null;
          const inRange = step ? i >= step.low && i <= step.high : true;
          const isMid = step ? i === step.mid : false;
          return (
            <div key={`${k}-${i}`} className={`viz-cell ${inRange ? 'active' : 'inactive'} ${isMid ? 'mid' : ''}`}>
              <span className="key">{k}</span>
              <span className="idx">{i}</span>
            </div>
          );
        })}
      </div>
      {currentStep != null && steps[currentStep] && (
        <div className="viz-log">
          <p><b>Step {currentStep + 1}/{steps.length}:</b></p>
          <p>low={steps[currentStep].low}, high={steps[currentStep].high}, mid={steps[currentStep].mid}</p>
          <p>Compare <code>{sampleKeys[steps[currentStep].mid]}</code> with <code>{target.toLowerCase()}</code>: {steps[currentStep].result}</p>
        </div>
      )}
    </div>
  );
}

/** Generates step-by-step binary search (lower-bound style) trace. */
function generateSteps(arr, target) {
  const steps = [];
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    const cmp = arr[mid] < target ? -1 : arr[mid] > target ? 1 : 0;
    steps.push({
      low, high, mid,
      result: cmp === 0 ? 'equal — match!' : cmp < 0 ? 'arr[mid] < target → move low' : 'arr[mid] > target → move high',
    });
    if (cmp === 0) break;
    if (cmp < 0) low = mid + 1; else high = mid - 1;
  }
  if (!steps.length) steps.push({ low: 0, high: arr.length - 1, mid: -1, result: 'empty range' });
  return steps;
}