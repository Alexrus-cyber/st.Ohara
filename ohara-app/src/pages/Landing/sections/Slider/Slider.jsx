import React from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.scss";
import LazyLoadImage from "../../../../components/LazyLoadImage/LazyLoadImage";

export const Slider = ({ slider }) => {
  return (
    <div>
      <Fade cssClass={styles.sliderMain}>
        {slider.images.map((fadeImage, index) => (
          <div className={styles.imgContainer} key={index}>
            <LazyLoadImage slider={true} src={fadeImage.src} alt={"slider"} />
            <div className={styles.text}>
              <p>{fadeImage.caption}</p>
            </div>
          </div>
        ))}
      </Fade>
    </div>
  );
};
