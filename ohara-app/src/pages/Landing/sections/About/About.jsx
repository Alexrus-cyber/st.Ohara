import styles from "./About.module.scss";
import { Description } from "./Components/Description food/Description";
import { forwardRef } from "react";

export const About = forwardRef(({ about }, ref) => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1 ref={ref} className={styles.title}>
          О нас
        </h1>
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
