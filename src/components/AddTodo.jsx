import { useContext } from "react";
import TodoContext from "../Context/TodoContext";
const AddTodo = () => {
  const { task, setTask, handleAddTodo, handleKey } = useContext(TodoContext);
  return (
    <div className="w-3/4 me-auto ms-auto">
      <div className="flex items-center justify-center mt-14">
        <input
          type="text"
          name="price"
          id="price"
          className="rounded-md border outline w-full outline-[#96b59c] focus:outline-[#4a694f] py-2 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4a694f] sm:text-sm sm:leading-6 w-60"
          placeholder="Enter your tasks..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKey}
        />
        <button
          className="bg-[#4a694f] ms-5 text-white p-2 rounded-md border-2 hover:border-2 hover:border-[#5f8766] font-semibold flex items-center "
          onClick={handleAddTodo}>
          Add
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            className="bi bi-plus-lg ms-1 fill-white stroke-white"
            viewBox="0 0 16 16">
            <path
              fillRule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
