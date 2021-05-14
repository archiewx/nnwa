import * as effects from 'redux-saga/effects';
import { IModel } from './action';
import { combineReducers } from 'redux';
import { all, takeEvery } from 'redux-saga/effects';

export function createSaga<M extends IModel<any>, MS extends Record<string, M>>(
  ms: MS
) {
  const effects = Object.keys(ms).reduce((efs, mEffectsName) => {
    const mEffects = ms[mEffectsName].effects;
    efs = Object.keys(mEffects).reduce((efs, efKey) => {
      const e = mEffects[efKey];
      efs[`${mEffectsName}/${efKey}`] = e;
      return efs;
    }, efs);
    return efs;
  }, {} as any);

  function handleActions(handlers: any, initialState: any, namespace: string) {
    const reducers = Object.keys(handlers).map((type) => {
      return (state: any, action: any) => {
        if (action.type === `${namespace}/${type}`) {
          return handlers[type](state, action);
        }
        return state;
      };
    });
    const reducer = (state: any, action: any) =>
      reducers.reduce((s, r) => {
        return r(s, action);
      }, state);
    return (state = initialState, action: any) => {
      if (action.type === `${namespace}/setState`) {
        return { ...state, ...action.payload };
      }

      if (action.type === `${namespace}/reset`) {
        return { ...state, ...initialState };
      }
      return reducer(state, action);
    };
  }

  function getReducers() {
    const mReducers = Object.keys(ms).reduce((rds, namespace) => {
      const m = ms[namespace];
      rds[namespace] = handleActions(m.reducers || {}, m.state, namespace);
      return rds;
    }, {} as any);
    return combineReducers({
      ...mReducers,
    });
  }

  function* saga() {
    yield all(
      Object.keys(effects).map((key) =>
        takeEvery(key, function* (action: any) {
          try {
            const ret = yield effects[action.type](action);
            action._resolve && action._resolve(ret);
          } catch (err) {
            console.error(err);
            action._reject && action._reject(err);
          }
        })
      )
    );
  }

  saga.effects = effects;
  saga.getReducers = getReducers;

  return saga;
}

export const io = effects;
