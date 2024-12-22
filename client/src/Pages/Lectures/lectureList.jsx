import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteLectureById, getLecturesData } from "../../Redux/Slice/lectureSlice";
import HomeLayout from "../../Layouts/homeLayout";
import { Toaster } from "react-hot-toast";

function LectureList() {

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userData = useSelector(state => state?.auth)
    const lectureDataFromSelector = useSelector(state => state?.lectures?.lectureData)
    const [lectureData, setLectureData] = useState([]);
    const [currentLecture, setCurrentLecture] = useState(0);
    const { courseData } = location.state || {};
    const courseId = courseData?._id;

    async function loadLectures() {
        const id = courseId;
        const response = await dispatch(getLecturesData(id));
        // setTotalLectures(lecturesData)
        // console.log("AWAITED RESPONSE DATA ", response.payload.lectures);
        setLectureData(response.payload.lectures)
        console.log("USER DATA: ", userData);
        // console.log("LECTURE NUMBER: ", totalLectures);
    }


    useEffect(() => {
        if (courseId) {
            loadLectures();
        }
    }, [courseId]);

    useEffect(() => {
        console.log("LECTURE DATA: ", lectureData);
    }, [lectureData]);

    function handleHeadingClick(index) {
        setCurrentLecture(index)
    }

    function handleNavigate() {
        navigate('/course/add-lectures', {
            state: { ...courseData }
        })
    }

    async function handleDelete(courseId, lectureId) {
        await dispatch(deleteLectureById([courseId, lectureId]))
    }

    return (
        <HomeLayout>
            <Toaster />
            {userData.data.role == 'ADMIN' && <button onClick={handleNavigate} className="text-white ml-[37rem] mb-[1rem] px-[0.5rem] py-[0.5rem] text-md rounded-md bg-purple-500 transition-all ease-in-out duration-300 hover:bg-purple-700">Add lecture</button>}

            <div className="w-4/5 h-auto shadow-[0_0_10px_black] rounded-md p-[1rem] m-auto flex">
                {lectureData && lectureData.length > 0 ? <div className="w-1/2 flex flex-col items-start justify-start">
                    <video controls className="rounded-md" src={lectureData[currentLecture]?.lecture?.secure_url}></video>
                    <p className="m-auto text-white text-lg">{lectureData[currentLecture]?.description}</p>
                </div> : ''}
                <div className="w-1/2 h-96 flex-col overflow-y-auto">
                    {
                        lectureData && lectureData.length > 0 && lectureData.map((l, index) => {
                            return (
                                <div key={l.title} className="flex justify-between text-white font-semibold p-[1.5rem] rounded-md border-b-2 border-purple-500 bg-gray-700">
                                    <h1 onClick={() => handleHeadingClick(index)} className="text-2xl cursor-pointer active:text-purple-500 ">{l.title}</h1>
                                    {
                                        userData.data.role == 'ADMIN' && <div className="flex gap-2">
                                            <button onClick={() => handleDelete(courseId, l._id)} className="px-[0.5rem] py-[0.5rem] text-md rounded-md bg-red-500 transition-all ease-in-out duration-300 hover:bg-red-700">Delete</button>
                                            <button className="px-[0.5rem] py-[0.5rem] text-md rounded-md bg-blue-500 transition-all ease-in-out duration-300 hover:bg-blue-700">Rename</button>
                                        </div>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </HomeLayout>
    )
}

export default LectureList;