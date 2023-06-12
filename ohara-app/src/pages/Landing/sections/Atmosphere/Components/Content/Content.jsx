import styles from "../../Atmosphere.module.scss";
import { NavLink } from "react-router-dom";
import cl from "classnames";
import LazyLoadImage from "../../../../../../components/LazyLoadImage/LazyLoadImage";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const Content = ({ img, text, title, isLeftPosition }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  useEffect(() => {
    if (inView) {
      setIsLoaded(true);
    }
  }, [inView]);
  return (
    <>
      {!isLeftPosition ? (
        <div
          ref={ref}
          className={cl(styles.itemContainer, {
            [styles.itemContainerLoad]: isLoaded,
          })}
        >
          <div className={styles.imgMobile}>
            <LazyLoadImage
              custom={styles.customMobile}
              src={img}
              alt={"barman"}
            />
          </div>
          <div className={styles.backContainer}>
            <div className={styles.img}>
              <LazyLoadImage custom={styles.custom} src={img} alt={"barman"} />
            </div>
            <div className={styles.back}></div>
          </div>
          <div className={styles.textContainer}>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      ) : (
        <div
          ref={ref}
          className={cl(styles.itemContainer, {
            [styles.itemContainerLoad]: isLoaded,
          })}
        >
          <div className={styles.imgMobile}>
            <LazyLoadImage
              custom={styles.customMobile}
              src={img}
              alt={"barman"}
            />
          </div>
          <div className={styles.textContainer}>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.text}>{text}</p>
            <div className={styles.buttonContainer}>
              <div className={styles.backButton}></div>
              <NavLink className={styles.button} to={"/menu"}>
                Меню
              </NavLink>
            </div>
          </div>
          <div className={styles.backContainer}>
            <div className={styles.imgRight}>
              <LazyLoadImage custom={styles.custom} src={img} alt={"barman"} />
            </div>
            <div
              className={cl(styles.backRevert, {
                [styles.back]: isLeftPosition === 0,
              })}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
