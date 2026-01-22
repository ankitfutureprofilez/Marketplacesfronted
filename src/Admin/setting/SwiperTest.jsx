import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs } from "swiper/modules";
import { EasyZoomOnHover } from "easy-magnify";

import "swiper/css";

export default function ProductImageGallery({ selectedVariant }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [
    "https://images.unsplash.com/photo-1768463852017-921060ff24fe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDN8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1768452523244-11bba3ab7d51?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDZ8RnpvM3p1T0hONnd8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1766903882059-931704d12a20?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1768310512589-5925669f1784?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D",
  ];

  if (!images.length) return null;

  return (
    <div className="flex gap-4 w-full">
      {/* ================= LEFT: THUMBNAILS ================= */}
      <div className="w-[72px]">
        <Swiper
          direction="vertical"
          slidesPerView={5}
          spaceBetween={10}
          watchSlidesProgress
          modules={[Thumbs]}
          className="h-[420px]"
        >
          {images.map((img, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer"
              onMouseEnter={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
            >
              <div
                className={`relative aspect-square rounded-md overflow-hidden border
                ${
                  activeIndex === index
                    ? "border-black"
                    : "border-gray-300 hover:border-black"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ================= RIGHT: MAIN IMAGE + ZOOM ================= */}
      <div className="flex-1 max-w-[500px]">
        <div className="relative aspect-[4/5] rounded-lg overflow-visible">
          <EasyZoomOnHover
            key={activeIndex} // 🔑 critical for re-init
            mainImage={{
              src: images[activeIndex],
              alt: "Product Image",
              width: 500,
              height: 625,
            }}
            zoomImage={{
              src: images[activeIndex], // use higher-res if available
              alt: "Zoom Image",
            }}
            zoomContainerWidth={520}
            zoomContainerHeight={520}
            zoomLensScale={3}
            distance={16}
          />
        </div>
      </div>
    </div>
  );
}
