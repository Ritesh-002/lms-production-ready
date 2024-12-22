import { useNavigate } from "react-router-dom";

function AccessDenied() {
    const navigate = useNavigate();
    function handleNavigate() {
        navigate(-1)
    }
    return (
        <div className="flex flex-col gap-2 mt-[7rem] m-auto items-center justify-center">
            <h1 className="text-9xl font-bold text-white">403</h1>
            <p className="tracking-wide text-lg font-semibold">Access denied</p>
            <button onClick={handleNavigate} className="px-[1rem] py-[0.5rem] rounded-md bg-purple-500 font-semibold text-white ">Go Back</button>
        </div>
    )
}

export default AccessDenied;