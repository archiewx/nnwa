import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createSaga, createPromiseMiddleware } from './es';

const genStore = (ms) => {
  const saga = createSaga(ms);
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    // thunkMiddleware
    createPromiseMiddleware(saga.effects),
    sagaMiddleware,
  ];

  const enhancer = composeEnhancers(
    applyMiddleware(...middlewares)
    // other store enhancers if any
  );

  function configStore() {
    const store = createStore(saga.getReducers(), enhancer);
    sagaMiddleware.run(saga);
    return store;
  }

  const store = configStore();
  return store;
};

export default genStore;
