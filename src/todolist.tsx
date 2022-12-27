import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import dayjs from 'dayjs/esm';
import { BsCheck, BsPencil, BsTrash, BsX } from 'react-icons/bs';
import cx from 'classnames';
import Datepicker from 'react-tailwindcss-datepicker';

// type of Todo Item
export interface TodoItemProp {
  id: string;
  name: string;
  completed: boolean;
  deadline: string;
}

// props type of TodoList component
interface TodoListProp {
  todos: TodoItemProp[];
  setTodos: Dispatch<SetStateAction<TodoItemProp[]>>;
}

function TodoItem({
  setTodos,
  ...props
}: TodoItemProp & {
  setTodos: Dispatch<SetStateAction<TodoItemProp[]>>;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [editingNewName, setEditingNewName] = useState(props.name);
  const [editingNewDeadline, setEditingNewDeadline] = useState(props.deadline);

  const toggleComplete = (event: ChangeEvent<HTMLInputElement>) => {
    setTodos((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === props.id) {
          return { ...todo, completed: event.target.checked };
        }
        return todo;
      });
    });
  };

  const removeTodo = () => {
    setTodos((previousTodos) => {
      return previousTodos.filter((todo) => todo.id !== props.id);
    });
  };

  const updateTodo = () => {
    setTodos((previousTodos) => {
      return previousTodos.map((todo) => {
        if (todo.id === props.id) {
          return {
            ...todo,
            name: editingNewName,
            deadline: editingNewDeadline,
          };
        }
        return todo;
      });
    });
    setIsEdit(false);
  };

  return (
    <div className="flex gap-x-2 items-center py-2">
      <input
        type="checkbox"
        className={cx('w-8 h-8 rounded-lg checked:accent-black')}
        defaultChecked={props.completed}
        onChange={toggleComplete}
        disabled={
          isEdit ||
          (!props.completed && dayjs(props.deadline).isBefore(new Date()))
        }
      />
      <div className="flex flex-grow w-full items-center gap-x-4 px-2">
        <div className="flex-grow">
          {isEdit ? (
            <input
              type="text"
              placeholder="enter new name"
              defaultValue={props.name}
              className={cx(
                'relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-lg tracking-wide font-light placeholder-gray-400 bg-white outline-none ring-1 disabled:opacity-40 disabled:cursor-not-allowed',
                editingNewName.trim() === '' ? 'ring-red-600' : 'ring-zinc-200'
              )}
              onChange={(event) => setEditingNewName(event.target.value)}
            />
          ) : (
            <div
              className={cx(
                'py-2.5 text-md',
                props.completed && 'line-through',
                !props.completed &&
                  dayjs(props.deadline).isBefore(new Date()) &&
                  'text-red-600 line-through'
              )}
            >
              {props.name}
            </div>
          )}
        </div>
        <div
          className={cx(
            props.completed && 'line-through',
            !props.completed && dayjs(props.deadline).isBefore(new Date())
              ? 'text-red-400 line-through'
              : 'text-zinc-500'
          )}
        >
          {isEdit ? (
            <Datepicker
              primaryColor="blue"
              useRange={false}
              asSingle={true}
              value={{
                startDate: editingNewDeadline,
                endDate: editingNewDeadline,
              }}
              onChange={(value) => {
                if (value && value.startDate && value.endDate) {
                  setEditingNewDeadline(
                    dayjs(value.startDate).format('YYYY-MM-DD')
                  );
                } else {
                  setEditingNewDeadline('');
                }
              }}
              inputClassName={cx(
                'relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-lg tracking-wide font-light text-md placeholder-gray-400 bg-white outline-none ring-1 disabled:opacity-40 disabled:cursor-not-allowed border-none focus:!ring-1 pointer-events-none [caret-color:transparent]',
                editingNewDeadline.trim() === ''
                  ? 'ring-red-600 focus:ring-red-600'
                  : 'ring-zinc-200 focus:ring-zinc-200'
              )}
            />
          ) : (
            dayjs(props.deadline).format('YYYY-MM-DD')
          )}
        </div>
      </div>
      <div className="flex-grow-0 flex-shrink-0 space-x-2">
        {isEdit ? (
          <>
            <button
              className={cx(
                'p-2 ring-1 rounded-lg ring-black hover:bg-black hover:text-white inline-flex items-center justify-center disabled:bg-zinc-300 disabled:ring-zinc-400 disabled:text-zinc-500'
              )}
              disabled={
                editingNewName.trim() === '' || editingNewDeadline.trim() === ''
              }
              onClick={updateTodo}
            >
              <BsCheck />
            </button>
            <button
              onClick={() => {
                setIsEdit(false);
                setEditingNewName(props.name);
                setEditingNewDeadline(props.deadline);
              }}
              className="p-2 rounded-lg ring-1 ring-black hover:bg-black hover:text-white"
            >
              <BsX />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setIsEdit(true)}
              className={cx(
                'p-2 rounded-lg ring-1 ring-black hover:bg-black hover:text-white disabled:bg-zinc-300 disabled:ring-zinc-400 disabled:text-zinc-500'
              )}
              disabled={props.completed}
            >
              <BsPencil />
            </button>
            <button
              onClick={removeTodo}
              className="p-2 rounded-lg ring-1 ring-black hover:bg-black hover:text-white"
            >
              <BsTrash />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function TodoList({ todos, setTodos }: TodoListProp) {
  return (
    <div>
      <ul className="divide-y">
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <TodoItem setTodos={setTodos} {...todo} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default TodoList;
