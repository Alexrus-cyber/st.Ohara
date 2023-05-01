import styles from "./Atmosphere.module.scss";
import { Content } from "./Components/Content/Content";

export const Atmosphere = ({ atmosphere }) => {
  return (
    <section className={styles.atmosphere}>
      <div className={styles.container}>
        {atmosphere.map((a) => (
          <Content
            key={a.id}
            img={a.urlFile}
            title={a.header}
            text={a.description}
            isLeftPosition={a.isLeftPosition}
          />
        ))}
      </div>
    </section>
  );
};
