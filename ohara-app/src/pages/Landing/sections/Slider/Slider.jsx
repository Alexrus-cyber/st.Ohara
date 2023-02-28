import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './Slider.module.css'

export const Slider = ({slider}) => {
    return (
        <div>
            <Fade cssClass={styles.sliderMain}>
                {slider.images.map((fadeImage, index) => (
                    <div key={index}>
                        <img className={styles.img} src={fadeImage.url}  alt={"fdsfds"}/>
                        <div className={styles.text}>
                            <p>{fadeImage.caption}</p>
                        </div>
                    </div>
                ))}
            </Fade>
        </div>
    )
}