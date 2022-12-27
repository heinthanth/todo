import cx from 'classnames';
import dayjs from 'dayjs/esm';
import { Dispatch, SetStateAction, useState } from 'react';
import Datepicker from 'react-tailwindcss-datepicker';
import { TodoItemProp } from './todolist';
import { v4 as uuid } from 'uuid';

function TodoForm({
  setTodos,
}: {
  setTodos: Dispatch<SetStateAction<TodoItemProp[]>>;
}) {
  const [isTouched, setTouched] = useState(false);
  const [name, setName] = useState('');
  const [deadline, setDeadline] = useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTodos((previousTodos) => {
          return [
            ...previousTodos,
            {
              id: uuid(),
              name,
              deadline,
              completed: false,
            },
          ];
        });
        setName('');
        setDeadline('');
      }}
    >
      <div className="flex items-center gap-x-4 mb-4">
        <input
          type="text"
          placeholder="enter new name"
          value={name}
          className={cx(
            'relative transition-all duration-300 py-2 pl-4 pr-14 w-full rounded-lg tracking-wide font-light placeholder-gray-400 bg-white outline-none ring-1 disabled:opacity-40 disabled:cursor-not-allowed',
            isTouched && name.trim() === '' ? 'ring-red-600' : 'ring-zinc-200'
          )}
          onChange={(event) => setName(event.target.value)}
          onFocus={() => setTouched(true)}
        />
        <div onFocus={() => setTouched(true)}>
          <Datepicker
            primaryColor="blue"
            useRange={false}
            asSingle={true}
            value={{
              startDate: deadline,
              endDate: deadline,
            }}
            onChange={(value) => {
              if (value && value.startDate && value.endDate) {
                setDeadline(dayjs(value.startDate).format('YYYY-MM-DD'));
              } else {
                setDeadline('');
              }
            }}
            inputClassName={cx(
              'relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-lg tracking-wide font-light text-md placeholder-gray-400 bg-white outline-none ring-1 disabled:opacity-40 disabled:cursor-not-allowed border-none focus:!ring-1 pointer-events-none [caret-color:transparent]',
              isTouched && deadline.trim() === ''
                ? 'ring-red-600 focus:ring-red-600'
                : 'ring-zinc-200 focus:ring-zinc-200'
            )}
          />
        </div>
      </div>
      <button
        disabled={!isTouched || name.trim() === '' || deadline.trim() === ''}
        type="submit"
        className="py-2.5 px-4 rounded-lg ring-1 ring-black hover:bg-black hover:text-white disabled:bg-zinc-300 disabled:ring-zinc-400 disabled:text-zinc-500 w-full"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
