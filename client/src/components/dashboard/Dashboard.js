import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../../redux/Slices/appConfigSlice";
import Chart from "chart.js/auto";
import TodoItem from "./TodoItem";
import axios from "axios";
import Search from "../Search";

function DashBoard() {
  const chartRef = React.createRef();
  const chartInstance = useRef();
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [text, setText] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [showFilter, setShowFilter] = useState(false);

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const Todos = useSelector((state) => state.appConfigReducer.todoData);

  const completedTasks = Todos.filter(
    (todo) => todo.completed === "true"
  ).length;
  const pendingTasks = Todos.filter((todo) => todo.pending === "true").length;

  // Create the bar graph
  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    // Destroy the existing chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Create a new chart instance
    chartInstance.current = new Chart(myChartRef, {
      type: "bar",
      data: {
        labels: ["Completed", "Pending"],
        datasets: [
          {
            label: "Tasks",
            data: [completedTasks, pendingTasks],
            backgroundColor: ["green", "yellow"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      // Clean up the chart instance when the component unmounts
      chartInstance.current.destroy();
    };
  }, [completedTasks, pendingTasks]);

  function handleAddTodos() {
    setShowInput(!showInput);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/todos/`,
        {
          title: text,
          completed: "false",
          pending: "false",
        }
      );
      console.log("created post Successfully", result);
    } catch (e) {
      console.log(e.message);
    } finally {
      dispatch(getTodos());
      setText("");
      setShowInput(false);
    }
  }

  const handleFilter = async () => {
    if (selectedStatus === "completed") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/todos/completed`
        );
        console.log("completed data ", response.data.showCompleted);
        setFilterData(response.data.showCompleted);
      } catch (e) {
        e.message(e.message);
      } finally {
        setShowFilter(true);
      }
    } else if (selectedStatus === "pending") {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/todos/pending`
        );
        console.log("pending data ", response.data.showPending);
        setFilterData(response.data.showPending);
      } catch (e) {
        e.message(e.message);
      } finally {
        setShowFilter(true);
      }
    }
  };

  return (
    <div className="w-full flex flex-col gap-8 mt-12 text-black min-h-screen font-sans">
      {/* Add Todo Section */}
      <div className="flex flex-col items-center justify-center bg-sky-300 h-[200px]">
        <h1 className="text-center text-6xl">Todo List</h1>
        {showInput ? (
          <form onSubmit={handleSubmit} className="flex items-center mt-3">
            <label htmlFor="add" className="mr-2 text-2xl font-semibold ">
              Add Todo:
            </label>
            <input
              id="add"
              className="border p-2 border-slate-400  rounded-md focus:ring focus:ring-gray-300 focus:border-gray-300 text-black"
              type="text"
              placeholder="add todo here..."
              onChange={(e) => {
                setText(e.target.value);
              }}
              autoFocus
            />
            <input
              type="button"
              value="Submit"
              className="border w-[80px] rounded-[20px] ml-2 p-2 bg-blue-500 text-white text-center hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            />
            <input
              type="button"
              value="Back"
              className="ml-2 p-2 border w-[80px] rounded-[20px] bg-gray-300 text-white hover:bg-gray-500 transition duration-300"
              onClick={() => setShowInput(false)}
            />
          </form>
        ) : (
          <button
            className="p-2 mt-3 cursor-pointer rounded-[20px] w-[100px] bg-blue-500 hover:shadow-md hover:scale-105 transform transition duration-300"
            onClick={handleAddTodos}
          >
            Add Todo
          </button>
        )}
      </div>

      {/* Filter Section */}
      <div className="flex items-center space-x-3">
        <label htmlFor="status" className="text-lg font-semibold">
          Filter by Status:
        </label>
        <select
          className="text-black p-2 border rounded-md focus:ring focus:ring-gray-300 focus:border-gray-300"
          id="status"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="select">Select..</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button
          className="border p-2 bg-blue-500 text-white rounded-[20px] hover:bg-blue-700 transition duration-300"
          onClick={handleFilter}
        >
          Apply Filter
        </button>
        <button
          className="border p-2 bg-gray-300 text-white  rounded-[20px] w-[80px] hover:bg-gray-400 transition duration-300"
          onClick={() => {
            setShowFilter(false);
            setSelectedStatus("select");
          }}
        >
          Reset
        </button>
      </div>

      <Search setShowFilter={setShowFilter} />

      {/* Todo Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto text-black">
        {showFilter
          ? filterData.map((todo, index) => (
              <TodoItem key={todo._id} idd={todo._id} todo={todo} />
            ))
          : Todos.map((todo, index) => (
              <TodoItem key={todo._id} idd={todo._id} todo={todo} />
            ))}
      </div>

      {/* Bar Graph Section */}
      <div className="w-[800px] h-[400px] mx-auto">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default DashBoard;
