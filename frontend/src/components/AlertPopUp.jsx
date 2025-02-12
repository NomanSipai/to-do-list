import { useEffect, useState } from "react";
import axios from "axios";
import loadingGif from "../assets/loading.gif";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const AlertPopUp = ({ todo_id, setShowAlertPopUp, getAllTodos }) => {
  const [task, setTask] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (todo_id) {
      handleGetTodoById();
    }
  }, [todo_id]);

  const handleGetTodoById = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/get-by-id/${todo_id}`);
      if (response.status === 200) {
        setTask(response.data);
      } else {
        throw new Error("Error While Fetching Todo By Id");
      }
    } catch (error) {
      throw new Error(error?.message ?? "Error While Fetching Todo By Id");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`${BASE_URL}/delete-todo/${todo_id}`);
      if (res.status === 200) {
        await getAllTodos();
        toast.success("Todo deleted successfully");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error While Deleting Todo");
    } finally {
      setLoading(false);
      setShowAlertPopUp(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center p-4 bg-black bg-opacity-50"
      onClick={() => setShowAlertPopUp(false)}
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true">
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="bg-red-50 p-6 rounded-t-lg">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 flex items-center justify-center rounded-full bg-red-100">
              <svg
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Are you sure you want to delete this task?
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Task: <strong>{task.task}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-b-lg flex justify-end space-x-4">
          <button
            type="button"
            className="text-sm text-gray-900 bg-white border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100 focus:outline-none"
            onClick={() => setShowAlertPopUp(false)}>
            No, Cancel
          </button>
          <button
            type="button"
            className="text-sm text-white bg-red-600 px-6 py-2 rounded-md hover:bg-red-500 focus:outline-none"
            onClick={handleDeleteTodo}>
            {loading ? (
              <img height={30} width={30} src={loadingGif} alt="loading-img" />
            ) : (
              "Yes, I'm sure"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertPopUp;
