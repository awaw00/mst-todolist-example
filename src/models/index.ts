import { types } from 'mobx-state-tree';
import { TodoList } from './TodoList';

export const Root = types
  .model('Root', {
    todoList: types.optional(TodoList, {}),
  });