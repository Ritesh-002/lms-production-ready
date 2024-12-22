import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { createCourse } from "../../Redux/Slice/courseSlice";
import HomeLayout from "../../Layouts/homeLayout";
import { FaArrowLeft, FaRegImage } from "react-icons/fa";

function CreateCourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userInputData, setUserInputData] = useState({
        title: "",
        description: "",
        category: "",
        thumbnail: null,
        createdBy: "",
        previewImage: "",
        instructor: ""
    })

    function handleUserInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setUserInputData({
            ...userInputData,
            [name]: value
        })
    }

    function handleInputImage(event) {
        event.preventDefault();
        const uploadImage = event.target.files[0];
        console.log(uploadImage)
        if (uploadImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadImage);
            fileReader.addEventListener('load', function () {
                console.log('this.result', this.result)
                setUserInputData({
                    ...userInputData,
                    previewImage: this.result,
                    thumbnail: uploadImage,
                })
            })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!userInputData.title || !userInputData.category || !userInputData.createdBy || !userInputData.description) {
            toast.error('All fields are required')
            return;
        }

        const response = await dispatch(createCourse(userInputData));

        if (response?.payload?.success) {
            setUserInputData({
                title: "",
                description: "",
                category: "",
                thumbnail: null,
                createdBy: "",
                previewImage: "",
                instructor: ""
            })
            navigate('/courses')
        }

    }

    return (
        <HomeLayout>
            <Toaster />
            <div className="h-auto w-1/2  m-auto p-[1rem]">
                <form className="w-full">
                    <FaArrowLeft onClick={() => { navigate(-1) }} className="cursor-pointer text-white text-lg" />
                    <div>
                        <label className="w-full" htmlFor="image_uploads">
                            {
                                !userInputData.previewImage ? <FaRegImage className="cursor-pointer m-auto" size={'250px'} /> : <img src={userInputData.previewImage} alt="preview image" className="w-60 m-auto rounded-lg h-auto" />
                            }
                        </label>
                        <input
                            onChange={handleInputImage}
                            type="file"
                            name="image_uploads"
                            id="image_uploads"
                            accept=".jpg, .jpeg, .png"
                            className="hidden" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Title</label>
                        <input
                            value={userInputData.title}
                            onChange={handleUserInput}
                            type="text"
                            name="title"
                            id="title"
                            className="w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="title">Description</label>
                        <input
                            value={userInputData.description}
                            onChange={handleUserInput}
                            type="textbox"
                            name="description"
                            id="description"
                            className="w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="createdBy">Created By</label>
                        <input
                            value={userInputData.createdBy}
                            onChange={handleUserInput}
                            type="text"
                            name="createdBy"
                            id="createdBy"
                            className="w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="instructor">Instructor</label>
                        <input
                            value={userInputData.instructor}
                            onChange={handleUserInput}
                            type="text"
                            name="instructor"
                            id="instructor"
                            className="w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="category">Category</label>
                        <input
                            value={userInputData.category}
                            onChange={handleUserInput}
                            type="text"
                            name="category"
                            id="category"
                            className="w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                    <button type="submit"
                        onClick={handleSubmit}
                        className='px-[1rem] w-1/3 mt-[1rem] bg-purple-500 rounded-md text-white hover:bg-purple-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg'>Create</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse