import { useNavigate } from "react-router-dom"
import notFoundImage from '../assets/page-not-found-image.png'
function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col bg-[#405264] items-center justify-center m-auto">
            <img className="w-96 h-96" src={notFoundImage} alt="" />
            <p className="text-yellow-600 text-lg font-semibold">We couldn't load this page</p>
            <button className="my-[1rem] px-[1rem] py-[0.4rem] bg-yellow-500 rounded-md text-lg text-white font-semibold" onClick={() => navigate(-1)}>Go back</button>
        </div>

    )
}

export default NotFound