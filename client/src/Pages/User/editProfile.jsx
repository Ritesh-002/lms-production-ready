import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";
import { CgProfile } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import HomeLayout from '../../Layouts/homeLayout.jsx'
import { editUser, getUser } from "../../Redux/Slice/authSlice.js";
import { FaArrowLeft } from "react-icons/fa";

function EditProfile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        fullName: '',
        avatar: undefined,
        previewImage: '',
        userId: useSelector((state) => state?.auth?.data?._id)
    })

    function handleUserInput(e) {
        e.preventDefault();
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        })
    }

    function handleImageUpload(e) {
        e.preventDefault()
        const uploadedImage = e.target.files[0];
        console.log(uploadedImage)
        if (uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener('load', function () {
                setData({
                    ...data,
                    previewImage: this.result,
                    avatar: uploadedImage,
                })
                // console.log("AVATAR ", data.avatar)
                // console.log("PREVIEW IMAGE ", data.previewImage)
            })
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        // console.log('data', data)
        if (!data.previewImage || !data.fullName) {
            toast.error('All fields are mandatory')
            return;
        }

        if (data.fullName.length <= 3) {
            toast.error('Enter valid name')
            return;
        }

        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("avatar", data.avatar);
        await dispatch(editUser([data.userId, formData]))
        const response = await dispatch(getUser());
        if (response?.payload?.success) {
            // navigate(-1);
        }
    }

    function handleArrowClick() {
        navigate(-1)
    }

    return (
        <HomeLayout>
            <Toaster />
            <div className="shadow-2xl mt-[2rem] m-auto p-[1rem] w-1/2 h-auto">
                <FaArrowLeft className="cursor-pointer" onClick={handleArrowClick} />
                <form noValidate onSubmit={handleSubmit} className="w-full">
                    <h1 className="font-bold text-3xl text-purple-500 pb-[0.5rem] text-center">EDIT PROFILE</h1>
                    <div className="w-full">
                        <label htmlFor="image_uploads">
                            {
                                !data.previewImage ? <CgProfile className="m-auto w-48 h-auto cursor-pointer" /> : <img src={data.previewImage} className="w-48 rounded-full m-auto h-auto" alt="preview image" />
                            }
                        </label>
                        <input
                            onChange={handleImageUpload}
                            type="file"
                            accept=".png, .jpeg, .jpg"
                            className="hidden"
                            name="image_uploads"
                            id="image_uploads"

                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="fullName">Name</label>
                        <input
                            value={data.fullName}
                            onChange={handleUserInput}
                            type="text"
                            name="fullName"
                            id="fullName"
                            className='w-full rounded-md p-2 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-300' />
                    </div>
                    <button type="submit" className="w-1/3 mt-[1rem] p-2 text-center px-[1rem] bg-red-500 rounded-md text-white hover:bg-red-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg">Submit</button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile