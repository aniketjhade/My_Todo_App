import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTodos, handleSearch, searchTodo } from '../redux/Slices/appConfigSlice';
import TodoItem from './dashboard/TodoItem';

function Search({setShowFilter}) {

    const [title, setSearchValue] = useState('');

    const [show, setShow] = useState(false);


    const dispatch = useDispatch();


    const handleSearch = async (e) => {
        try {
            setShowFilter(true);
            e.preventDefault();
            console.log("title : ", title);
            dispatch(searchTodo({
                title
            }));
            setShow(true);
        } catch (e) {
            console.log(e.message);
        }finally{
            setSearchValue("")
        }
    }

    const searchData = useSelector(state => state.appConfigReducer.search);

    console.log(searchData);

    return (
        <div>

            <form>
                <input type="text" className="border p-2 border-slate-400  rounded-md focus:ring focus:ring-gray-300 focus:border-gray-300 text-black" placeholder="search here ..."
                    onChange={(e) => { setSearchValue(e.target.value);   }}
                />
                <button type="submit"placeholder='search here...' className="border ml-3 p-2 gpa5 bg-blue-500 text-white rounded-[20px] hover:bg-blue-700 transition duration-300"
                    onClick={handleSearch}
                >Search</button>
                <button type="button" value="Back" className="border p-2 bg-gray-300 ml-3 text-white  rounded-[20px] w-[80px]  hover:bg-gray-400 transition duration-300"
                onClick={()=>{setShow(false); setSearchValue(" "); setShowFilter(false)}}
                >Back</button>
            </form>

            {show && <TodoItem key={searchData?._id} idd={searchData?._id} todo={searchData} />}

        </div>
    )
}

export default Search