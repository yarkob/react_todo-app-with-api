import React, { useEffect } from 'react';
import { ErrorNotification, Header, TodoList } from './components';
import Footer from './components/Footer/Footer';
import { TodosError } from './constants';
import { getTodos } from './api/todos';
import useTodosContext from './contexts/useTodosContext';

export const TodoApp: React.FC = () => {
  const { todos, handleErrorMessage, setTodos, user } = useTodosContext();

  useEffect(() => {
    if (!user) {
      return;
    }

    getTodos(user.id)
      .then(loadedTodos => setTodos(loadedTodos))
      .catch(handleErrorMessage(TodosError.LOAD_TODOS));
  }, [handleErrorMessage, setTodos, user]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <Header />
        <TodoList />
        {!!todos.length && <Footer />}
      </div>
      <ErrorNotification />
    </div>
  );
};
