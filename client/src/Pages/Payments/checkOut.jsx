import { useNavigate } from 'react-router-dom'
import HomeLayout from '../../Layouts/homeLayout.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { buySubscription, getRazorpayKey, verifySubscription } from '../../Redux/Slice/razorpaySlice.js';
import { handler } from '@tailwindcss/line-clamp';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa';

function CheckOut() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userData = useSelector(state => state?.auth?.data);
    const { razorpay_key, isPaymentVerified, subscription_id } = useSelector(state => state?.razorpay);
    const paymentDetails = {
        razorpay_subscription_id: '',
        razorpay_payment_id: '',
        razorpay_signature: '',
    }

    function handleSubmit() {
        e.preventDefault();
        const options = {
            key: razorpay_key,
            subscription_id: subscription_id,
            name: 'coursify pvt. ltd.',
            description: 'Subscription',
            theme: {
                color: '#F37254'
            },
            handler: async function (response) {
                paymentDetails.razorpay_payment_id = response.razorpay_payment_id;
                paymentDetails.razorpay_signature = response.razorpay_signature;
                paymentDetails.razorpay_subscription_id = response.razorpay_subscription_id

                toast.success('Payment success');
                const res = await dispatch(verifySubscription(paymentDetails));
                res?.payload?.success ? navigate('/checkout/success') : navigate('/checkout/fail')

            }
        }
        const paymentObject = window.Razorpay(options);
        paymentObject.open();
    }

    async function load() {
        await dispatch(getRazorpayKey());
        await dispatch(buySubscription());
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <HomeLayout>
            <div className='w-1/3 items-center justify-center h-auto m-auto shadow-[0_0_10px_black] p-[0.7rem] rounded-md'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3'>
                        <p className='text-center font-semibold text-3xl text-white'>499</p>
                        <button type='submit' className='m-auto px-[0.8rem] text-white rounded-md py-[0.5rem] bg-blue-500 transition-all duration-300 ease-in-out hover:bg-blue-700'>Buy Subscription</button>
                    </div>
                    <ul className='flex flex-col gap-3 py-[1rem]'>
                        <li className='flex gap-2 items-center justify-center'><FaCheck />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, accusantium. </li>
                        <li className='flex gap-2 items-center justify-center'><FaCheck />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, accusantium. </li>
                        <li className='flex gap-2 items-center justify-center'><FaCheck />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, accusantium. </li>
                        <li className='flex gap-2 items-center justify-center'><FaCheck />Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis, accusantium. </li>
                    </ul>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CheckOut