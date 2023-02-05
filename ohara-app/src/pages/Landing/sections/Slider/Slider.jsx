import React from 'react';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import styles from './Slider.module.css'
import photo1 from '../../../../assets/slider3.png'
import photo3 from '../../../../assets/slider1.png'
import photo2 from '../../../../assets/slider2.png'


const fadeImages = [
    {
        url: photo1,
        caption: 'Атмосфера в нашем ресторане'
    },
    {
        url: photo2,
        caption: 'Вкусное мясо, отличный виски!'
    },
    {
        url: photo3,
        caption: 'Мы реально крутые'
    },
];

export const Slider = () => {
    return (
        <div>
            <Fade cssClass={styles.sliderMain}>
                {fadeImages.map((fadeImage, index) => (
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