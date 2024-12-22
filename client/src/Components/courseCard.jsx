import { Link, useNavigate } from "react-router-dom"

function CourseCard({ data }) {
    const navigate = useNavigate()
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
            <figure><img className="w-full h-52" src={data.thumbnail.secure_url} alt="course thumbnail" /></figure>
            <div className="card-body">
                <h2 className="card-title">{data.title}</h2>
                <p className="text-purple-500 font-semibold text-lg ">Created By: <span className="text-md font-semibold text-white">{data.createdBy}</span></p>
                <p className="text-purple-500 font-semibold text-lg">Category: <span className="text-md font-semibold text-white">{data.category}</span></p>
                <div className="ml-[0rem] m-[1rem] items-center">
                    <button onClick={() => navigate('/course/description', { state: { ...data } })} className="p-[1rem] rounded-md font-semibold bg-purple-500 text-white">View Course</button>
                </div>
            </div>
        </div>
    )
}
export default CourseCard