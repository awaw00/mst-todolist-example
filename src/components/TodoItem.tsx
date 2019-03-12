import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TodoItemInstance } from '../models/TodoItem';
import { TodoFormInstance } from '../models/TodoForm';
import { TodoInput } from './TodoInput';

export interface IProps {
  todo: TodoItemInstance;
  editForm: TodoFormInstance;
  onRemove: (todoId: string) => void;
  onSaveEdit: () => void;
}

@observer
export class TodoItem extends React.Component<IProps> {
    public render() {
    const { todo, editForm, onRemove, onSaveEdit } = this.props;
    const editing = editForm.targetTodoId === todo.id;
    return (
      <li className={classNames('todo', { completed: todo.done, editing })}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={todo.done} onChange={e => todo.switchDone(e.target.checked)} />
          <label onDoubleClick={() => editForm.setTarget(todo)}>{todo.title}</label>
          <button className="destroy" onClick={() => onRemove(todo.id)}></button>
        </div>
        {editing && (
          <TodoInput
            model={editForm}
            className="edit"
            type="text"
            autoFocus
            onEnter={onSaveEdit}
            onCancel={editForm.reset}
          />
        )}
      </li>
    );
  }
}
