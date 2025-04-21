import TodoCard from "./TodoCard";

export default function TodoList({ todos, onSelect, selected, onDelete }) {
  return (
    <div className="space-y-2">
      {todos.map((todo) => (
        <TodoCard
          key={todo._id}
          todo={todo}
          onClick={() => onSelect(todo)}
          isSelected={selected?._id === todo._id}
          onDelete={() => onDelete(todo._id)}
        />
      ))}
    </div>
  );
}
