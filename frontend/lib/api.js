const BASE_URL = "http://localhost:5000/api/todos";


export const getTodos = async () => {
  const res = await fetch(`${BASE_URL}/getTodos`);
  return res.json();
};

export const getTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/getTodo`);
  return res.json();
};


export const createTodo = async (title, description) => {
  const res = await fetch(`${BASE_URL}/createTodo`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description }),
  });
  return res.json();
};


export const updateTodo = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}/updateTodo`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};


export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}/deleteTodo`, {
    method: "DELETE",
  });
  return res.json();
};
