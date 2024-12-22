import { RxCrossCircled } from 'react-icons/rx'
import HomeLayout from '../../Layouts/homeLayout.jsx'
import { useNavigate } from 'react-router-dom'

function PaymentFail() {
    const navigate = useNavigate()
    return (
        <HomeLayout>
            <div className='w-1/3 text-center h-60 flex flex-col gap-5 m-auto p-[2rem] shadow-[0_0_10px_black]'>
                <RxCrossCircled size={'50px'} className='text-red-500 m-auto' />
                <p className=' text-red-500 text-3xl font-semibold'>Payment Failed</p>
                <button onClick={() => navigate(-2)} className='px-[0.5rem] py-[0.4rem] bg-red-500 text-white text-xl rounded-md transition-all duration-300 ease-in-out hover:bg-red-700'>Go Back to pay</button>
            </div>
        </HomeLayout>
    )
}

export default PaymentFail 