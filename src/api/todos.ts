import { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 836;

export const getTodos = () => {
  return client.get<Todo[]>(`/todos?userId=${USER_ID}`);
};

export const updateTodo = (todo: Todo) => {
  return client.patch<Todo>(`/todos/${todo.id}`, todo);
};
// https://mate.academy/students-api
// Add more methods here
