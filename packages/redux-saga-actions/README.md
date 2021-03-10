# @nnwa/redux-saga-actions

> 帮助 react 应用更容易使用数据流

## 使用

```bash
$ yarn add @nnwa/redux-saga-actions
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
