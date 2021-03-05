import { IModel } from './action';

export function getState<
  M extends IModel = IModel<any>,
  MS extends Record<string, M> = { [x: string]: M }
>(ms: MS) {
  const allState = Object.keys(ms).reduce((acc, key: keyof MS) => {
    acc[key] = ms[key]['state'];
    return acc;
  }, {} as { [k in keyof MS]: MS[k]['state'] });

  return allState;
}

export type GenStateType<Func extends typeof getState> = ReturnType<Func>;
