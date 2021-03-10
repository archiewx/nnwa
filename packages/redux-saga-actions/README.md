# @nnwa/redux-saga-actions

> 帮助 react 应用更容易使用数据流

## 使用

```bash
$ yarn add @nnwa/redux-saga-actions
```

<br />
### 真实使用

```ts
// store.js
import {
  createSaga,
  GenStateType,
  genUseReduxState,
  getState,
} from '@nnwa/redux-saga-actions';
import genStore from '@nnwa/redux-saga-actions/store';
import * as models from './models';

export const store = genStore(models);
const state = getState(models);
export type IState = typeof state;
export const useReduxState = genUseReduxState<IState>();
```

## 接口使用

<br />

### createActions

<br />
符合 `IModel` 定义可以自动生成 action 的模板

```ts
const model = {
  namespace: 'user',
  state: {},
  reducers: {},
  effects: {
    fetchUser() {},
  },
};

const actions = createActions(model);

actions.fetchUser(); // { type: 'user/fetchUser' }
```
