import { useTodos } from "../api/useTodos";

export const TodoList = () => {
  const { data, isSuccess } = useTodos();

  return (
    <div>
      <h1>{isSuccess && data.length}</h1>
    </div>
  );
};
