import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from '../../Helpers/axiosInstance.js'
const initialState = {
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    roles: localStorage.getItem('role') || "",
    data: JSON.parse(localStorage.getItem('data')) || {},  // to do parsing or not
}

// export const createAccount = createAsyncThunk('/sign-up', async (data) => {
//     try {
//         const res = await axiosInstance.post('user/register', data)
//         toast.promise(res, {
//             loading: 'Wait we are creating your account...',
//             success: (data) => { return data?.data?.message },
//             error: 'Failed to create account'
//         })
//         const response = await res;
//         return response.data;
//     } catch (error) {
//         toast.error(error?.response?.data?.message)
//     }
// })
export const createAccount = createAsyncThunk(
    '/auth/sign-up',
    async (data) => {
        try {
            console.log('before axios all')
            const res = axiosInstance.post('/user/register', data); // No need to specify the full URL, just the endpoint
            console.log(res)
            toast.promise(res, {
                loading: 'Wait we are creating your account...',
                success: (data) => { return data?.data?.message },
                error: 'Failed to create account'
            });
            console.log(res)
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error; // Rethrow the error to let the caller handle it
        }
    }
);

export const loginAccount = createAsyncThunk(
    '/auth/login',
    async (data) => {
        try {
            console.log('before axios all')
            const res = axiosInstance.post('/user/login', data); // No need to specify the full URL, just the endpoint
            console.log(res)
            toast.promise(res, {
                loading: 'logging you in...',
                success: 'success login',
                error: 'user login failed'
            });
            console.log(res)
            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            throw error; // Rethrow the error to let the caller handle it
        }
    }
);

export const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        const res = axiosInstance.post('/user/logout');
        toast.promise(res, {
            loading: 'logout in progress..',
            success: (data) => {
                console.log('logout toast success callback')
                return data?.data?.message
            },
            error: 'failed to logout'
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
        // throw error;
    }
})

export const editUser = createAsyncThunk('/auth/user/edit', async (data) => {
    try {
        console.log("data array", data)
        const res = axiosInstance.put(`/user/update/${data[0]}`, data[1])
        toast.promise(res, {
            loading: 'editing user',
            success: 'user updated successfully',
            error: 'failed to edit the user'
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const getUser = createAsyncThunk('/auth/user/get', async () => {
    try {
        const res = axiosInstance.get('/user/me');
        toast.promise(res, {
            loading: 'getting user details',
            // success: '',
            error: 'failed to get user'
        })
        return (await res).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginAccount.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.user?.role)
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                state.isLoggedIn = true;
                state.roles = action?.payload?.user?.role;
                state.data = action?.payload?.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {}
                state.isLoggedIn = false;
                state.roles = ''
            })
            .addCase(getUser.fulfilled, (state, action) => {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('role', action?.payload?.user?.role)
                localStorage.setItem('data', JSON.stringify(action?.payload?.user))
                state.isLoggedIn = true;
                state.roles = action?.payload?.user?.role;
                state.data = action?.payload?.user;
            })
    }
})

export const { } = authSlice.actions;
export default authSlice.reducer;