import React from 'react';
import { TodoApp } from './TodoApp';
import Login from './components/Login';
import useTodosContext from './contexts/useTodosContext';

export const App: React.FC = () => {
  const { user } = useTodosContext();

  return <>{user ? <TodoApp /> : <Login />}</>;
};
