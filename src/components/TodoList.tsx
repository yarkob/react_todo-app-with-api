import { TodoItem } from './Todo';
import { Todo } from '../types/Todo';
import { FilterType } from '../types/FilterType';
import { Dispatch, SetStateAction } from 'react';
import { Error } from '../App';
import { filterTodos } from '../utils/filterTodos';
import { TempTodo } from './TempTodo';
export { filterTodos } from '../utils/filterTodos';

interface Props {
  filterBy: FilterType;
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  tempTodo: Todo | null;
  setError: Dispatch<SetStateAction<Error | null>>;
  setProcessingTodos: Dispatch<SetStateAction<Todo['id'][]>>;
  processingTodos: Todo['id'][];
  isToggled: boolean;
  setIsToggled: Dispatch<SetStateAction<boolean>>;
  onFocusHandlerInput: VoidFunction;
}

export const TodoList: React.FC<Props> = ({
  filterBy,
  todos,
  setTodos,
  tempTodo,
  setError,
  setProcessingTodos,
  processingTodos,
  isToggled,
  setIsToggled,
  onFocusHandlerInput,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {filterTodos(filterBy, todos).map((todo: Todo) => (
        <TodoItem
          key={todo.id}
          title={todo.title}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          setError={setError}
          setProcessingTodos={setProcessingTodos}
          processingTodos={processingTodos}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          onFocusHandlerInput={onFocusHandlerInput}
        />
      ))}
      {!!tempTodo && <TempTodo title={tempTodo.title} />}
    </section>
  );
};
