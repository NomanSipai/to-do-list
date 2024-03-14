import { useState, createContext, useEffect } from "react";
import axios from "axios";

const TodoContext = createContext();
export const TodoProvider = ({ children }) => {
  const [task, setTask] = useState("");
  const [completedTask, setCompletedTask] = useState("");
  const [taskList, setTaskList] = useState([]);
  const [toggleUpBox, setToggleUpBox] = useState(false);
  const [editTask, setEditTask] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const getData = async () => {
    await axios
      .get("https://65ab946afcd1c9dcffc699ac.mockapi.io/to-do-list-app")
      .then((res) => {
        setTaskList(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleAddTodo = async () => {
    if (!task) {
      alert("Please Fill Task");
    } else {
      await axios
        .post("https://65ab946afcd1c9dcffc699ac.mockapi.io/to-do-list-app", {
          task: task,
          completed: completedTask,
        })
        .then(() => {
          setTaskList([...taskList, task]);
          setTask("");
          getData();
        });
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const deleteTask = async (item) => {
    const filterTask = taskList.filter((elem) => elem.id !== item.id);
    setTaskList(filterTask);
    axios
      .delete(
        `https://65ab946afcd1c9dcffc699ac.mockapi.io/to-do-list-app/${item.id}`
      )
      .then(() => {
        getData();
      });
  };

  const handleChangeChecked = (item) => {
    const checkedTask = taskList.map((task) => {
      if (task.id === item.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(checkedTask);
  };

  const handleEditTask = (item) => {
    setToggleUpBox(true);
    setEditIndex(item.id);
    setEditTask(item.task);
  };
  const handleUpdatedTask = async () => {
    axios
      .put(
        `https://65ab946afcd1c9dcffc699ac.mockapi.io/to-do-list-app/${editIndex}`,
        {
          task: editTask,
        }
      )
      .then(() => {
        setToggleUpBox(false);
        getData();
      });
  };
  const handlePopUpClose = () => {
    setToggleUpBox(false);
  };
  return (
    <TodoContext.Provider
      value={{
        task,
        taskList,
        setTask,
        handleAddTodo,
        completedTask,
        setCompletedTask,
        deleteTask,
        handleEditTask,
        toggleUpBox,
        editTask,
        setEditTask,
        handleUpdatedTask,
        handlePopUpClose,
        handleChangeChecked,
        handleKey,
      }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
