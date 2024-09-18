import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const dummyData = [
  { id: 1, title: "Artwork 1", image: "/images/art1.jpg" },
  { id: 2, title: "Artwork 2", image: "/images/art2.jpg" },
  { id: 3, title: "Artwork 3", image: "/images/art3.jpg" },
];

export default function Carousel() {
  return (
    <div>
      <Swiper spaceBetween={50} slidesPerView={1}>
        {dummyData.map((art) => (
          <SwiperSlide key={art.id}>
            <img src={art.image} alt={art.title} />
            <h3>{art.title}</h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
