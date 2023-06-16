import { QueryFunctionContext, useQuery } from 'react-query';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

const fetchTodos = async (context: QueryFunctionContext) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  return res.json() as Promise<Todo[]>;
};

export function useTodos() {
  return useQuery('todos', fetchTodos);
}
