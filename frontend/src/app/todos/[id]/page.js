"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getTodo } from "../../../../lib/api";
import TodoDetails from "../../../../components/TodoDetails";

export default function TodoPage() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTodo = async () => {
      const response = await getTodo(id);
      setTodo(response);
      setLoading(false);
    };
    fetchTodo();
  }, [id]);

  if (loading) return <p className="p-4 text-gray-500">Loading...</p>;
  if (!todo) return <p className="p-4 text-red-500">Todo not found.</p>;

  return (
    <div className="p-4">
      <TodoDetails todo={todo} refresh={() => {}} />
    </div>
  );
}
