import React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { TodoListInstance } from '../models/TodoList';
import { TodoItem } from './TodoItem';
import { TodoInput } from './TodoInput';
import { TodoFilterType } from '../enums';

export interface IProps {
  model: TodoListInstance;
}

@observer
export class TodoList extends React.Component<IProps> {
  public render() {
    const { model } = this.props;
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput
            model={model.adderForm}
            className="new-todo"
            autoFocus
            autoComplete="off"
            placeholder="What needs to be done?"
            onEnter={model.addTodo}
          />
        </header>
        <section className="main">
          {model.isShowMain && (
            <input className="toggle-all" type="checkbox" checked={model.isAllDone} onChange={e => model.switchAllDone(e.target.checked)} />
          )}
          <ul className="todo-list">
            {model.showList.map(i => (
              <TodoItem
                key={i.id}
                todo={i}
                editForm={model.editorForm}
                onRemove={model.removeTodo}
                onSaveEdit={model.updateTodo}
              />
            ))}
          </ul>
        </section>
        {model.isShowMain && (
          <footer className="footer">
            <span className="todo-count">
              <strong>{model.activeCount}</strong> items left
          </span>
            <ul className="filters">
              {
                Object.keys(TodoFilterType).map(i => (
                  <li key={i}>
                    <a
                      className={model.filterType === i && 'selected' || ''}
                      onClick={() => model.setFilterType(i as TodoFilterType)}
                    >
                      {i}
                    </a>
                  </li>
                ))
              }
            </ul>
            {model.hasDoneTodos && (
              <button className="clear-completed" onClick={model.clearDone}>
                Clear completed
              </button>
            )}
          </footer>
        )}
      </section>
    );
  }
}
