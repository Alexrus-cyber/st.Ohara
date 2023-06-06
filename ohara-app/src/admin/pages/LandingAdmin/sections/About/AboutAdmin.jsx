import styles from "./About.module.scss";
import { DescriptionAdmin } from "./Components/Description food/DescriptionAdmin";
import { memo } from "react";

export const AboutAdmin = memo(({ about }) => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>Может быть о нас?</h1>
        {renderItems(about)}
      </div>
    </section>
  );
});

const renderItems = (about) => {
  return about.map((a, index) => {
    return (
      <DescriptionAdmin
        id={a.id}
        index={index}
        key={a.id}
        text={a.description}
        title={a.header}
        img={a.urlFile}
        idImg={a.idFile}
        isLeftPosition={a.isLeftPosition}
      />
    );
  });
};
