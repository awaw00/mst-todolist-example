import { types, cast, Instance } from 'mobx-state-tree';
import { TodoItem } from './TodoItem';
import { TodoForm } from './TodoForm';
import { TodoFilterType } from '../enums';
import uuid from 'uuid/v1';

export const TodoList = types
  .model('TodoList', {
    adderForm: types.optional(TodoForm, {}),
    editorForm: types.optional(TodoForm, {}),
    list: types.array(TodoItem),
    filterType: types.optional(types.string, TodoFilterType.All),
  })
  .views(self => ({
    get doneList() {
      return self.list.filter(i => i.done);
    },
    get activeList() {
      return self.list.filter(i => !i.done);
    },
    get isAllDone() {
      return this.doneList.length === self.list.length;
    },
    get activeCount() {
      return this.activeList.length;
    },
    get showList() {
      switch (self.filterType) {
        case TodoFilterType.Active:
          return this.activeList;
        case TodoFilterType.Completed:
          return this.doneList;
        default:
          return self.list;
      }
    },
    get isShowMain() {
      return self.list.length > 0;
    },
    get hasDoneTodos() {
      return this.doneList.length > 0;
    }
  }))
  .actions(self => ({
    switchAllDone(done?: boolean) {
      if (typeof done !== 'boolean') {
        done = !self.isAllDone;
      }
      self.list.forEach(item => {
        item.switchDone(done);
      });
    },
    setFilterType(filterType: TodoFilterType) {
      self.filterType = filterType;
    },
    addTodo() {
      if (self.adderForm.valid) {
        self.list.push(cast({
          id: uuid(),
          title: self.adderForm.trimedValue,
          done: false
        }));
        self.adderForm.reset();
      }
    },
    updateTodo() {
      if (self.editorForm.valid) {
        const item = self.list.find(i => i.id === self.editorForm.targetTodoId);
        if (item) {
          item.title = self.editorForm.trimedValue;
        }
        self.editorForm.reset();
      }
    },
    removeTodo(todoId: string) {
      const index = self.list.findIndex(i => i.id === todoId);
      if (index >= 0) {
        self.list.splice(index, 1);
      }
    },
    clearDone() {
      self.list = cast(self.list.filter(i => !i.done));
    }
  }));

export type TodoListInstance = Instance<typeof TodoList>;
