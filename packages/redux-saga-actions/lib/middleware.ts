import { Middleware } from 'redux';

export interface ICreatePromiseMiddlewareParams {
  effects: Record<string, any>;
}
export const createPromiseMiddleware: (
  option: ICreatePromiseMiddlewareParams
) => Middleware = ({ effects }) => () => (next) => (action) => {
  if (effects[action.type]) {
    return new Promise((resolve, reject) => {
      next({
        _resolve: resolve,
        _reject: reject,
        ...action,
      });
    });
  }
  return next(action);
};
