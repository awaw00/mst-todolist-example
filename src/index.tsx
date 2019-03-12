import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Root } from './models';
import { ModelInjector } from './components/ModelInjector';
import './style.css';

import { TodoList } from './components/TodoList';

const root = Root.create({});

const ConnectedTodoList = () => (
  <ModelInjector>
    {(root) => <TodoList model={root.todoList} />}
  </ModelInjector>
);

function App() {
  return (
    <Provider root={root}>
      <ConnectedTodoList />
    </Provider>
  );
}

render(<App />, document.getElementById('root'));
