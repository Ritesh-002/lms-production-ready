import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from '../../Helpers/axiosInstance.js'
import toast from "react-hot-toast";
const initialState = {
    courseData: []
}

export const getAllCourses = createAsyncThunk('auth/courses', async () => {
    try {
        const response = axiosInstance.get('/courses');
        toast.promise(response, {
            loading: 'we are loading courses',
            success: 'courses loaded successfully',
            error: 'unable to fetch courses'
        })
        const res = await response;
        console.log('response', res.data)
        console.log('response.data', res.data)
        console.log('response.data.courses', res.data.courses)
        return res.data.courses;
    } catch (error) {
        // toast.error(error?.response?.data?.message)
    }
})

// export const filteredCourses = createAsyncThunk('/auth/filter/courses', async () => {
//     try {
//         const response = axiosInstance.get('/courses');
//         toast.promise(response, {
//             loading: 'we are loading courses',
//             success: 'courses loaded successfully',
//             error: 'unable to fetch courses'
//         })
//         const res = await response;
//         return res.data.courses.filter(c => {
//             return c.category == 'development';
//         })
//     } catch (error) {

//     }
// })

export const createCourse = createAsyncThunk('courses/create', async (data) => {
    try {
        let formData = new FormData()
        formData.append('title', data?.title)
        formData.append('description', data?.description)
        formData.append('createdBy', data?.createdBy)
        formData.append('category', data?.category)
        formData.append('thumbnail', data?.thumbnail)
        const response = axiosInstance.post('/courses', formData);
        toast.promise(response, {
            loading: 'creating course',
            success: 'course created successfully',
            error: 'unable to create course'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return;
    }
})

export const deleteCourse = createAsyncThunk('courses/delete', async (courseId) => {
    try {
        const response = axiosInstance.delete(`/courses/${courseId}`);
        toast.promise(response, {
            loading: 'Deleting course',
            success: 'Course deleted successfully',
            error: 'unable to delete the course'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
        return;
    }
})

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllCourses.fulfilled, (state, action) => {
            if (action.payload) {
                state.courseData = [...action.payload]
            }
        })
            .addCase(deleteCourse.fulfilled, (state, action) => {
                if (action.payload) {
                    console.log('action . payload in deletion', action.payload)
                    state.courseData = state.courseData.filter(course => course._id !== action.payload.data._id);
                }
            })
        // .addCase(filteredCourses.fulfilled, (state, action) => {
        //     if (action.payload) {
        //         state.courseData = state.courseData.filter(course => course.category == 'development');
        //     }
        // })
    }
})

export const { } = courseSlice.actions;
export default courseSlice.reducer