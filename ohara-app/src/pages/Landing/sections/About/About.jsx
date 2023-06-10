import styles from "./About.module.scss";
import { Description } from "./Components/Description food/Description";
import { memo } from "react";

export const About = memo(({ about }) => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>О нас</h1>
        {about.map((a) => (
          <Description
            key={a.id}
            text={a.description}
            title={a.header}
            img={a.urlFile}
            isLeftPosition={a.isLeftPosition}
          />
        ))}
      </div>
    </section>
  );
});
