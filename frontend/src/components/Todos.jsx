import { useEffect, useState } from "react";
import AddTodo from "./AddTodo";
import AlertPopUp from "./AlertPopUp";
import axios from "axios";
import UpdateBox from "./UpdateBox";
import toast, { Toaster } from "react-hot-toast";
import NoData from "./NoData";
import TodoSkeleton from "./TodoSkeleton";
import TaskList from "./TaskList";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Todos = () => {
  const [index, setIndex] = useState(null);
  const [editIndex, setEditIndex] = useState(null);
  const [isEditModal, setIsEditModal] = useState(false);
  const [search, setSearch] = useState("");
  const [showAlertPopUp, setShowAlertPopUp] = useState(false);
  const [taskList, setTaskList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 5;

  useEffect(() => {
    let timer;

    if (search) {
      timer = setTimeout(() => {
        getAllTodos();
      }, 300);
    } else {
      getAllTodos();
    }

    return () => clearTimeout(timer);
  }, [currentPage, search]);

  const getAllTodos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all-todo`, {
        params: { page: currentPage, limit: itemsPerPage, search },
      });
      if (response.status === 200) {
        setTaskList(response.data.tasks);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      setError("Failed to fetch todos");
    } finally {
      setLoading(false);
    }
  };

  const handleTodoStatus = async (e, id) => {
    try {
      const res = await axios.put(`${BASE_URL}/change-todo-status/${id}`, {
        completed: e.target.checked,
      });
      if (res.status === 200) {
        await getAllTodos();
        toast.success("Status updated successfully");
      }
    } catch (error) {
      toast.error(error?.message ?? "Error while updating status");
    }
  };

  if (error)
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 rounded-md">
        <p className="font-medium">{error}</p>
      </div>
    );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <AddTodo getAllTodos={getAllTodos} />
      {isEditModal && (
        <UpdateBox
          setIsEditModal={setIsEditModal}
          getAllTodos={getAllTodos}
          edit_id={editIndex ? editIndex : null}
        />
      )}

      <div className={`md:w-3/4 me-auto ms-auto mt-5 bg-[#b4cab8] rounded`}>
        {showAlertPopUp && (
          <AlertPopUp
            getAllTodos={getAllTodos}
            setShowAlertPopUp={setShowAlertPopUp}
            todo_id={index ? index : null}
          />
        )}
        <div className="w-full bg-gradient-to-r from-[#99b79e] to-[#4a694f] p-4 rounded-lg flex justify-between items-center shadow-lg">
          <h1 className="text-white font-semibold text-2xl uppercase tracking-wide">
            Task List
          </h1>
          <input
            type="text"
            name="search"
            id="search"
            className="rounded-full border border-[#4a694f] focus:outline-none focus:ring-2 focus:ring-[#4a694f] py-2 px-6 text-gray-700 bg-white placeholder-gray-400 transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-opacity-80 w-64"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {taskList.length < 1 ? (
          <NoData />
        ) : (
          <div className="p-2">
            <div className="overflow-auto rounded-lg">
              <table className="w-full bg-white">
                <thead>
                  <tr className="bg-[#4a694f] text-white">
                    <th className="w-20 p-4 text-sm font-semibold tracking-wide text-left uppercase border-b-2 border-[#6b8c6b]">
                      Status
                    </th>
                    <th className="p-4 text-sm font-semibold tracking-wide text-left uppercase border-b-2 border-[#6b8c6b]">
                      Task
                    </th>
                    <th className="w-24 p-4 text-sm font-semibold tracking-wide text-left uppercase border-b-2 border-[#6b8c6b]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <>
                      <TodoSkeleton />
                      <TodoSkeleton />
                      <TodoSkeleton />
                      <TodoSkeleton />
                      <TodoSkeleton />
                    </>
                  ) : (
                    <TaskList
                      taskList={taskList}
                      handleTodoStatus={handleTodoStatus}
                      setEditIndex={setEditIndex}
                      setIsEditModal={setIsEditModal}
                      setShowAlertPopUp={setShowAlertPopUp}
                      setIndex={setIndex}
                    />
                  )}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button
                className={`px-4 py-2 bg-[#4a694f] text-white rounded-md transition-all hover:bg-[#6b8c6b] disabled:opacity-50`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}>
                Previous
              </button>

              <span className="text-sm text-gray-700 font-semibold">
                Page {currentPage} of {totalPages}
              </span>

              <button
                className={`px-4 py-2 bg-[#4a694f] text-white rounded-md transition-all hover:bg-[#6b8c6b] disabled:opacity-50`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Todos;
