export * from './es';
import { exports } from './es';

export function wrapper(ms) {
  return {
    store: genStore(ms),
    ...exports(ms),
  };
}
