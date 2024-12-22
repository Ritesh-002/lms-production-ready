import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addLectureByCourseId } from "../../Redux/Slice/lectureSlice";
import { FaArrowLeft } from "react-icons/fa";
import HomeLayout from "../../Layouts/homeLayout";

function AddLectures() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const courseData = location.state;
    const [userInput, setUserInput] = useState({
        title: '',
        description: '',
        lecture: undefined,
        videoSrc: '',
    });

    function handleUserInput(e) {
        const { name, value } = e.target;
        setUserInput({
            ...userInput,
            [name]: value
        })
    }

    function handleVideoUpload(e) {
        const uploadedVideo = e.target.files[0];
        const uploadedVideoURL = window.URL.createObjectURL(uploadedVideo);
        if (uploadedVideo) {
            setUserInput({
                ...userInput,
                lecture: uploadedVideo,
                videoSrc: uploadedVideoURL
            })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!userInput.title || !userInput.description || !userInput.lecture) {
            toast.error("All fields mandatory");
            return;
        }
        const response = await dispatch(addLectureByCourseId([courseData._id, userInput]));
        if (response?.payload?.success) {
            setUserInput({
                title: '',
                description: '',
                lecture: undefined,
                videoSrc: '',
            })
            navigate(-1)
        }
    }


    return (
        <HomeLayout>
            <Toaster />
            <div className="w-1/3 h-auto m-auto mt-[2rem] shadow-[0_0_10px_black] rounded-md p-[1rem]">
                <header className="flex items-center justify-between">
                    <FaArrowLeft className="cursor-pointer" onClick={() => navigate(-1)} />
                    <button onClick={handleSubmit} className="px-[1rem] py-[0.5rem] rounded-md bg-blue-500 text-white font-semibold transition-all duration-300 ease-in-out hover:bg-blue-700 ">Click here to add lecture</button>
                </header>
                <form>
                    <div>
                        <label htmlFor="video_uploads">
                            {
                                userInput.videoSrc ? <video src={userInput.videoSrc} className="w-full h-52 mt-[2rem] rounded-lg"></video> : <div className="w-full h-52 cursor-pointer mt-[2rem] m-auto  border-2 border-black">
                                    <h1 className="text-center my-[5.5rem]">Upload Video</h1>
                                </div>
                            }
                        </label>
                        <input
                            onChange={(e) => handleVideoUpload(e)}
                            name="video_uploads"
                            id="video_uploads"
                            type="file"
                            accept="video/mp4, video/webm, video/ogg, video/mov, video/avi, video/mkv"
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-col gap-2 mt-[1rem]">
                        <label htmlFor="title">Enter Video Title</label>
                        <input
                            name="title"
                            id="title"
                            value={userInput.title}
                            onChange={(e) => handleUserInput(e)}
                            type="text"
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>
                    <div className="flex flex-col gap-2 mt-[1rem]">
                        <label htmlFor="title">Enter Video Description</label>
                        <textarea
                            name="description"
                            id="description"
                            value={userInput.description}
                            onChange={(e) => handleUserInput(e)}
                            type="text"
                            className='w-full resize-none h-32 rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>
                </form>
            </div>
        </HomeLayout>
    )
}

export default AddLectures;