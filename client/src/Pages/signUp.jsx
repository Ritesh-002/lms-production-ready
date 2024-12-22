import { Link, useNavigate } from 'react-router-dom';
import HomeLayout from '../Layouts/homeLayout.jsx'
import { RxAvatar } from "react-icons/rx";
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { createAccount } from '../Redux/Slice/authSlice.js';

function SignUp() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [previewImage, setPreviewImage] = useState('')
    const [signUpData, setSignUpData] = useState({
        fullName: '',
        email: '',
        password: '',
        // reEnteredPassword: '',
        avatar: '',
    })


    function handleUserAvatar(event) {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            setSignUpData({
                ...signUpData,
                avatar: file
            })
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.addEventListener('load', () => {
                // console.log('previewImage', previewImage)
                setPreviewImage(fileReader.result);
            })
        }

    }

    function handleUserInput(e) {
        const { name, value } = e.target;
        setSignUpData({
            ...signUpData,
            [name]: value
        })
        // console.log(signUpData);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!signUpData.fullName || !signUpData.email || !signUpData.password || !signUpData.avatar) {
            toast.error('every field is required')
            console.log('test')
            return;
        }
        if (signUpData.fullName.length < 3) {
            toast.error('Enter valid name');
            return;
        }
        if (!signUpData.email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            toast.error('Enter a valid email');
            return;
        }

        if (!signUpData.password.match(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
            toast.error('Strong password required');
            return;
        }
        // if (signUpData.password != signUpData.reEnteredPassword) {
        //     toast.error('password does not match');
        //     return;
        // }

        const formData = new FormData()
        formData.append("fullName", signUpData.fullName)
        formData.append("email", signUpData.email)
        formData.append("password", signUpData.password)
        // formData.append("reEnteredPassword", signUpData.reEnteredPassword)
        formData.append("avatar", signUpData.avatar)
        // for (let [key, value] of formData.entries()) {
        //     console.log(key, value);
        // }

        // dispatch action to create an account and then navigate to home page
        const response = await dispatch(createAccount(formData));
        console.log('signuppage', response)
        // navigation
        if (response?.payload?.success) navigate('/')
        // setPreviewImage('')
        setSignUpData({
            fullName: '',
            email: '',
            password: '',
            avatar: '',
        })
    }

    return (
        <HomeLayout>
            <Toaster />
            <div className='h-auto rounded-md w-1/3 border-2 border-black m-auto p-[1rem] flex flex-col gap-5'>
                <h1 className='font-semibold text-3xl text-center'>Registration form</h1>
                <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-3 items-center'>
                    <label htmlFor="image_uploads">
                        {!previewImage ?
                            <RxAvatar size={'100px'} className='cursor-pointer' /> :
                            <img src={previewImage} alt="avatar" className='w-28 h-28 rounded-full' />
                        }
                    </label>
                    <input accept='.jpg, .jpeg, .svg, .png' onChange={handleUserAvatar} required name='image_uploads' id='image_uploads' className='hidden' type="file" />
                    <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="name" className='font-semibold'>Name</label>
                        <input onChange={handleUserInput}
                            value={signUpData.fullName}
                            name='fullName'
                            required
                            id='fullName'
                            type="text"
                            placeholder='Enter name'
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>
                    <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input onChange={handleUserInput}
                            value={signUpData.email}
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
                            value={signUpData.password}
                            name='password'
                            required
                            id='password'
                            type="password"
                            placeholder='Enter password'
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>
                    {/* <div className='flex flex-col w-full gap-2'>
                        <label htmlFor="reEnteredPassword" className='font-semibold'>Re-enter your password</label>
                        <input onChange={handleUserInput}
                            value={signUpData.reEnteredPassword}
                            name='reEnteredPassword'
                            required
                            id='reEnteredPassword'
                            type="password"
                            placeholder='Re-enter password'
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div> */}
                    <button

                        type='submit'
                        className='w-full mt-[1rem] p-2 text-center px-[1rem] bg-red-500 rounded-md text-white hover:bg-red-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Submit</button>
                    <p>Already have an account?<Link to='/login' className='pl-[0.2rem] text-blue-500 font-semibold'>Login</Link></p>
                </form>
            </div>
        </HomeLayout>
    )
}

export default SignUp;