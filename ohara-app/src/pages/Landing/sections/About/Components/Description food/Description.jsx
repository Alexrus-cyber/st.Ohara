import styles from "../../About.module.scss";
import LazyLoadImage from "../../../../../../components/LazyLoadImage/LazyLoadImage";

export const Description = (props) => {
  return (
    <>
      {props.isLeftPosition ? (
        <div className={styles.itemContainer}>
          <div className={styles.imgMobile}>
            <LazyLoadImage
              src={props.img}
              alt={"food"}
              custom={styles.custom}
            />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{props.title}</p>
            <p>{props.text}</p>
          </div>
          <div className={styles.imgRight}>
            <LazyLoadImage
              custom={styles.custom}
              src={props.img}
              alt={"food"}
            />
          </div>
        </div>
      ) : (
        <div className={styles.itemContainer}>
          <div className={styles.img}>
            <LazyLoadImage src={props.img} custom={styles.custom} />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{props.title}</p>
            <p>{props.text}</p>
          </div>
        </div>
      )}
    </>
  );
};
