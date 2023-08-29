
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getTodos = createAsyncThunk('user/getFeedData', async () => {
    try {
        // const response = await axios.get('http://localhost:4000/todos/', {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos/`, {
            withCredentials: true
        });
        console.log("All todos : ",response);
        return response.data.Todos;
    } catch (e) {
        return Promise.reject(e);
    }
});

    export const searchTodo = createAsyncThunk("/user/getFeedDAta",async (body) =>{
        try {
            console.log("inside the search todo",body);
               const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos/search`,body);
          const data = await response.data.data;
          console.log('search wala ',data);
          return data;
        } catch (e) {
                console.log(e.message);
        }
    })

const appConfigSlice = createSlice({
    name: "appConfigSlice",
    initialState: {
        isLoading: false,
        toastData: {},
        todoData: [],
        search:[]
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        showToast: (state, action) => {
            state.toastData = action.payload;
        },
        handleSearch :(state,action)=>{
            const {title}=action.payload;
            state.todoData= state.todoData.filter(todo => todo.title === title);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTodos.fulfilled, (state, action) => {
            state.todoData = action.payload;
        })
        .addCase(searchTodo.fulfilled,(state,action)=>{
            state.search=action.payload;
        })
    }
});




export default appConfigSlice.reducer;

export const { setLoading, showToast, setLoader,handleSearch} = appConfigSlice.actions;
