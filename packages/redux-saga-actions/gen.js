import { generate } from './es';
import genStore from './store';

export function wrapper(ms) {
  return {
    store: genStore(ms),
    ...generate(ms),
  };
}
