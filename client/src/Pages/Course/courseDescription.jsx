import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom"
import HomeLayout from "../../Layouts/homeLayout";

function CourseDescription() {
    const { state } = useLocation();
    const { roles, data } = useSelector(state => state?.auth)
    const navigate = useNavigate();

    useEffect(() => {
        console.log("STATE: ", state)
        console.log("DATA: ", data)
    }, [])

    function handleViewLectureClick() {
        navigate('/lectures', {
            state: {
                courseData: state,
            }
        })
    }
    return (
        <HomeLayout>
            <div className="w-full flex gap-3 items-center my-[5rem] pl-[5rem]">
                <div className="w-1/2">
                    <img src={state?.thumbnail} className="w-full rounded-md" alt="" />
                </div>
                <div className="w-1/2 flex flex-col gap-2">
                    <p className="text-white font-semibold text-2xl"><span className="text-purple-500 text-2xl font-semibold">Title: </span>{state?.title}</p>
                    <p className="text-white font-semibold text-2xl"><span className="text-purple-500 text-2xl font-semibold">Description: </span>{state?.description}</p>
                    <p className="text-white font-semibold text-2xl"><span className="text-purple-500 text-2xl font-semibold">Category: </span>{state?.category}</p>
                    <p className="text-white font-semibold text-2xl"><span className="text-purple-500 text-2xl font-semibold">Created by: </span>{state?.createdBy}</p>
                    {roles === 'ADMIN' || data?.payments?.status == 'ACTIVE' ? <button onClick={handleViewLectureClick} className="rounded-md bg-orange-500 font-semibold text-white text-lg py-[0.4rem] px-[1rem] w-1/3 mt-[0.5rem]">View lectures</button> : <Link to={'/payments/checkout'}><button className="rounded-md bg-purple-500 font-semibold text-white text-lg py-[0.4rem] px-[1rem] w-1/3 mt-[0.5rem]">Subscribe</button></Link>}
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseDescription