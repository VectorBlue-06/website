import { Sparkles, SparklesIcon } from 'lucide-react';
import { useEffects } from '../context/EffectsContext';
import './EffectsToggle.css';

export default function EffectsToggle() {
  const { effectsEnabled, toggleEffects } = useEffects();

  return (
    <button
      className={`effects-toggle ${effectsEnabled ? 'effects-on' : 'effects-off'}`}
      onClick={toggleEffects}
      aria-label={effectsEnabled ? 'Disable effects' : 'Enable effects'}
      title={effectsEnabled ? 'Turn off effects' : 'Turn on effects'}
    >
      <Sparkles size={16} />
      <span className="effects-label">{effectsEnabled ? 'FX' : 'FX'}</span>
    </button>
  );
}
