export interface IActionWithPayload<T = any> {
    type: string;
    payload: T;
}
export interface IEffect<P = any> {
    (action?: IActionWithPayload<P>, io?: any): any;
}
export interface IEffectWithoutAction {
    (): any;
}
export interface IReducer<S = any, P = any> {
    (state: S, action: IActionWithPayload<P>): S;
}
export interface IReducerWithoutAction<S = any> {
    (state: S): S;
}
export interface IModel<S = any> {
    namespace: string;
    state: S;
    effects: Record<string, any>;
    reducers: Record<string, IReducer<S>>;
}
export declare type ActionKey<M extends IModel> = keyof M['effects'] & keyof M['reducers'];
export declare type Payload<M extends IModel, K extends ActionKey<M>> = M['effects'][K] extends IEffectWithoutAction ? void : M['effects'][K] extends IEffect<infer P> ? P : M['reducers'][K] extends IReducerWithoutAction ? void : M['reducers'][K] extends IReducer<any, infer P> ? P : K extends 'setState' ? Partial<M['state']> : K extends 'reset' ? void : never;
export declare type DispatchAction<M extends IModel, K extends ActionKey<M>> = Payload<M, K> extends Record<string, any> ? (payload: Payload<M, K>) => {
    type: K;
    payload: Payload<M, K>;
} : () => {
    type: K;
};
export declare function createActions<M extends IModel>(m: M): { [key in keyof (M["effects"] & M["reducers"])]: DispatchAction<M, key>; } & {
    setState: DispatchAction<M, 'setState'>;
    reset: DispatchAction<M, 'reset'>;
};
