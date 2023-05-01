import styles from "./Hero.module.scss";
import arrows from "../../../../assets/down-arrow 1.png";

export const Hero = ({ hero }) => {
  return (
    <section
      style={{ backgroundImage: `url(${hero.urlFile})` }}
      className={styles.hero}
    >
      <div className={styles.container}>
        <div className={styles.text}>
          <p className={styles.title}>{hero.header}</p>
          <div className={styles.imgContainer}>
            <img className={styles.img} src={arrows} alt={"arrow"} />
          </div>
        </div>
      </div>
    </section>
  );
};
