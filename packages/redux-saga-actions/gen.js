import { generate } from './es';
import genStore from './store';

export function wrapper(ms, options = { plugins: [] }) {
  return {
    store: genStore(ms, options.plugins),
    ...generate(ms),
  };
}
