import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";
import UpdateBox from "./components/UpdateBox";

function App() {
  return (
    <div className=" min-h-screen bg-[#f0f4f1] px-2 pt-2">
      <div className="bg-[#4a694f] p-5 text-white font-bold text-xl ">
        To Do List App
      </div>
      <UpdateBox />
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
