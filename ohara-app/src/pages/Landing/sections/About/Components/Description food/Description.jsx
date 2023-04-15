import styles from "../../About.module.scss";

export const Description = (props) => {
  return (
    <>
      {props.isLeftPosition ? (
        <div className={styles.itemContainer}>
          <img className={styles.imgMobile} src={props.img} alt="food" />
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{props.title}</p>
            <p className={styles.text}>{props.text}</p>
          </div>
          <img className={styles.imgRight} src={props.img} alt="food" />
        </div>
      ) : (
        <div className={styles.itemContainer}>
          <img className={styles.img} src={props.img} alt="food" />
          <div className={styles.textContainer}>
            <p className={styles.subtitle}>{props.title}</p>
            <p className={styles.text}>{props.text}</p>
          </div>
        </div>
      )}
    </>
  );
};
