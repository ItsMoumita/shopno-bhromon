import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ResortCard = ({ resort }) => (
  <div className="relative w-full h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group">
    <img
      src={resort.coverImage}
      alt={resort.name}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
      <h3 className="font-bold text-2xl tracking-wide">{resort.name}</h3>
      <p className="text-sm">{resort.location}</p>
      <p className="mt-2 font-semibold text-[#FFD700]">
        ৳{resort.pricePerNight?.toLocaleString()} / night
      </p>
      <p className="mt-2 font-semibold text-[#FFD700]">
        ⭐ {resort.rating?.toFixed(1) || "N/A"}
      </p>
    </div>
  </div>
);

export default function RecentResortsCarousel() {
  const axiosSecure = useAxiosSecure();
  const [resorts, setResorts] = useState([]);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await axiosSecure.get("/resorts?limit=10");
        setResorts(res.data);
      } catch (err) {
        console.error("Failed to fetch resorts:", err);
      }
    };
    fetchResorts();
  }, [axiosSecure]);

  return (
    <section className="w-full flex flex-col items-center justify-center font-sans overflow-hidden py-12 md:py-20 bg-gray-50 dark:bg-[#12121c]">
      <div data-aos="zoom-in" className="w-full max-w-7xl mx-auto px-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Explore Top <span className="text-[#4657F0]">Resorts</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Discover the best resorts for your next vacation.
          </p>
        </header>

        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 50,  
            stretch: 0,  
            depth: 200,   
            modifier: 1,
            slideShadows: true, 
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          slidesPerView={3}
          breakpoints={{
            640: { slidesPerView: 1.3 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper w-full max-w-[1000px]"
        >
          {resorts.map((resort) => (
            <SwiperSlide key={resort._id} className="flex justify-center">
              <ResortCard resort={resort} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
