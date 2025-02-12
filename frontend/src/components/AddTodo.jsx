import axios from "axios";
import { useState } from "react";
import loadingGif from "../assets/loading.gif";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AddTodo = ({ getAllTodos }) => {
  const [task, setTask] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddTodo = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/create`, {
        task,
      });
      if (res.status === 201) {
        await getAllTodos();
        setTask("");
        toast.success("Todo created successfully");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error While Creating Todo");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <div className="w-full md:w-3/4 mx-auto">
      <div className="flex items-center justify-center mt-5 space-x-4">
        <input
          type="text"
          name="task"
          id="task"
          className="rounded-lg border border-[#96b59c] focus:ring-[#4a694f] focus:outline-none py-2 pl-6 pr-16 text-gray-800 bg-white placeholder-gray-400 shadow-md ring-1 ring-inset ring-gray-300 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 w-full md:w-80"
          placeholder="Enter your tasks..."
          autoComplete="off"
          disabled={loading}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className="bg-[#4a694f] text-white py-2 px-4 rounded-md hover:bg-[#5f8766] transition-all duration-300 ease-in-out flex items-center space-x-2 disabled:bg-opacity-50"
          onClick={handleAddTodo}
          disabled={loading}>
          {loading ? (
            <img height={30} width={30} src={loadingGif} alt="loading-img" />
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                className="bi bi-plus-lg fill-white"
                viewBox="0 0 16 16">
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
              <span className="font-semibold">Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
