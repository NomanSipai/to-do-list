import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Table = () => {
  const [taskList, setTaskList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;

  useEffect(() => {
    getAllTodos();
  }, [currentPage, search]);

  const getAllTodos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-todo`, {
        params: { page: currentPage, limit: itemsPerPage, search },
      });
      if (response.status === 200) {
        setTaskList(response.data.tasks);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const handleTodoStatus = async (e, id) => {
    try {
      await axios.put(`${BASE_URL}/change-todo-status/${id}`, {
        completed: e.target.checked,
      });
      toast.success("Status updated successfully");
      getAllTodos();
    } catch (error) {
      toast.error("Error while updating status");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-2">
      <Toaster position="top-center" reverseOrder={false} />
      <input
        type="text"
        className="w-full p-2 mb-4 border rounded"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="overflow-auto rounded-lg">
        <table className="w-full">
          <thead>
            <tr>
              <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                Status
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Task
              </th>
              <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {taskList.map((item) => (
              <tr
                key={item._id}
                className={`p-4 rounded ${
                  item.completed ? "bg-[#78a07f]" : ""
                }`}>
                <td className="p-3 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded"
                    defaultChecked={item.completed}
                    onChange={(e) => handleTodoStatus(e, item._id)}
                  />
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  {item.task}
                </td>
                <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                  <button className="bg-[#99b79e] p-2 me-1">Edit</button>
                  <button className="bg-[#99b79e] p-2 ms-1">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between mt-4">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span className="text-sm">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
