import { Action } from 'redux';
import { IModel } from './action';
export declare function getState<M extends IModel = IModel<any>, MS extends Record<string, M> = {
    [x: string]: M;
}>(ms: MS): { [k in keyof MS]: MS[k]["state"]; };
export declare type GenStateType<Func extends typeof getState> = ReturnType<Func>;
export declare function genUseReduxState<S>(): <T extends unknown = S>(cb?: ((state: S) => T) | undefined) => T extends S ? S : T;
export declare const useReduxDispatch: <T = any, P = any>() => (action: Action<P>) => PromiseLike<T>;
