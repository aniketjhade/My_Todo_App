import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getTodos } from "../../redux/Slices/appConfigSlice";

function TodoItem({ todo, idd }) {

  const [showInput, setShowInput] = useState(false);

  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const [option, setOption] = useState("");

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const result = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/todos/`,
        {
          title: `${text ? text : todo?.title}`,
          completed: `${option === "completed" ? "true" : "false"}`,
          pending: `${option === "pending" ? "true" : "false"}`,
          todoId: idd,
        }
      );
    } catch (e) {

    } finally {
      setShowInput(!showInput);
      setText("");
      setOption("");
      setId("");
      dispatch(getTodos());
    }
  }

  async function deleteHandler() {
    const todoId = idd;
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos/delete`, {
        withCredentials: true,
        todoId,
      });
    } catch (e) {
      
    } finally {
      dispatch(getTodos());
    }
  }

  return (

    <div className="w-full sm:w-[300px] mx-auto shadow-slate-700 shadow-md text-black border-solid rounded-[20px] border-indigo-200 bg-white font-sans flex flex-col border mt-6 hover:scale-105 transform transition duration-300 hover:shadow-gray-500">
    <div className="flex justify-center items-center mt-3 pl-3">
        {showInput ? (
          <form>
            <label
              className="text-xl mr-2 mt-3 font-semibold"
              htmlFor="edit"
              onClick={() => setText(todo.title)}
            >
              Edit: 
            </label>
            <input
              id="edit"
              className="p-2 border border-slate-400 rounded-md focus:ring focus:ring-blue-300 focus:border-blue-300 text-black"
              type="text"
              name={todo?.title}
              onChange={(e)=>{setText(e.target.value)}}
              placeholder={todo?.title}
              autoFocus
            />
            <input
              type="submit"
              value="Update"
              className="border w-[80px] rounded-[20px] ml-8 p-2 bg-blue-500 text-white text-center hover:bg-blue-700 transition duration-300"
              onClick={handleSubmit}
            />
            <input
              type="button"
              value="Back"
              className="border w-[80px] ml-8 rounded-[20px] text-white hover:bg-gray-500 transition duration-300 bg-gray-300 p-2 mt-2 mr-5"
              onClick={() => setShowInput(!showInput)}
            />
            <div className="flex item-center justify-center w-[50] m-auto">
            <label className="pt-5 pr-2 text-xl font-semibold" htmlFor="status">
              Status:
            </label>
            <br />
            <select
              id="status"
              onChange={(e) => {
                setOption(e.target.value);
              }}
              className="outline-none border border-gray-300 rounded p-2 text-black mt-3 focus:ring focus:ring-blue-300"
            >
              <option>Choose the Status</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
            </div>
          </form>
        ) : (
            <div className="w-[200px] mt-3">
            <div className="text-2xl flex justify-center items-center rounded-[20px] bg-blue-200 p-2">
              <h3 className="whitespace-normal">{todo?.title}</h3>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center items-center mt-6">
      <p className="mb-3 text-2xl font-semibold">
      Status:{" "}
        {todo?.pending === "true" ? (
          <span className="text-yellow-500">Pending</span>
        ) : todo?.completed === "true" ? (
          <span className="text-green-500">Completed</span>
        ) : (
          <span className="text-blue-500">To be Started</span>
        )}
      </p>
        <div className="space-x-2">
          <div>
            {!showInput && (
              <button
              className="px-4 py-2 border cursor-pointer hover:bg-blue-500 transition duration-300 rounded-[20px] bg-blue-300 w-[100px]"
                onClick={() => {
                  setShowInput(!showInput);
                  setId(todo._id);
                }}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-2 mt-6">
      <button
        className="px-4 py-2 border cursor-pointer w-[100px] mb-5 rounded-[20px] hover:bg-red-500 transition duration-300 bg-red-300"
        onClick={deleteHandler}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
