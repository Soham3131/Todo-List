import { MdDelete } from "react-icons/md";

export default function TodoCard({ todo, onClick, isSelected, onDelete }) {
  return (
    <div
      className={`flex items-center justify-between p-4  rounded shadow cursor-pointer ${
        isSelected ? "border" : "bg-white"
      }`}
    >
      <div onClick={onClick} className="flex-1">
        <h2 className="font-bold text-lg">{todo.title}</h2>
        <p className="text-sm text-gray-500">{todo.description}</p>
        <p className="text-xs text-gray-400  mt-1">
          {new Date(todo.date).toLocaleDateString()}
        </p>
      </div>
    
    </div>
  );
}
