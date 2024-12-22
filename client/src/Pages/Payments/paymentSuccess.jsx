import { FaCheckCircle } from 'react-icons/fa'
import HomeLayout from '../../Layouts/homeLayout.jsx'
import { useNavigate } from 'react-router-dom'

function PaymentSuccess() {
    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div className='w-1/3 text-center h-60 flex flex-col gap-5 m-auto p-[2rem] shadow-[0_0_10px_black]'>
                <FaCheckCircle size={'50px'} className='text-green-500 m-auto' />
                <p className=' text-green-500 text-3xl font-semibold'>Payment successfull</p>
                <button onClick={() => navigate(-3)} className='px-[0.5rem] py-[0.4rem] bg-green-500 text-white text-xl rounded-md transition-all duration-300 ease-in-out hover:bg-green-700'>Go Back to view lectures</button>
            </div>
        </HomeLayout>
    )
}

export default PaymentSuccess 