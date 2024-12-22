import { Link } from "react-router-dom";
import HomeLayout from "../Layouts/homeLayout";
import coursifyHomePageImage from '../assets/coursify-home-page-image.png';
import { Toaster } from "react-hot-toast";
function HomePage() {
    return (
        <HomeLayout>
            <Toaster />
            <div className="flex items-center px-[5rem] py-[1.5rem] gap-20">
                <div className="w-1/2 flex flex-col gap-5">
                    <p className="text-5xl font-semibold">Find out best <span className="text-purple-500">Online Courses</span></p>
                    <p>We have a large library of courses taught by highly skilled and qualified faculties at very affordable cost</p>
                    <div className="flex gap-5">
                        <Link to='/courses'><button className="px-[1rem] bg-orange-500 rounded-md text-white hover:bg-orange-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg">Explore courses</button></Link>
                        <Link to='/contact-us'><button className="px-[1rem] bg-purple-500 rounded-md text-white hover:bg-purple-700 transition-all ease-in-out duration-300 font-semibold py-[0.4rem] text-lg">Contact us</button></Link>
                    </div>
                </div>
                <div className="w-1/2">
                    <img className="w-full items-start h-96" src={coursifyHomePageImage} alt="" />
                </div>
            </div>
        </HomeLayout>
    )
}

export default HomePage;