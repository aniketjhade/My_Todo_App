import {configureStore} from "@reduxjs/toolkit"
import appConfigReducer from "./Slices/appConfigSlice";

    export default configureStore({
            reducer :{
                appConfigReducer
            }
    });