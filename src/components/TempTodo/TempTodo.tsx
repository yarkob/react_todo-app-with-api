import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types';

interface Props {
  tempTodo: Todo;
}

const TempTodo: FC<Props> = ({ tempTodo }) => {
  const { title, completed } = tempTodo;

  return (
    <div data-cy="Todo" className={cn('todo', { completed })}>
      <label className="todo__status-label">
        {/* comment to make label work */}
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={completed}
          onChange={() => {}}
        />
      </label>

      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button type="button" className="todo__remove" data-cy="TodoDelete">
        ×
      </button>

      <div data-cy="TodoLoader" className="modal overlay is-active">
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TempTodo;
