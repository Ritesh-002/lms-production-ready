import { FiMenu } from 'react-icons/fi'
import { ImCross } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../Components/footer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { logout } from '../Redux/Slice/authSlice';
function HomeLayout({ children }) {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
    const role = useSelector((state) => state?.auth?.roles);

    function handleOpen() {
        const sideBar = document.getElementsByClassName('drawer-side')
        sideBar[0].style.width = 'auto'
    }
    function handleClose() {
        const element = document.getElementsByClassName("drawer-toggle");
        element[0].checked = false;
        const sideBar = document.getElementsByClassName('drawer-side')
        sideBar[0].style.width = 0
    }

    async function handleLogout(e) {
        e.preventDefault();
        const response = await dispatch(logout());
        if (response?.payload?.success) {
            navigate('/')
        }
    }

    return (
        <div className='h-[80vh]'>
            <div className="drawer">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="drawer-button mr-[75rem] pt-[0.5rem]" onClick={handleOpen} ><FiMenu className='cursor-pointer' size={'32px'} /></label>

                </div>
                <div className="drawer-side z-50 w-0">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu flex flex-col gap-10 p-4 w-60 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        <div className='flex flex-col gap-2'>
                            <li className='w-10 text-lg'><Link onClick={handleClose} className='ml-[10rem]'><ImCross /></Link></li>
                            <li className='w-24 text-lg'><Link to={'/'}>Home</Link></li>
                            {isLoggedIn && role == 'ADMIN' && <li className='w-46 text-lg'><Link to={'/admin/dashboard'}>Admin Dashboard</Link></li>}
                            <li className='w-46 text-lg'><Link to='/courses'>Explore all courses</Link></li>
                            <li className='w-32 text-lg'><Link to='/contact-us'>Contact us</Link></li>
                            <li className='w-28 text-lg'><Link to='/about-us'>About us</Link></li>
                            {role == 'ADMIN' && isLoggedIn ? <li className='w-40 text-lg text-purple-500 font-semibold'><Link to='/course/create'>Create Course</Link></li> : ''}
                        </div>
                        {!isLoggedIn &&
                            <div className='flex gap-5 pt-[8rem] justify-center'>
                                <Link to='/login'><button className='px-[1rem] bg-blue-500 rounded-md text-white hover:bg-blue-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Login</button></Link>
                                <Link to='/sign-up'><button className='px-[1rem] bg-red-500 rounded-md text-white hover:bg-red-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Sign Up</button></Link>
                            </div>
                        }
                        {isLoggedIn &&
                            <div className='flex gap-5 pt-[5rem] justify-center'>
                                <Link to={'/user/profile'}><button className='px-[1rem] bg-green-500 rounded-md text-white hover:bg-green-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Profile</button></Link>
                                <Link><button onClick={handleLogout} className='px-[1rem] bg-yellow-500 rounded-md text-white hover:bg-yellow-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Logout</button></Link>
                            </div>
                        }
                    </ul>

                </div>
            </div>
            {children}
            <Footer />
        </div>
    )
}

export default HomeLayout;