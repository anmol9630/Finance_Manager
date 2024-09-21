import { configureStore } from "@reduxjs/toolkit";
import api from "./API/Api";

const store = configureStore({
    reducer:{
        UserApis : api.reducer
    },
    middleware: (mid) => [...mid(),api.middleware]
})

export default store;
