"use client";
import React, { useEffect, useRef, useState } from "react";
import hotel_image_1 from "../../../../public/assets/hr_1.jpg";
import hotel_image_2 from "../../../../public/assets/hr_2.jpg";
import Image from "next/image";
import { register } from "swiper/element/bundle";
import { AiFillStar } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { FaBed, FaWifi } from "react-icons/fa";
import Review from "./Review";
import { useParams } from "next/navigation"; 
import BookModal from "@/components/book-modal/BookModal";

register();

const HotelDetails = ({params}) => {
  const routerParams = useParams();  
  const [resolvedParams, setResolvedParams] = useState(null);

  useEffect(() => {
    async function fetchParams() {
      if (params instanceof Promise) {
        const resolved = await params;
        setResolvedParams(resolved);
      } else {
        setResolvedParams(params);
      }
    }
    fetchParams();
  }, [params]);
  const id = resolvedParams?.id ?? routerParams.id;
  const [selectedStar, setSelectedStar] = useState(5);
  const [showModal, setShowModal] = useState(false);
  const swiperElRef = useRef(null);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  // Formatting price properly
  const formatPrice = (amount, currency) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  return (
    <div className={`min-h-screen w-full mt-24 ${showModal && "overflow-hidden"}`}>
      {showModal && <BookModal 
        handleHideModal={handleHideModal}
      />}
      <div className="h-full w-3/4 mx-auto">
        <div className="w-full h-[750px] overflow-hidden mx-auto">
          <div className="w-full h-full">
            <swiper-container
              ref={swiperElRef}
              slides-per-view="1"
              navigation="true"
              pagination="true"
            >
              <swiper-slide>
                <Image src={hotel_image_1} alt="Hotel 1" className="h-[750px] w-full object-cover" />
              </swiper-slide>
              <swiper-slide>
                <Image src={hotel_image_2} alt="Hotel 2" className="h-[750px] w-full object-cover" />
              </swiper-slide>
            </swiper-container>
          </div>
        </div>

        {/* Hotel Name and Rating */}
        <div className="mt-12 px-6 w-full flex items-center justify-between">
          <h2 className="font-bold text-4xl">Arabian Paradise</h2>
          <div>
            <span className="p-2 px-4 text-[22px] rounded-full bg-blue-600 text-white flex items-center gap-2">
              <AiFillStar color="white" />
              <span className="text-white">4.7</span>
            </span>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="mt-16 px-6 flex items-center gap-8 text-xl">
          <span className="flex items-center gap-2">
            <CiLocationOn size={22} /> Dubai, UAE
          </span>
          <span className="text-blue-600 font-bold">
            {formatPrice(5500, "INR")}/night
          </span>
          <span className="flex items-center gap-2">
            2 <FaBed />
          </span>
          <span className="flex items-center gap-2">
            Free <FaWifi />
          </span>
        </div>

        {/* Hotel Description and Booking */}
        <div className="mt-16 px-6 w-full flex items-end justify-between">
          <p className="text-xl max-w-xl text-slate-700">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, provident aut ex dolore cum alias quaerat iure eos perferendis eaque!
          </p>
          <button
            onClick={handleShowModal}
            className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500"
          >
            Book
          </button>
        </div>

        {/* Reviews */}
        <div className="border-t-2 border-white-800 px-6 mt-16 mx-auto">
          <h1 className="mt-16 text-3xl font-bold">Reviews</h1>
          <div className="mt-8 flex items-center gap-6">
            {Array.from({ length: 5 }, (_, index) => index).map((number) => (
              <span
                key={number}
                onClick={() => setSelectedStar(number + 1)}
                className={`${selectedStar === number + 1 ? "scale-125" : ""}
                cursor-pointer flex items-center gap-2 transition-all`}
              >
                {number+1}
                <AiFillStar 
                  size={22} 
                  color="rgb(59, 130, 246)"
                />
              </span>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-28 border rounded-lg py-4 px-6 w-max">
            <input className="outline-none" type="text" placeholder="Leave your opinion..."/>
            <button className="cursor-pointer rounded-lg py-2 px-6 text-xl text-white bg-blue-500 hover:bg-blue-400 transition-all">
              Post
            </button>
          </div>
          {/* Reviews section */}
          <Review/>
          <Review/>
          <Review/>
          <Review/>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
