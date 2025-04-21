

export default function CreateTodoButton({ onCreate }) {
  return (
    <button
      onClick={onCreate}
      className=" mb-3 bg-black text-white py-3 px-4 rounded"
    >
       + Todo
    </button>
  );
}
