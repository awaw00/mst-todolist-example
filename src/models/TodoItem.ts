import { types, Instance } from 'mobx-state-tree';

export const TodoItem = types
  .model('TodoItem', {
    id: types.string,
    title: types.string,
    done: types.boolean,
  })
  .actions(self => ({
    switchDone(done?: boolean) {
      if (typeof done === 'boolean') {
        self.done = done;
      } else {
        self.done = !self.done;
      }
    }
  }));

export type TodoItemInstance = Instance<typeof TodoItem>;
