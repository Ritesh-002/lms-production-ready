import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/homeLayout.jsx'
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { loginAccount } from '../Redux/Slice/authSlice.js';

function LogIn() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        // reEnteredPassword: '',
    })

    function handleUserInput(e) {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        })
        // console.log(loginData);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!loginData.email || !loginData.password) {
            toast.error('every field is required')
            console.log('test')
            return;
        }

        // dispatch action to create an account and then navigate to home page
        const response = await dispatch(loginAccount(loginData));
        console.log('loginpage', response)
        // navigation
        if (response?.payload?.success) navigate('/')
        setLoginData({
            email: '',
            password: '',
        })
    }

    return (
        <HomeLayout>
            <Toaster />
            <div className='h-auto mb-[6.4rem] rounded-md w-1/3 border-2 border-black m-auto p-[1rem] flex flex-col gap-5'>
                <h1 className='font-semibold text-3xl text-center'>Login form</h1>
                <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-3 items-center'>


                    <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input onChange={handleUserInput}
                            value={loginData.email}
                            name='email'
                            required
                            id='email'
                            type="email"
                            placeholder='Enter email'
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="password" className='font-semibold'>Password</label>
                        <input onChange={handleUserInput}
                            value={loginData.password}
                            name='password'
                            required
                            id='password'
                            type="password"
                            placeholder='Enter password'
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>

                    <button

                        type='submit'
                        className='w-full mt-[1rem] p-2 text-center px-[1rem] bg-red-500 rounded-md text-white hover:bg-red-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Submit</button>
                    <p>Create new account?<Link to='/sign-up' className='pl-[0.2rem] text-blue-500 font-semibold'>sign up</Link></p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default LogIn;