import { useContext } from "react";
import TodoContext from "../Context/TodoContext";

const UpdateBox = () => {
  const {
    toggleUpBox,
    editTask,
    setEditTask,
    handleUpdatedTask,
    handlePopUpClose,
  } = useContext(TodoContext);

  return (
    <>
      {toggleUpBox && (
        <div className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 bottom-0 m-auto z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full">
          <div
            onClick={handlePopUpClose}
            className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"
          />
          <div className="relative p-4 w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-[#4a694f] rounded-lg shadow sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-white">
                <h3 className="text-lg font-semibold  dark:text-white">
                  Update Task
                </h3>
                <button
                  type="button"
                  className="text-white bg-transparent hover:bg-[#5f8765] rounded-lg text-sm p-1.5 ml-auto inline-flex items-center  dark:hover:text-white"
                  onClick={handlePopUpClose}
                  data-modal-toggle="updateProductModal">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form action="#">
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Task
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="bg-[#5f8765] caret-white outline outline-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Update your Task ..."
                      autoComplete="off"
                      value={editTask}
                      onChange={(e) => setEditTask(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex items-center text-white hover:text-white border border-white hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 text-center font-bold dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-900"
                    onClick={handleUpdatedTask}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      fill="currentColor"
                      className="bi bi-pencil mr-1 ml-1 w-5 h-5"
                      viewBox="0 0 16 16">
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateBox;
