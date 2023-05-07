import React, { memo } from "react";
import styles from "./Slider.module.scss";
import LazyLoadImage from "../../../../components/LazyLoadImage/LazyLoadImage";
import { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export const Slider = memo(({ slider }) => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      slidesPerView={1}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000 }}
      className={styles.sliderMain}
      loop={true}
    >
      {slider.map((fadeImage) => (
        <SwiperSlide style={{ height: "unset" }} key={fadeImage.id}>
          <div className={styles.imgContainer}>
            <LazyLoadImage
              slider={true}
              src={fadeImage.urlFile}
              alt={"slider"}
            />
            <div className={styles.text}>
              <p>{fadeImage.header}</p>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
