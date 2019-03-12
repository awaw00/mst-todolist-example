import { types, Instance } from 'mobx-state-tree';
import { TodoItemInstance } from './TodoItem';

export const TodoForm = types
  .model('TodoForm', {
    value: types.optional(types.string, ''),
    targetTodoId: types.optional(types.maybeNull(types.string), null),
  })
  .views(self => ({
    get trimedValue () {
      return self.value.trim();
    },
    get valid() {
      return this.trimedValue.length > 0;
    }
  }))
  .actions(self => ({
    setTarget(target: TodoItemInstance) {
      self.value = target.title;
      self.targetTodoId = target.id;
    },
    update(value: string) {
      self.value = value;
    },
    reset() {
      self.value = '';
      self.targetTodoId = null;
    }
  }));

export type TodoFormInstance = Instance<typeof TodoForm>;
