import { createActions, IActionWithPayload } from '../es';

const user = {
  namespace: 'user',

  state: {
    name: '',
    age: 10,
  },

  reducers: {
    updateUser(
      state,
      payload: IActionWithPayload<{ age: number; name: string }>
    ) {
      return { ...state };
    },

    some(state) {
      return { ...state };
    },
  },

  effects: {
    *login() {
      return '';
    },

    *init(action: IActionWithPayload<{ flag: boolean }>) {
      return action.payload.flag;
    },
  },
};

const userActions = createActions(user);

console.log(userActions.login());
console.log(userActions.some());
console.log(userActions.updateUser({ age: 1, name: 'zs' }));
console.log(userActions.init({ flag: true }));
