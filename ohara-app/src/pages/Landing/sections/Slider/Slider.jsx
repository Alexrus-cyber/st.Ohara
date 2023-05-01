import React, { memo } from "react";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import styles from "./Slider.module.scss";
import LazyLoadImage from "../../../../components/LazyLoadImage/LazyLoadImage";

export const Slider = memo(({ slider }) => {
  return (
    <Fade cssClass={styles.sliderMain}>
      {slider.map((fadeImage) => (
        <div className={styles.imgContainer} key={fadeImage.id}>
          <LazyLoadImage slider={true} src={fadeImage.urlFile} alt={"slider"} />
          <div className={styles.text}>
            <p>{fadeImage.header}</p>
          </div>
        </div>
      ))}
    </Fade>
  );
});
