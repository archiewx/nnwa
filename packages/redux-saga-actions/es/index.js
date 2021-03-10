import { useSelector, useDispatch } from 'react-redux';
import { combineReducers } from 'redux';
import { all, takeEvery } from 'redux-saga/effects';

function createActions(m) {
    var keys = Object.keys(m.effects || {}).concat(Object.keys(m.reducers || {}));
    var initialSpace = {
        setState: function (state) { return ({
            type: m.namespace + "/setState",
            payload: state,
        }); },
        reset: function () { return ({ type: m.namespace + "/reset" }); },
    };
    var actions = keys.reduce(function (acc, key) {
        acc[key] = function (payload) { return ({ type: m.namespace + "/" + key, payload: payload }); };
        return acc;
    }, initialSpace);
    return actions;
}

function getState(ms) {
    var allState = Object.keys(ms).reduce(function (acc, key) {
        acc[key] = ms[key]['state'];
        return acc;
    }, {});
    return allState;
}
function genUseReduxState() {
    return function (cb) {
        return useSelector(cb ? cb : function (state) { return state; });
    };
}
var useReduxDispatch = function () {
    return useDispatch();
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function createSaga(ms) {
    var effects = Object.keys(ms).reduce(function (efs, mEffectsName) {
        var mEffects = ms[mEffectsName].effects;
        efs = Object.keys(mEffects).reduce(function (efs, efKey) {
            var e = mEffects[efKey];
            efs[mEffectsName + "/" + efKey] = e;
            return efs;
        }, efs);
        return efs;
    }, {});
    function handleActions(handlers, initialState, namespace) {
        var reducers = Object.keys(handlers).map(function (type) {
            return function (state, action) {
                if (action.type === namespace + "/" + type) {
                    return handlers[type](state, action);
                }
                return state;
            };
        });
        var reducer = function (state, action) {
            return reducers.reduce(function (s, r) {
                return r(s, action);
            }, state);
        };
        return function (state, action) {
            if (state === void 0) { state = initialState; }
            if (action.type === namespace + "/setState") {
                return Object.assign(state, action.payload);
            }
            if (action.type === namespace + "/reset") {
                return Object.assign(state, initialState);
            }
            return reducer(state, action);
        };
    }
    function getReducers() {
        var mReducers = Object.keys(ms).reduce(function (rds, namespace) {
            var m = ms[namespace];
            rds[namespace] = handleActions(m.reducers || {}, m.state, namespace);
            return rds;
        }, {});
        return combineReducers(__assign({}, mReducers));
    }
    function saga() {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, all(Object.keys(effects).map(function (key) {
                        return takeEvery(key, function (action) {
                            var ret, err_1;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, effects[action.type](action)];
                                    case 1:
                                        ret = _a.sent();
                                        action._resolve && action._resolve(ret);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_1 = _a.sent();
                                        console.error(err_1);
                                        action._reject && action._reject(err_1);
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }
    saga.effects = effects;
    saga.getReducers = getReducers;
    return saga;
}

var createPromiseMiddleware = function (_a) {
    var effects = _a.effects;
    return function () { return function (next) { return function (action) {
        if (effects[action.type]) {
            return new Promise(function (resolve, reject) {
                next(__assign({ _resolve: resolve, _reject: reject }, action));
            });
        }
        return next(action);
    }; }; };
};

export { createActions, createPromiseMiddleware, createSaga, genUseReduxState, getState, useReduxDispatch };
//# sourceMappingURL=index.js.map
