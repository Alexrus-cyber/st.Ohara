import styles from "./Hero.module.scss";
import arrows from "../../../../assets/down-arrow 1.png";

export const Hero = ({ hero, handleClick }) => {
  return (
    <section
      style={{
        background: `linear-gradient(rgb(0 0 0 / 50%), rgb(0 0 0 / 50%)),center / cover no-repeat url(${hero.urlFile})`,
      }}
      className={styles.hero}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.title}>{hero.header}</p>
          <div className={styles.imgContainer}>
            <img
              onClick={handleClick}
              className={styles.img}
              src={arrows}
              alt={"arrow"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
