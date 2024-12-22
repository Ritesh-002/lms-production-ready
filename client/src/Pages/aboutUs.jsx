import HomeLayout from "../Layouts/homeLayout";
import aboutUsMainImage from '../assets/about-us-main-image.png';
import CarouselSlide from "../Components/carouselSlide";
import { reviewData } from "../Constants/reviewData";

function AboutUs() {

    return (
        <HomeLayout>
            <div>
                <div className="w-full px-[5rem] flex gap-10 justify-between items-center">
                    <div className="w-1/2 flex flex-col gap-5">
                        <p className="text-5xl font-semibold text-purple-500">Affordable and quality education</p>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Distinctio cumque commodi eius explicabo impedit! Minima aliquam nihil maxime reiciendis pariatur voluptate fugit, voluptates voluptatem repudiandae cupiditate incidunt consectetur enim nulla corporis perspiciatis, ipsum labore delectus fuga nostrum cum. Eveniet eos optio vitae officiis obcaecati? Cumque laboriosam eius alias magni vitae.</p>
                    </div>
                    <div className="w-1/2">
                        <img className="w-auto h-auto" src={aboutUsMainImage} alt="about-us-image" />
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <p className="text-5xl text-purple-500 font-semibold">Reviews by great personalities</p>

                    {/* Carousel */}

                    <div className="carousel w-full py-[2rem]">
                        {/* Slides */}
                        {/* <div id="slide1" className="carousel-item relative w-full">

                            <div className="card card-side h-80  mt-0 m-auto w-1/2 bg-[#191E24] shadow-xl">
                                <figure><img className="h-full w-full" src={emily} alt="Movie" /></figure>
                                <div className="card-body w-2/3">
                                    <h2 className="card-title text-[#e7e7e7]">Emily potter</h2>
                                    <i className="text-xs text-[#e7e7e7]">Associate software developer</i>
                                    <p className="text-sm text-[#e7e7e7]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus odio, maiores atque autem beatae saepe excepturi labore aspernatur consequatur inventore qui ut nihil neque est?</p>
                                    <div className="card-actions justify-end">
                                        <div className="flex text-[#e7e7e7] gap-2">
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoStarHalfSharp size={'32px'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide5" className="btn btn-circle">❮</a>
                                <a href="#slide2" className="btn btn-circle">❯</a>
                            </div>
                        </div>

                        <div id="slide2" className="carousel-item relative w-full">

                            <div className="card card-side h-80  mt-0 m-auto w-1/2 bg-[#191E24] shadow-xl">
                                <figure><img className="h-full w-full" src={david} alt="Movie" /></figure>
                                <div className="card-body w-2/3">
                                    <h2 className="card-title text-[#e7e7e7]">David jr</h2>
                                    <i className="text-xs text-[#e7e7e7]">Full Stack developer</i>
                                    <p className="text-sm text-[#e7e7e7]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus odio, maiores atque autem beatae saepe excepturi labore aspernatur consequatur inventore qui ut nihil neque est?</p>
                                    <div className="card-actions text-[#e7e7e7] justify-end">
                                        <div className="flex gap-2">
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoStarOutline size={'32px'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide1" className="btn btn-circle">❮</a>
                                <a href="#slide3" className="btn btn-circle">❯</a>
                            </div>
                        </div>

                        <div id="slide3" className="carousel-item relative w-full">

                            <div className="card card-side h-80  mt-0 m-auto w-1/2 bg-[#191E24] shadow-xl">
                                <figure><img className="h-full w-full" src={laura} alt="Movie" /></figure>
                                <div className="card-body w-2/3">
                                    <h2 className="card-title text-[#e7e7e7]">Laura Hawkins</h2>
                                    <i className="text-xs text-[#e7e7e7]">Data Scientist</i>
                                    <p className="text-sm text-[#e7e7e7]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus odio, maiores atque autem beatae saepe excepturi labore aspernatur consequatur inventore qui ut nihil neque est?</p>
                                    <div className="card-actions justify-end">
                                        <div className="flex text-[#e7e7e7] gap-2">
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoStarHalfSharp size={'32px'} />
                                            <IoStarOutline size={'32px'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide2" className="btn btn-circle">❮</a>
                                <a href="#slide4" className="btn btn-circle">❯</a>
                            </div>
                        </div>

                        <div id="slide4" className="carousel-item relative w-full">

                            <div className="card card-side h-80  mt-0 m-auto w-1/2 bg-[#191E24] shadow-xl">
                                <figure><img className="h-full w-full" src={william} alt="Movie" /></figure>
                                <div className="card-body w-2/3">
                                    <h2 className="card-title text-[#e7e7e7]">William james</h2>
                                    <i className="text-xs text-[#e7e7e7]">Technical Writer</i>
                                    <p className="text-sm text-[#e7e7e7]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus odio, maiores atque autem beatae saepe excepturi labore aspernatur consequatur inventore qui ut nihil neque est?</p>
                                    <div className="card-actions text-[#e7e7e7] justify-end">
                                        <div className="flex gap-2">
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide3" className="btn btn-circle">❮</a>
                                <a href="#slide5" className="btn btn-circle">❯</a>
                            </div>
                        </div>

                        <div id="slide5" className="carousel-item relative w-full">

                            <div className="card card-side h-80  mt-0 m-auto w-1/2 bg-[#191E24] shadow-xl">
                                <figure><img className="h-full w-full" src={hannah} alt="Movie" /></figure>
                                <div className="card-body w-2/3">
                                    <h2 className="card-title  text-[#e7e7e7]">Hannah Baker</h2>
                                    <i className="text-xs text-[#e7e7e7]">Content moderator</i>
                                    <p className="text-sm text-[#e7e7e7]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus odio, maiores atque autem beatae saepe excepturi labore aspernatur consequatur inventore qui ut nihil neque est?</p>
                                    <div className="card-actions justify-end">
                                        <div className="flex gap-2 text-white">
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                            <IoIosStar size={'32px'} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                <a href="#slide4" className="btn btn-circle">❮</a>
                                <a href="#slide1" className="btn btn-circle">❯</a>
                            </div>
                        </div> */}

                        {reviewData.map(r => {
                            return (<CarouselSlide key={r.currentSlideNumber} img={r.img} title={r.title} designation={r.designation} description={r.description} noOfFullStars={r.noOfFullStars} noOfHalfStars={r.noOfHalfStars} noOfOutlineStars={r.noOfOutlineStars} currentSlideNumber={r.currentSlideNumber} totalSlides={reviewData.length} />)
                        })}

                    </div>

                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;