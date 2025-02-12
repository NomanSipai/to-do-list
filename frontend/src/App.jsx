import Todos from "./components/Todos";

function App() {
  return (
    <div className=" min-h-screen container mx-auto bg-[#f0f4f1] px-4 pt-2">
      <div className="bg-[#4a694f] p-5 text-white font-bold text-xl ">
        To Do List App
      </div>
      <Todos />
    </div>
  );
}

export default App;
