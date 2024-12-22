import { IoIosStar } from "react-icons/io";
import React from 'react'
import { IoStarHalfSharp, IoStarOutline } from "react-icons/io5";

function CarouselSlide({ img, title, designation, description, noOfFullStars, noOfHalfStars, noOfOutlineStars, currentSlideNumber, totalSlides }) {

    const prevSlideNumber = currentSlideNumber === 1 ? totalSlides : currentSlideNumber - 1;
    const nextSlideNumber = currentSlideNumber === totalSlides ? 1 : currentSlideNumber + 1;

    return (
        <div id={`slide${currentSlideNumber}`} className="carousel-item relative w-full">

            <div className="card card-side h-80  mt-0 m-auto w-1/2 bg-[#191E24] shadow-xl">
                <figure><img className="h-full w-full" src={img} alt="Movie" /></figure>
                <div className="card-body w-2/3">
                    <h2 className="card-title text-[#e7e7e7]">{title}</h2>
                    <i className="text-xs text-[#e7e7e7]">{designation}</i>
                    <p className="text-sm text-[#e7e7e7]">{description}</p>
                    <div className="card-actions justify-end">
                        <div className="flex text-[#e7e7e7] gap-2">

                            {Array.from({ length: noOfFullStars }, (_, index) => (
                                <IoIosStar key={index} size={'32px'} />
                            ))}

                            {Array.from({ length: noOfHalfStars }, (_, index) => (
                                <IoStarHalfSharp key={index} size={'32px'} />
                            ))}

                            {Array.from({ length: noOfOutlineStars }, (_, index) => (
                                <IoStarOutline key={index} size={'32px'} />
                            ))}


                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href={`#slide${prevSlideNumber}`} className="btn btn-circle">❮</a>
                <a href={`#slide${nextSlideNumber}`} className="btn btn-circle">❯</a>
            </div>
        </div>
    )
}

export default CarouselSlide;