import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import toast from "react-hot-toast";

const initialState = {
    lecturesData: [{
        title: '',
        description: '',
        lecture: {
            secure_url: ''
        },
    }],
    noOfLectures: 0,
}

export const getLecturesData = createAsyncThunk('/get/lectures', async (courseId) => {
    try {
        const response = axiosInstance.get(`/courses/${courseId}`)
        toast.promise(response, {
            loading: 'we are loading lectures',
            success: 'lectures loaded success',
            error: 'unable to fetch lectures'
        })
        const res = await response;
        console.log('lectures response', response)
        console.log('lecture response data', res.data)

        return res.data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const addLectureByCourseId = createAsyncThunk('/add/lecture', async (data) => {
    try {
        console.log("data[0]", data[0])
        console.log("data[1]", data[1])
        const formData = new FormData();
        formData.append('title', data[1].title)
        formData.append('description', data[1].description)
        formData.append('lecture', data[1].lecture);
        const response = axiosInstance.post(`/courses/${data[0]}`, formData);
        toast.promise(response, {
            loading: 'Adding lecture',
            success: 'Lecture added successfully',
            error: 'Failed to add lecture'
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const deleteLectureById = createAsyncThunk('/delete/lecture', async (data) => {
    try {
        console.log(data)
        const response = axiosInstance.delete(`/courses?courseId=${data[0]}&lectureId=${data[1]}`);
        toast.promise(response, {
            loading: 'Deleting lecture',
            success: 'Deleted successfully',
            error: 'Failed to Delete'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

const lectureSlice = createSlice({
    name: 'lectures',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getLecturesData.fulfilled, (state, action) => {
                if (action?.payload) {
                    // state.lecturesData[state.lecturesData.length-1]
                    state.lecturesData = action.payload.lectures;
                    state.noOfLectures = action.payload.lectures.length;
                    console.log("STATE LECTURE DATA: ", state.lecturesData)
                }
            })
            .addCase(addLectureByCourseId.fulfilled, (state, action) => {
                if (action?.payload) {
                    console.log("POST ACTION.PAYLOAD", action.payload)
                    // state.lecturesData = action.payload.lecture;
                    // state.noOfLectures = action.payload.lectures.length;
                    // console.log("STATE AFTER POSTING LECTURE: ", state.lecturesData);
                }
            })
            .addCase(deleteLectureById.fulfilled, (state, action) => {
                if (action?.payload) {
                    console.log("ACTion . payload .lecture", action.payload)
                    state.lecturesData = state.lecturesData.filter(lecture => lecture._id != action.payload.data);
                    state.noOfLectures = state.noOfLectures - 1;
                }
            })
    }
})

export const { } = lectureSlice.actions;
export default lectureSlice.reducer;