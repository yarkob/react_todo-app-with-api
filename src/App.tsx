/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UserWarning } from './UserWarning';
import { getTodos, updateTodo, USER_ID } from './api/todos';
import { filterTodos, TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { FilterType } from './types/FilterType';
import { Todo } from './types/Todo';
import cs from 'classnames';
import { client } from './utils/fetchClient';

export enum Error {
  LoadTodos = 'Unable to load todos',
  EmptyTitle = 'Title should not be empty',
  AddTodo = 'Unable to add a todo',
  DeleteTodo = 'Unable to delete a todo',
  UpdateTodo = 'Unable to update a todo',
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState<FilterType>(FilterType.All);
  const [error, setError] = useState<Error | null>(null);
  const [query, setQuery] = useState('');
  const [tempTodo, setTempTodo] = useState<Todo | null>(null);
  const [processingTodos, setProcessingTodos] = useState<Todo['id'][]>([]);
  const [isToggled, setIsToggled] = useState(
    filterTodos(FilterType.Completed, todos).length === todos.length,
  );
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onFocusHeaderInput = () => {
    console.log(inputRef.current);

    inputRef.current?.focus();
  };

  useEffect(() => {
    getTodos()
      .then(data => setTodos(data))
      .catch(() => {
        setError(Error.LoadTodos);

        window.setTimeout(() => {
          setError(null);
        }, 3000);
      });
  }, []);

  if (!USER_ID) {
    return <UserWarning />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!query.trim()) {
      setError(Error.EmptyTitle);

      window.setTimeout(() => {
        setError(null);
      }, 3000);

      return;
    }

    const newTodo = {
      title: query.trim(),
      userId: USER_ID,
      completed: false,
    };

    let newId = 0;

    if (!todos.length) {
      newId = 1;
    } else {
      const previousId = [...todos].sort((a, b) => b.id - a.id)[0].id;

      newId = previousId ? previousId + 1 : 1;
    }

    setTempTodo({ ...newTodo, id: 0 });

    client
      .post('/todos', newTodo)
      .then(() => {
        setQuery('');
        setTodos([...todos, { ...newTodo, id: newId }]);
      })
      .catch(() => {
        setError(Error.AddTodo);

        window.setTimeout(() => {
          setError(null);
        }, 3000);
      })
      .finally(() => {
        setTempTodo(null);
        setTimeout(onFocusHeaderInput, 0);
      });
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const toggleAllHandler = () => {
    setIsToggled(!isToggled);

    const activeTodos = filterTodos(FilterType.Active, todos);
    const todosForUpdate = activeTodos.length ? activeTodos : todos;

    todosForUpdate.forEach(todo => {
      updateTodo({ ...todo, completed: !todo.completed })
        .then(updatedTodo => {
          setTodos(prevTodos =>
            prevTodos.map(t => (t.id === todo.id ? updatedTodo : t)),
          );
        })
        .catch(() => {
          setError(Error.UpdateTodo);

          window.setTimeout(() => {
            setError(null);
          }, 3000);
        })
        .finally(() =>
          setProcessingTodos(prev => prev.filter(id => id !== todo.id)),
        );
    });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (filterTodos(FilterType.Completed, todos).length === todos.length) {
      setIsToggled(true);
    } else {
      setIsToggled(false);
    }
  }, [todos]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        {/* Add header to another component */}
        <header className="todoapp__header">
          {/* this button should have `active` class only if all todos are completed */}
          {!!todos.length && (
            <button
              type="button"
              className={cs('todoapp__toggle-all', {
                active: isToggled,
              })}
              data-cy="ToggleAllButton"
              onClick={toggleAllHandler}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={handleChange}
              disabled={!!tempTodo}
              ref={inputRef}
              autoFocus
            />
          </form>
        </header>

        <TodoList
          filterBy={filterBy}
          todos={todos}
          setTodos={setTodos}
          tempTodo={tempTodo}
          setError={setError}
          setProcessingTodos={setProcessingTodos}
          processingTodos={processingTodos}
          isToggled={isToggled}
          setIsToggled={setIsToggled}
          onFocusHandlerInput={onFocusHeaderInput}
        />

        {/* Hide the footer if there are no todos */}
        {!!todos.length && (
          <Footer
            setFilterBy={setFilterBy}
            filterBy={filterBy}
            todos={todos}
            setTodos={setTodos}
            setError={setError}
            setProcessingTodos={setProcessingTodos}
            onFocusHeaderInput={onFocusHeaderInput}
          />
        )}
      </div>

      {/* DON'T use conditional rendering to hide the notification */}
      {/* Add the 'hidden' class to hide the message smoothly */}
      {/* Add errors to another components */}
      <div
        data-cy="ErrorNotification"
        className={cs(
          'notification is-danger is-light has-text-weight-normal',
          {
            hidden: !error,
          },
        )}
      >
        <button data-cy="HideErrorButton" type="button" className="delete" />
        {/* show only one message at a time */}
        <div>
          {error}
          <br />
        </div>
      </div>
    </div>
  );
};
