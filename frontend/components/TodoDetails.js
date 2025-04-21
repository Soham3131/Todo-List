"use client";
import { useState } from "react";
import { updateTodo, deleteTodo } from "../lib/api";
import { useRouter } from "next/navigation";

export default function TodoDetails({ todo, refresh }) {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const router = useRouter();

  const handleUpdate = async () => {
    await updateTodo(todo._id, { title, description });
    refresh();
  };

  const handleDelete = async () => {
    await deleteTodo(todo._id);
    refresh();
    router.refresh();
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full border p-2 text-lg font-bold"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2"
        rows={6}
        
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="space-x-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
       
      </div>
    </div>
  );
}
