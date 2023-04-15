import styles from "../../Atmosphere.module.scss";
import { NavLink } from "react-router-dom";
import cl from "classnames";

export const Content = (props) => {
  return (
    <>
      {!props.isLeftPosition ? (
        <div className={styles.itemContainer}>
          <img className={styles.imgMobile} src={props.img} alt={"barman"} />
          <div className={styles.backContainer}>
            <img className={styles.img} src={props.img} alt={"barman"} />
            <div className={styles.back}></div>
          </div>
          <div className={styles.textContainer}>
            <h5 className={styles.title}>{props.title}</h5>
            <p className={styles.text}>{props.text1}</p>
            <p className={styles.text}>{props.text2}</p>
          </div>
        </div>
      ) : (
        <div className={styles.itemContainer}>
          <img className={styles.imgMobile} src={props.img} alt={"barman"} />
          <div className={styles.textContainer}>
            <h5 className={styles.title}>{props.title}</h5>
            <p className={styles.text}>{props.text1}</p>
            <p className={styles.text}>{props.text2}</p>
            <div className={styles.buttonContainer}>
              <div className={styles.backButton}></div>
              <button className={styles.button}>
                <NavLink className={styles.link} to={"/menu"}>
                  Меню
                </NavLink>
              </button>
            </div>
          </div>
          <div className={styles.backContainer}>
            <img className={styles.imgRight} src={props.img} alt={"barman"} />
            <div
              className={cl(styles.backRevert, {
                [styles.back]: props.left === 0,
              })}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};
