import { Store } from 'redux';
import { IModel } from './es';

export interface WrapperOptions {
  plugins: any[];
}
export interface IWrapperExport<
  T extends Record<string, IModel> = Record<string, IModel>
> {
  store: Store;
  state: { [k in keyof T]: T[k]['state'] };
  useReduxState: <S extends unknown = { [k in keyof T]: T[k]['state'] }>(
    cb?: ((state: { [k in keyof T]: T[k]['state'] }) => S) | undefined
  ) => S extends { [k in keyof T]: T[k]['state'] }
    ? { [k in keyof T]: T[k]['state'] }
    : S;
}
export function wrapper<
  T extends Record<string, IModel> = Record<string, IModel>
>(ms: T, options?: WrapperOptions): IWrapperExport<T>;
