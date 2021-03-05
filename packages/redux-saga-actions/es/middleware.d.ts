import { Middleware } from 'redux';
export interface ICreatePromiseMiddlewareParams {
    effects: Record<string, any>;
}
export declare const createPromiseMiddleware: (option: ICreatePromiseMiddlewareParams) => Middleware;
