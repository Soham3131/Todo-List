"use client";
import { useEffect, useState, useRef } from "react";
import {
  getTodos,
  createTodo,
  deleteTodo,
  updateTodo,
} from "../../../lib/api";
import CreateTodoButton from "../../../components/CreateTodoButton";
import TodoList from "../../../components/TodoList";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import { BiLink, BiEdit } from "react-icons/bi";
import { AiOutlinePushpin } from "react-icons/ai";

export default function TodosPage() {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [search, setSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const searchInputRef = useRef(null);

  const fetchTodos = async (page = 1) => {
    const response = await getTodos({ page });
    setTodos(response.data);
    setTotalPages(response.totalPages);
    setCurrentPage(response.currentpage);
  };

  const handleCreate = async () => {
    const newTodo = await createTodo("Untitled", "No description");
    await fetchTodos(currentPage);
    setSelectedTodo(newTodo);
  };

  const handleDeleteFromList = async (id) => {
    await deleteTodo(id);
    await fetchTodos(currentPage);
    setSelectedTodo(null);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchClick = () => {
    setIsSearchFocused(true);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  const handleDeleteSelectedTodo = async () => {
    if (selectedTodo) {
      await deleteTodo(selectedTodo._id);
      await fetchTodos(currentPage);
      setSelectedTodo(null);
    }
  };

  const handleUpdateTodo = async () => {
    if (selectedTodo) {
      await updateTodo(selectedTodo._id, {
        title: editTitle,
        description: editDescription,
      });
      await fetchTodos(currentPage);
      const updatedTodo = todos.find((todo) => todo._id === selectedTodo._id);
      setSelectedTodo(updatedTodo);
    }
  };

  const handleBack = () => {
    setSelectedTodo(null);
  };

  useEffect(() => {
    fetchTodos(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (selectedTodo) {
      setEditTitle(selectedTodo.title || "");
      setEditDescription(selectedTodo.description || "");
    } else {
      setEditTitle("");
      setEditDescription("");
    }
  }, [selectedTodo]);

  console.log("Filtered todos:", filteredTodos);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen min-h-screen bg-gray-200">
      {/* LEFT PANE */}
      <div
        className={`w-full lg:w-1/3 p-4 bg-gray-200 ${
          selectedTodo ? "hidden" : "flex"
        } lg:flex flex-col h-screen max-h-screen overflow-hidden min-h-0`}
      >
        <div className="flex justify-between space-x-4 mb-4">
          <CreateTodoButton onCreate={handleCreate} />
          {!isSearchFocused ? (
            <button
              onClick={handleSearchClick}
              className="p-2 rounded-md focus:outline-none"
            >
              <FiSearch className="text-gray-400" size={28} />
            </button>
          ) : (
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search todos..."
              value={search}
              onChange={handleSearchChange}
              onBlur={handleSearchBlur}
              className="p-2 border rounded focus:outline-none "
            />
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-2 min-h-0">
          <TodoList
            todos={filteredTodos}
            onSelect={setSelectedTodo}
            selected={selectedTodo}
            onDelete={handleDeleteFromList}
          />
        </div>

        
      </div>

      {/* RIGHT PANE */}
      <div
        className={`w-full lg:w-2/3 p-4 ${selectedTodo ? "block" : "hidden"} lg:block h-full`}
      >
        <div className="bg-white p-6 rounded-md shadow-md h-full lg:max-h-full overflow-y-auto">
          {selectedTodo ? (
            <>
              {/* Back button  */}
              <div className="mb-4 lg:hidden">
                <button
                  onClick={handleBack}
                  className="text-black hover:underline focus:outline-none"
                >
                  ← Back
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="text-3xl font-bold focus:outline-none w-full"
                  />
                  <button
                    onClick={handleDeleteSelectedTodo}
                    className="text-red-500 hover:text-red-700 focus:outline-none ml-4"
                  >
                    <FiTrash2 size={24} />
                  </button>
                </div>

                <div className="flex items-center space-x-2 mt-5">
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <BiLink size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <BiEdit size={20} />
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                    <AiOutlinePushpin size={20} />
                  </button>
                </div>

                <div className="border mt-5" />

                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="mt-4 w-full focus:outline-none resize-none"
                  rows={5}
                />

                <button
                  onClick={handleUpdateTodo}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 focus:outline-none focus:shadow-outline"
                >
                  Update
                </button>
              </div>
            </>
          ) : (
            <p className="text-gray-500">Select a todo to view/edit</p>
          )}
        </div>
      </div>
    </div>
  );
}
