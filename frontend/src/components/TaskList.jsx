import { useState } from "react";
import { motion } from "framer-motion";

const TaskList = ({
  taskList = [],
  handleTodoStatus,
  setEditIndex,
  setIsEditModal,
  setShowAlertPopUp,
  setIndex,
}) => {
  const [completedTasks, setCompletedTasks] = useState({});

  const handleCompletion = (e, taskId) => {
    handleTodoStatus(e, taskId);
    setCompletedTasks((prev) => ({ ...prev, [taskId]: e.target.checked }));
  };

  return (
    <>
      {taskList.map((item) => (
        <motion.tr
          key={item._id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={`p-4 rounded-xl shadow-md transition-all ${
            item.completed || completedTasks[item._id]
              ? "bg-opacity-90 bg-gradient-to-r from-green-200 to-green-300 backdrop-blur-lg"
              : "bg-white"
          }`}>
          <td className="p-3 text-sm text-gray-700">
            <motion.input
              type="checkbox"
              className="w-5 h-5 accent-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
              defaultChecked={item.completed}
              onChange={(e) => handleCompletion(e, item._id)}
              whileTap={{ scale: 0.8 }}
            />
          </td>
          <td
            className={`p-3 text-sm font-medium whitespace-nowrap transition-all ${
              item.completed || completedTasks[item._id]
                ? "line-through text-gray-500 opacity-75"
                : "text-gray-900"
            }`}>
            {item.task}
          </td>
          <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex gap-3">
            <motion.button
              className="p-2 rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 transition-all"
              onClick={() => {
                setEditIndex(item?._id);
                setIsEditModal(true);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              ✏️
            </motion.button>

            <motion.button
              className="p-2 rounded-full bg-red-500 text-white shadow-md hover:bg-red-600 transition-all"
              onClick={() => {
                setShowAlertPopUp(true);
                setIndex(item?._id);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              🗑
            </motion.button>
          </td>
        </motion.tr>
      ))}
    </>
  );
};

export default TaskList;
