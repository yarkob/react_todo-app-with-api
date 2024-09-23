import { Todo } from '../types';
import { client } from '../utils';
import { User } from '../types/User';

export const USER_ID = 10389;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const addTodo = (title: string) => {
  return client.post<Todo>('/todos', {
    userId: USER_ID,
    completed: false,
    title,
  });
};

export const deleteTodo = (todoId: number) => {
  return client.delete(`/todos/${todoId}`);
};

export const updateTodo = (todoId: number, data: Omit<Todo, 'id'>) => {
  return client.patch<Todo>(`/todos/${todoId}`, data);
};

export const addUser = (user: User) => {
  return client.post<Todo>('/users', user);
};

// Add more methods here
