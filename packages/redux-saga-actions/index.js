export * from './es';
import { generate } from './es';

export function wrapper(ms) {
  return {
    store: genStore(ms),
    ...generate(ms),
  };
}
