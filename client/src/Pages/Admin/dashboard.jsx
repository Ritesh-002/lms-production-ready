import HomeLayout from '../../Layouts/homeLayout.jsx'
import { ArcElement, BarController, BarElement, Chart, DoughnutController, Legend, LinearScale, Tooltip } from 'chart.js'
import { CategoryScale } from 'chart.js'
import { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import { FaPlay, FaUsers } from 'react-icons/fa'
import { GiMoneyStack } from 'react-icons/gi'
import { IoStatsChartSharp } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { deleteCourse, getAllCourses } from '../../Redux/Slice/courseSlice.js'
import { FaDeleteLeft } from 'react-icons/fa6'
import { Toaster } from 'react-hot-toast'

Chart.register(CategoryScale, ArcElement, DoughnutController, Tooltip, Legend, BarElement, BarController, LinearScale)

function DashBoard() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { courseData } = useSelector((state) => state?.courses);

    async function loadCourses() {
        const courseResponse = await dispatch(getAllCourses());
        console.log('courseData: ', courseData)
    }

    useEffect(() => {
        loadCourses();
    }, [])


    const year = ['Registered Students', 'Enrolled Students']
    const [chartData, setChartData] = useState({
        labels: year.map(y => y),
        datasets: [
            {
                label: "Students count",
                data: [80, 20],
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)"
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)"
                ],
                borderWidth: 1
            }
        ]
    })

    const [barChartData, setBarChartData] = useState({
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Sales/Month',
                data: [50, 60, 70, 65, 80, 10, 15, 50, 90, 85, 20, 5],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
        ],
    });

    async function handleDeleteCourse(courseId) {
        const response = await dispatch(deleteCourse(courseId))
    }

    return (
        <HomeLayout>
            <Toaster />
            <h1 className='text-center justify-center text-red-300 text-4xl font-semibold'>Admin Dashboard</h1>
            <div className='grid grid-cols-2 gap-10 w-auto h-auto p-[2rem] mx-[5rem] my-[2rem] items-center'>
                <div className='left-grid w-full h-auto'>
                    {/* <div className='flex gap-2 items-center'>
                        <div className='w-1/6 bg-purple-500 h-4 rounded-sm'></div>
                        <p>Registered User</p>
                        <div className='w-1/6 bg-orange-500 h-4 rounded-sm ml-8'></div>
                        <p>Enrolled User</p>
                    </div> */}
                    <div className='w-9/12 '>
                        <Pie className='ml-[7.5rem]' data={chartData} options={{
                            plugins: {
                                title: {
                                    display: true,
                                }
                            }
                        }}
                        />
                    </div>
                    <div className='p-2 flex gap-16 items-center shadow-[0_0_10px_black] justify-center mt-[1rem]'>
                        <div className='flex gap-5 items-center'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-white'>Registered Users</p>
                                <p className='text-3xl text-white font-semibold'>80</p>
                            </div>
                            <FaUsers className='text-[#FF6384]' size={'50px'} />
                        </div>
                        <div className='flex gap-5 items-center'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-white'>Enrolled Users</p>
                                <p className='text-3xl text-white font-semibold'>20</p>
                            </div>
                            <FaUsers className='text-[#36A2EB]' size={'50px'} />
                        </div>
                    </div>

                </div>
                <div className='right-grid w-full h-auto'>
                    <div className='w-full'>
                        <Bar
                            data={barChartData}
                            options={{
                                plugins: {
                                    title: {
                                        display: true,
                                    },
                                    legend: {
                                        display: true
                                    }
                                }
                            }}
                        />
                    </div>
                    <div className='p-2 flex gap-16 items-center justify-center mt-[1rem] shadow-[0_0_10px_black]'>
                        <div className='flex gap-5 items-center'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-white'>Subscription Count</p>
                                <p className='text-3xl text-white font-semibold'>80</p>
                            </div>
                            <IoStatsChartSharp className='text-[#FF6384]' size={'50px'} />
                        </div>
                        <div className='flex gap-5 items-center'>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-white'>Total Revenue</p>
                                <p className='text-3xl text-white font-semibold'>49871</p>
                            </div>
                            <GiMoneyStack className='text-[#19C9EA]' size={'50px'} />
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-5/6 m-auto h-auto flex flex-col p-[1rem]'>
                <header className='w-full h-auto px-[0.5rem] pb-[2rem] flex justify-between items-center'>
                    <h1 className='font-semibold text-white text-2xl'>Course Overview</h1>
                    <Link to={'/course/create'}><button className='text-white bg-green-500 font-semibold px-[0.5rem] py-[0.3rem] transition-all duration-300 ease-in-out hover:bg-green-700 cursor-pointer rounded-md'>Create new course <span className='text-lg'>+</span></button></Link>
                </header>

                <div className='w-full shadow-[0_0_10px_black] p-[0.5rem]'>
                    <table className='w-full text-white'>
                        <thead className=''>
                            <tr className=''>
                                <th className='text-center'>Sr No.</th>
                                <th className='text-center'>Course Title</th>
                                <th className='text-center'>Category</th>
                                <th className='text-center'>Created by</th>
                                <th className='text-center'>Total Lectures</th>
                                <th className='text-center'>Description</th>
                                <th className='text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {courseData.map((c, index) => {
                                return (
                                    <tr className='' key={index}>
                                        <td className='text-center'>{index + 1}</td>
                                        <td className='text-center'>{c.title}</td>
                                        <td className='text-center'>{c.category}</td>
                                        <td className='text-center'>{c.createdBy}</td>
                                        <td className='text-center'>{c.numberOfLectures}</td>
                                        <td className='text-center'><textarea className='resize-none overflow-y-auto h-12 rounded-md px-[0.3rem]'>{c.description}</textarea></td>
                                        <td className='flex gap-2 text-center pt-4 items-center justify-center'>
                                            <button onClick={() => navigate('/course/description', { state: { ...c } })} className='cursor-pointer bg-blue-600 px-[0.5rem] py-[0.3rem] rounded-md transition-all duration-300 ease-in-out hover:bg-blue-700'><FaPlay className='text-white' /></button>
                                            <button onClick={() => handleDeleteCourse(c._id)} className='cursor-pointer bg-red-600 px-[0.5rem] py-[0.3rem] rounded-md transition-all duration-300 ease-in-out hover:bg-red-700'><FaDeleteLeft className='text-white' /></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

            </div>
        </HomeLayout>
    )
}

export default DashBoard