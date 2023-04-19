import styles from "../../Atmosphere.module.scss";
import { NavLink } from "react-router-dom";
import cl from "classnames";
import LazyLoadImage from "../../../../../../components/LazyLoadImage/LazyLoadImage";

export const Content = ({ img, text2, text1, title, isLeftPosition }) => {
  return (
    <>
      {!isLeftPosition ? (
        <div className={styles.itemContainer}>
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
            <p className={styles.text}>{text1}</p>
            <p className={styles.text}>{text2}</p>
          </div>
        </div>
      ) : (
        <div className={styles.itemContainer}>
          <div className={styles.imgMobile}>
            <LazyLoadImage
              custom={styles.customMobile}
              src={img}
              alt={"barman"}
            />
          </div>
          <div className={styles.textContainer}>
            <h5 className={styles.title}>{title}</h5>
            <p className={styles.text}>{text1}</p>
            <p className={styles.text}>{text2}</p>
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
