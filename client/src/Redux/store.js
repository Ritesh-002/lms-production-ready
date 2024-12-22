import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./Slice/authSlice.js";
import courseSliceReducer from "./Slice/courseSlice.js";
import lectureSliceReducer from './Slice/lectureSlice.js'
import razorpaySliceReducer from './Slice/razorpaySlice.js'
const store = configureStore({
    reducer: {
        auth: authSliceReducer,
        courses: courseSliceReducer,
        lectures: lectureSliceReducer,
        razorpay: razorpaySliceReducer,
    },
    devTools: true,
})

export default store;