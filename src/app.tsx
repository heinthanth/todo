import { useMemo, useState } from 'react';

import './app.sass';
import TodoList, { TodoItemProp } from './todolist';
import { v4 as uuid } from 'uuid';
import cx from 'classnames';
import Datepicker from 'react-tailwindcss-datepicker';
import TodoForm from './form';
import FilterSearch from './filtersearch';

function escapeStringForRegex(input: string): string {
  // prettier-ignore
  const regexSpecialCharacters = [
    '-', '[', ']', '/', '{', '}', '(', ')', '*', '+', '?', '.', '\\', '^', '$', '|'];
  const specialCharactersRegex = RegExp(
    '[' + regexSpecialCharacters.join('\\') + ']',
    'g'
  );
  return input.replace(specialCharactersRegex, '\\$&');
}

function App() {
  const [todos, setTodos] = useState<TodoItemProp[]>([
    {
      id: uuid(),
      name: 'something',
      completed: false,
      deadline: '2022-12-28',
    },
    {
      id: uuid(),
      name: 'another thing',
      completed: true,
      deadline: '2022-12-30',
    },
    {
      id: uuid(),
      name: 'please finish me',
      completed: false,
      deadline: '2022-12-18',
    },
  ]);

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredTodo = useMemo(() => {
    let filtered: TodoItemProp[] = todos;

    // process filter
    switch (statusFilter) {
      case 'completed': {
        filtered = filtered.filter((todo) => todo.completed);
        break;
      }
      case 'incompleted': {
        filtered = filtered.filter((todo) => !todo.completed);
        break;
      }
      default: {
        break;
      }
    }

    // process search on filter
    if (search.trim() !== '') {
      filtered = filtered.filter((todo) => {
        return todo.name.match(
          new RegExp(`.*${escapeStringForRegex(search)}.*`, 'gi')
        );
      });
    }
    return filtered;
  }, [search, todos, statusFilter]);

  return (
    <div className="max-w-[640px] p-4 mx-auto">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <hr className="my-6" />
      <FilterSearch
        search={search}
        setSearch={setSearch}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <TodoList todos={filteredTodo} setTodos={setTodos} />
      <hr className="my-6" />
      <TodoForm setTodos={setTodos} />
    </div>
  );
}

export default App;
