import { IModel } from './action';
export declare function generate<T extends Record<string, IModel> = Record<string, IModel>>(ms: T): {
    state: { [k in keyof T]: T[k]["state"]; };
    useReduxState: <T_1 extends unknown = { [k in keyof T]: T[k]["state"]; }>(cb?: ((state: { [k in keyof T]: T[k]["state"]; }) => T_1) | undefined) => T_1 extends { [k in keyof T]: T[k]["state"]; } ? { [k in keyof T]: T[k]["state"]; } : T_1;
};
