import { useContext } from "react";
import TodoContext from "../Context/TodoContext";

const Todos = () => {
  const {
    completedTask,
    taskList,
    deleteTask,
    handleEditTask,
    handleChangeChecked,
  } = useContext(TodoContext);

  return (
    <div className=" w-3/4 me-auto ms-auto mt-16 bg-[#b4cab8] px-5 py-3 mb-10 rounded ">
      <div className="bg-[#99b79e] font-bold text-xl px-2 py-2 mb-5">
        TaskList
      </div>
      <div className="flex flex-col">
        <div className="-m-1.5 overflow-x-auto">
          <div className="p-1.5 min-w-full inline-block align-middle">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-base font-medium uppercase">
                      Completed Task
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-base font-medium uppercase">
                      Id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-start text-base font-medium uppercase">
                      Tasks
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-end text-base font-medium uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {taskList.map((item) => {
                    return (
                      <tr
                        key={item.id}
                        className={item.completed ? "bg-[#78a07f]" : ""}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium ">
                          <div className="flex items-center ">
                            <div className="bg-[#e5f1ff] text-center flex p-2">
                              <input
                                id="link-checkbox"
                                type="checkbox"
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
                                value={completedTask}
                                onChange={() => handleChangeChecked(item)}
                              />
                            </div>
                            <label
                              htmlFor="link-checkbox"
                              className="ms-2 text-sm font-medium">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="currentColor"
                                className="bi bi-check2-circle stroke-black"
                                viewBox="0 0 16 16">
                                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                              </svg>
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {item.id}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-lg">
                          {item.task}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                          <button
                            className="bg-[#eaeffa] p-2 me-1"
                            onClick={() => handleEditTask(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-pen-fill stroke-[#2954bc] fill-[#2954bc] cursor-pointer"
                              viewBox="0 0 16 16">
                              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                              <path
                                fillRule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                              />
                            </svg>
                          </button>
                          <button
                            className="bg-[#ffe5e5] p-2 ms-1"
                            onClick={() => deleteTask(item)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              className="bi bi-trash3-fill fill-[#ff1a1a] cursor-pointer"
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
      </div>
    </div>
  );
};

export default Todos;
