import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const dummyData = [
  { id: 1, title: "Artwork 1", description: "Description 1", link: "/exhibition/1", image: "/images/art1.jpg" },
  { id: 2, title: "Artwork 2", description: "Description 2", link: "/exhibition/2", image: "/images/art2.jpg" },
  { id: 3, title: "Artwork 3", description: "Description 3", link: "/exhibition/3", image: "/images/art3.jpg" },
];

function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      Next
    </div>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full cursor-pointer"
      onClick={onClick}
    >
      Prev
    </div>
  );
}

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className="carousel-container relative">
      <Slider {...settings}>
        {dummyData.map((art) => (
          <div key={art.id} className="carousel-item p-4">
            <img src={art.image} alt={art.title} className="w-full h-auto" />
            <h3 className="text-xl font-bold mt-2">{art.title}</h3>
            <p className="text-gray-600">{art.description}</p>
            <a href={art.link} className="text-blue-500 underline mt-2 block">Learn more</a>
          </div>
        ))}
      </Slider>
    </div>
  );
}
