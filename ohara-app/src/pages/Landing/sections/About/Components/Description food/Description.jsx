import styles from "../../About.module.scss";
import LazyLoadImage from "../../../../../../components/LazyLoadImage/LazyLoadImage";
import cl from "classnames";
import { memo, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export const Description = memo(({ text, img, title, isLeftPosition }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  useEffect(() => {
    if (inView) {
      setIsLoaded(true);
    }
  }, [inView]);
  return (
    <>
      {isLeftPosition && (
        <div
          ref={ref}
          className={cl(styles.itemContainer, {
            [styles.itemContainerLoad]: isLoaded,
          })}
        >
          <div className={styles.imgMobile}>
            <LazyLoadImage src={img} alt={"food"} custom={styles.custom} />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{title}</p>
            <p className={styles.text}>{text}</p>
          </div>
          <div className={styles.imgRight}>
            <LazyLoadImage custom={styles.custom} src={img} alt={"food"} />
          </div>
        </div>
      )}{" "}
      {!isLeftPosition && (
        <div
          ref={ref}
          className={cl(styles.itemContainer, {
            [styles.itemContainerLoad]: isLoaded,
          })}
        >
          <div className={styles.img}>
            <LazyLoadImage src={img} custom={styles.custom} />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{title}</p>
            <p className={styles.text}>{text}</p>
          </div>
        </div>
      )}
    </>
  );
});
