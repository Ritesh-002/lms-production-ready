import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import HomeLayout from '../../Layouts/homeLayout.jsx'
import { Toaster } from "react-hot-toast";


function UserProfile() {
    const userData = useSelector((state) => state?.auth?.data)

    useEffect(() => {
        console.log(userData)
    }, [])

    return (
        <HomeLayout>
            <Toaster />
            <div className="h-auto flex flex-col gap-2 items-center w-1/2 m-auto p-[1rem]">
                <img src={userData.avatar.secure_url} className="w-1/3 cursor-pointer h-auto rounded-md" alt="" />
                <p className="text-white text-2xl font-semibold tracking-wide ">
                    {userData.role}
                </p>
                <div className="ml-[9rem]">
                    <p className="text-purple-500 text-lg font-semibold">Name <span className="text-white font-semibold text-lg tracking-wider ml-[5rem]">{userData.fullName}</span> </p>
                    <p className="text-purple-500 text-lg font-semibold">Email <span className="text-white font-semibold text-lg tracking-wider ml-[5rem]">{userData.email}</span> </p>
                    <p className="text-purple-500 text-lg font-semibold">Subscription <span className="text-white font-semibold text-lg tracking-wider ml-[5rem]">{userData.subscription?.status}</span> </p>
                </div>
                <div className="flex gap-2 ml-[5rem]">
                    <button className="text-white font-semibold text-lg rounded-md px-[1rem] py-[0.5rem] bg-purple-500 transition-all duration-300 ease-in-out hover:bg-purple-700">Forgot password</button>
                    <Link to={'/user/profile/edit'}><button className="text-white font-semibold text-lg rounded-md px-[1rem] py-[0.5rem] bg-purple-500 transition-all duration-300 ease-in-out hover:bg-purple-700">Edit profile</button></Link>
                </div>
                <div className="-ml-6 mt-2">
                    <button className="text-white font-semibold text-lg rounded-md px-[1rem] py-[0.5rem] bg-red-500 transition-all duration-300 ease-in-out hover:bg-red-700">Cancel subscription</button>

                </div>
            </div>
        </HomeLayout>
    )
}

export default UserProfile