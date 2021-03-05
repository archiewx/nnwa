import { IModel } from './action';
export declare function getState<M extends IModel = IModel<any>, MS extends Record<string, M> = {
    [x: string]: M;
}>(ms: MS): { [k in keyof MS]: MS[k]["state"]; };
export declare type GenStateType<Func extends typeof getState> = ReturnType<Func>;
