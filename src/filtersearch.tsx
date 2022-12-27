import { Dispatch, SetStateAction } from 'react';
import cx from 'classnames';

function FilterSearch({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
}: {
  search: string;
  statusFilter: string;
  setStatusFilter: Dispatch<SetStateAction<string>>;
  setSearch: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div className="search-and-filters mb-4">
      <div className="mb-8">
        {['all', 'completed', 'incompleted'].map((status) => {
          const isActive = status === statusFilter;

          return (
            <button
              key={status}
              onClick={() => setStatusFilter(isActive ? 'all' : status)}
              className={cx(
                'py-2 px-4 rounded-lg ring-1 text-sm ring-black mr-2',
                isActive
                  ? 'bg-black text-white'
                  : 'hover:bg-black hover:text-white'
              )}
            >
              {status}
            </button>
          );
        })}
      </div>
      <input
        type="text"
        placeholder="search"
        value={search}
        className={cx(
          'relative transition-all duration-300 py-2.5 pl-4 pr-14 w-full rounded-lg tracking-wide font-light placeholder-gray-400 bg-white outline-none ring-1 disabled:opacity-40 disabled:cursor-not-allowed ring-zinc-200'
        )}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

export default FilterSearch;