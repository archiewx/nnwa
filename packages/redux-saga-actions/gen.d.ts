import { Store } from 'redux';
import { generate, IModel } from './es';

type GenerateReturn = ReturnType<typeof generate>;
export interface IWrapperExport<T> extends GenerateReturn<T> {
  store: Store;
}
export function wrapper<
  T extends Record<string, IModel> = Record<string, IModel>
>(ms: T): IWrapperExport<T>;
