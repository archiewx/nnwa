import * as effects from 'redux-saga/effects';
import { IModel } from './action';
export declare function createSaga<M extends IModel<any>, MS extends Record<string, M>>(ms: MS): {
    (): Generator<effects.AllEffect<effects.ForkEffect<never>>, void, unknown>;
    effects: any;
    getReducers: () => import("redux").Reducer<import("redux").CombinedState<{
        [x: string]: unknown;
    }>, never>;
};
export declare const io: typeof effects;
