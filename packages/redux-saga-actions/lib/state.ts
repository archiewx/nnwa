import { useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
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

export function genUseReduxState<S>() {
  return <T extends any = S>(cb?: (state: S) => T): T extends S ? S : T => {
    return useSelector<S, T>(cb ? cb : (state) => state as any) as any;
  };
}

export const useReduxDispatch = <T = any, P = any>() => {
  return (useDispatch() as any) as (action: Action<P>) => PromiseLike<T>;
};
