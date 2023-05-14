import styles from "../../About.module.scss";
import LazyLoadImage from "../../../../../../components/LazyLoadImage/LazyLoadImage";

export const Description = ({ text, img, title, isLeftPosition }) => {
  return (
    <>
      {isLeftPosition ? (
        <div className={styles.itemContainer}>
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
      ) : (
        <div className={styles.itemContainer}>
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
};
