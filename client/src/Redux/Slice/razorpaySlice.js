import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"
import toast from "react-hot-toast";

const initialState = {
    razorpay_key: '',
    subscription_id: '',
    monthlySalesRecord: '',
    finalMonths: '',
    monthlySalesRecord: '',
    isPaymentVerified: false
}

export const getRazorpayKey = createAsyncThunk('payments/razorpay-key', async () => {
    try {
        const response = await axiosInstance.get('/payments/razorpay-key');
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const buySubscription = createAsyncThunk('payments/buy-subscription', async () => {
    try {
        const response = axiosInstance.post('/payments/subscribe')
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const verifySubscription = createAsyncThunk('payments/verify-subscription', async (data) => {
    try {
        const response = axiosInstance.post('/payments/verify', {
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id: data.razorpay_subscription_id,
            razorpay_signature: data.razorpay_signature
        })
        toast.promise(response, {
            loading: 'payment verifying',
            success: 'payment verified',
            error: 'payment not verified'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const cancelSubscription = createAsyncThunk('payments/unsubscribe', async () => {
    try {
        const response = axiosInstance.post('/payments/unsubscribe');
        toast.promise(response, {
            loading: 'unsubscribing user',
            success: 'user unsubscribed successfully',
            error: 'cancellation failed'
        })
        return (await response).data
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

const razorpaySlice = createSlice({
    name: 'razorpay',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getRazorpayKey.fulfilled, (state, action) => {
            state.razorpay_key = action.payload.key
        })
            .addCase(buySubscription.fulfilled, (state, action) => {
                state.subscription_id = action.payload.subscription_id;
            })
            .addCase(verifySubscription.fulfilled, (state, action) => {
                state.isPaymentVerified = action.payload.success;
            })
            .addCase(verifySubscription.rejected, (state, action) => {
                state.isPaymentVerified = action.payload.success;
            })
    }
})

export const { } = razorpaySlice.actions
export default razorpaySlice.reducer