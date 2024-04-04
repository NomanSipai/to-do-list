import { useContext, useState } from "react";
import TodoContext from "../Context/TodoContext";
import AlertPopUp from "./AlertPopUp";

const Todos = () => {
  const [popUpItem, setPopUpItem] = useState("");
  const {
    completedTask,
    taskList,
    handleEditTask,
    handleChangeChecked,
    search,
    setSearch,
    showTable,
    showAlertPopUp,
    setAlertPopUp,
  } = useContext(TodoContext);

  return (
    <div
      className={` md:w-3/4 ${showTable} me-auto ms-auto mt-16 bg-[#b4cab8] mb-10 rounded`}>
      {showAlertPopUp && <AlertPopUp popUpItem={popUpItem} />}
      <div className="w-full bg-[#99b79e] font-bold text-xl p-3 flex justify-between items-center">
        TASK LIST
        <input
          type="text"
          name="price"
          id="price"
          className="rounded-md border outline outline-[#96b59c] focus:outline-[#4a694f] py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4a694f] sm:text-sm sm:leading-6 w-60"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="p-2">
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
              {taskList
                .filter((item) => {
                  return search.toLowerCase() === ""
                    ? item
                    : item.task.toLowerCase().includes(search);
                })
                .map((item) => {
                  return (
                    <tr
                      key={item.id}
                      className={item.completed ? "bg-[#78a07f]" : ""}>
                      <td className="p-3 text-sm text-gray-700">
                        <input
                          id="link-checkbox"
                          type="checkbox"
                          className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          value={completedTask}
                          onChange={() => handleChangeChecked(item)}
                        />
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {item.task}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <button
                          className="bg-[#99b79e] p-2 me-1"
                          onClick={() => handleEditTask(item)}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-pen-fill stroke fill-[black] cursor-pointer"
                            viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                            />
                          </svg>
                        </button>

                        <button
                          className="bg-[#99b79e] p-2 ms-1"
                          onClick={() =>
                            setAlertPopUp(true) || setPopUpItem(item)
                          }>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            className="bi bi-trash3-fill fill-[black] cursor-pointer"
                            viewBox="0 0 16 16">
                            <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Todos;
