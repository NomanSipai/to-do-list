import { useEffect, useState } from "react";
import axios from "axios";
import loadingGif from "../assets/loading.gif";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const UpdateBox = ({ edit_id, setIsEditModal, getAllTodos }) => {
  const [updateTask, setUpdateTask] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (edit_id) {
      handleGetTodoById();
    }
  }, [edit_id]);

  const handleGetTodoById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-by-id/${edit_id}`);
      if (response?.status === 200) {
        setUpdateTask(response?.data?.task);
      }
    } catch (error) {
      toast.error(error?.message ?? "Error While Fetching Todo By Id");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatedTask = async () => {
    setLoading(true);
    try {
      if (edit_id) {
        const res = await axios.put(`${BASE_URL}/update-todo/${edit_id}`, {
          task: updateTask,
        });
        if (res.status === 200) {
          await getAllTodos();
          toast.success("Todo updated successfully");
        }
      }
    } catch (error) {
      toast.error(error?.message ?? "Error While Updating Todo");
    } finally {
      setLoading(false);
      setIsEditModal(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleUpdatedTask();
    }
  };

  return (
    <div className="overflow-y-auto overflow-x-hidden fixed inset-0 z-50 flex justify-center items-center">
      <div
        onClick={() => setIsEditModal(false)}
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
      />
      <div className="relative w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center pb-4 mb-4 border-b">
          <h3 className="text-2xl font-semibold text-[#4a694f]">Update Task</h3>
          <button
            type="button"
            className="text-[#4a694f] hover:text-white hover:bg-[#5f8765] rounded-full p-2"
            onClick={() => setIsEditModal(false)}>
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </button>
        </div>

        <form action="#">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700">
              Task
            </label>
            {loading ? (
              <div className="animate-pulse bg-gray-300 rounded-md h-10 w-full mt-2"></div>
            ) : (
              <input
                type="text"
                name="name"
                id="name"
                disabled={loading}
                className="mt-2 w-full p-3 border border-gray-300 rounded-md text-gray-900 text-sm focus:ring-[#4a694f] focus:border-[#4a694f]"
                placeholder="Update your Task ..."
                autoComplete="off"
                value={updateTask}
                onChange={(e) => setUpdateTask(e.target.value)}
                onKeyDown={handleKey}
              />
            )}
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="button"
              className="w-full sm:w-auto text-white bg-[#4a694f] hover:bg-[#5f8765] border border-transparent rounded-md px-5 py-2.5 text-lg font-semibold focus:ring-2 focus:ring-[#4a694f] focus:outline-none disabled:opacity-50"
              onClick={handleUpdatedTask}
              disabled={loading}>
              {loading ? (
                <img
                  height={30}
                  width={30}
                  src={loadingGif}
                  alt="loading-img"
                />
              ) : (
                "Update"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBox;
