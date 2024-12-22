import { useState } from 'react';
import HomeLayout from '../Layouts/homeLayout.jsx'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { isValidEmail } from '../Helpers/regexMatcher.js';
import axiosInstance from '../Helpers/axiosInstance.js';

function ContactUs() {

    const [contactUsData, setContactUsData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleInputChange(e) {
        const { name, value } = e.target;
        setContactUsData({
            ...contactUsData,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!contactUsData.name || !contactUsData.email || !contactUsData.message) {
            toast.error('Fill all the details')
            return;
        }
        if (contactUsData.name.length <= 3) {
            toast.error('Enter valid name')
            return;
        }
        if (!isValidEmail(contactUsData.email)) {
            toast.error('Enter valid email')
            return;
        }

        try {
            const response = axiosInstance.post('/contact', contactUsData);
            toast.promise(response, {
                loading: 'sending message',
                success: 'message sent successfully',
                error: 'message not sent'
            })
            const contactResponse = await response;
            console.log(contactResponse)
            if (contactResponse?.data?.success) {
                setContactUsData({
                    name: '',
                    email: '',
                    message: ''
                })
            }
            return (await response).data;
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }

    }

    return (
        <HomeLayout>
            <Toaster />
            <form noValidate onSubmit={handleSubmit} className='h-auto p-[1rem] w-1/3 m-auto flex flex-col gap-5 items border-2 border-black rounded-md'>
                <h1 className='text-4xl font-semibold text-blue-400 text-center'>Contact Form</h1>
                <div>
                    <div className='w-full my-[1rem]'>
                        <label htmlFor="name" className='font-semibold text-lg'>Name</label>
                        <input
                            value={contactUsData.name}
                            onChange={handleInputChange}
                            name='name'
                            id='name'
                            type="text"
                            className='w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 mt-[0.5rem] p-2 rounded-md'
                            placeholder='Enter name' />
                    </div>
                    <div className='w-full my-[1rem]'>
                        <label htmlFor="email" className='font-semibold text-lg'>Email</label>
                        <input
                            value={contactUsData.email}
                            onChange={handleInputChange}
                            name='email'
                            id='email'
                            type="text"
                            className='w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 mt-[0.5rem] p-2 rounded-md'
                            placeholder='Enter email' />
                    </div>
                    <div className='w-full my-[1rem]'>
                        <label htmlFor="message" className='font-semibold text-lg'>Message</label>
                        <textarea
                            value={contactUsData.message}
                            onChange={handleInputChange}
                            name='message'
                            id='message'
                            className='w-full transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300 mt-[0.5rem] resize-none h-32 p-2 rounded-md'
                            placeholder='Enter message' />
                    </div>
                    <button type='submit' className='p-[0.5rem] text-lg transition duration-300 ease-in-out hover:bg-blue-700 w-full bg-blue-500 text-white font-semibold rounded-md'>Submit</button>
                </div>
            </form>
        </HomeLayout>
    )
}

export default ContactUs;