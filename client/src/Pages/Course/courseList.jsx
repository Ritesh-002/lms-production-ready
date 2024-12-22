import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slice/courseSlice";
import HomeLayout from '../../Layouts/homeLayout.jsx'
import toast, { Toaster } from "react-hot-toast";
import CourseCard from "../../Components/courseCard.jsx";

function CourseList() {
    const dispatch = useDispatch();
    const { courseData } = useSelector((state) => state?.courses);

    const [option, setOption] = useState(false);

    async function loadCourses() {
        const courseResponse = await dispatch(getAllCourses());
        console.log("Ritesh")
        console.log('courseData: ', courseData)
    }

    useEffect(() => {
        loadCourses();
    }, [])

    const handleClick = () => {
        setOption(true);
        console.log('ritesh2')
        // const filteredCourses = await dispatch(filteredCourses());
    }

    return (
        <HomeLayout>
            <Toaster />
            <div>
                <select name="category" id="category">
                    <option value="" onClick={() => setOption(false)}>category</option>
                    <option value="development" onClick={handleClick} >development</option>
                </select>
            </div>
            {
                option == false ? <div className="flex flex-wrap p-[2rem] gap-5">
                    {courseData?.map(c => {
                        return <CourseCard
                            key={c._id}
                            data={c} />
                    })}
                </div> : <div className="flex flex-wrap p-[2rem] gap-5">
                    {courseData?.filter(c => {
                        console.log('1')
                        if (c.category == 'development') return <CourseCard
                            key={c._id}
                            data={c} />
                    })}
                </div>
            }
            {/* <div className="flex flex-wrap p-[2rem] gap-5">
                {courseData?.map(c => {
                    return <CourseCard
                        key={c._id}
                        data={c} />
                })}
            </div> */}
        </HomeLayout >
    )
}

export default CourseList;