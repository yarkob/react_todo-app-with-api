import { Todo } from '../types';
import { client } from '../utils';
import { User } from '../types/User';

export const getTodos = (userId: number) => {
  return client.get<Todo[]>(`/todos?userId=${userId}`);
};

export const addTodo = (title: string, userId: number) => {
  return client.post<Todo>('/todos', {
    userId,
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

export const addUser = (user: Omit<User, 'id'>) => {
  return client.post<Todo>('/users', user);
};

export const getUser = (email: string): Promise<User | null> => {
  return client
    .get<User[]>(`/users?email=${email}`)
    .then(res => res[0] || null);
};

// Add more methods here
