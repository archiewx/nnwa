import { Store } from 'redux';
import { IModel } from './es';

export interface IWrapperExport<T> {
  store: Store;
  state: { [k in keyof T]: T[k]['state'] };
  useReduxState: <T_1 extends unknown = { [k in keyof T]: T[k]['state'] }>(
    cb?: ((state: { [k in keyof T]: T[k]['state'] }) => T_1) | undefined
  ) => T_1 extends { [k in keyof T]: T[k]['state'] }
    ? { [k in keyof T]: T[k]['state'] }
    : T_1;
}
export function wrapper<
  T extends Record<string, IModel> = Record<string, IModel>
>(ms: T): IWrapperExport<T>;
