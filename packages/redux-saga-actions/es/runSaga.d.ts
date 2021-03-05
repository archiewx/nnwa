import { IModel } from './action';
export declare function createSaga<M extends IModel<any>, MS extends Record<string, M>>(ms: MS): {
    (): Generator<import("redux-saga/effects").AllEffect<import("redux-saga/effects").ForkEffect<never>>, void, unknown>;
    effects: any;
    getReducers: () => import("redux").Reducer<import("redux").CombinedState<{
        [x: string]: unknown;
    }>, never>;
};
