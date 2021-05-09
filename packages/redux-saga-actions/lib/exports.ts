import { IModel } from './action';
import { genUseReduxState, getState } from './state';

export function generate<
  T extends Record<string, IModel> = Record<string, IModel>
>(ms: T) {
  const state = getState(ms);
  const useReduxState = genUseReduxState<typeof state>();

  return { state, useReduxState };
}
