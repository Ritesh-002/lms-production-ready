import { BsInstagram, BsTwitter, BsFacebook, BsDiscord } from "react-icons/bs";

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
    return <>
        <footer className="relative bg-[#191E24] mt-[1.5rem] md:px-[1rem] left-0 bottom-0 h-[10vh] py-5 flex flex-col md:flex-row items-center justify-between">
            <section className="text-lg">
                Copyright {year} reserved
            </section>
            <section className="flex gap-5 items-center justify-center text-2xl text-white">
                <a href="" className="t
                ransition-all duration-300 ease-in-out hover:text-gray-500"><BsInstagram /></a>
                <a href="" className="transition-all duration-300 ease-in-out hover:text-gray-500"><BsTwitter /></a>
                <a href="" className="transition-all duration-300 ease-in-out hover:text-gray-500"><BsFacebook /></a>
                <a href="" className="transition-all duration-300 ease-in-out hover:text-gray-500"><BsDiscord /></a>
            </section>
        </footer>
    </>
}

export default Footer