import styles from "./About.module.scss";
import { DescriptionAdmin } from "./Components/Description food/DescriptionAdmin";
import { memo } from "react";

export const AboutAdmin = memo(({ about }) => {
  return (
    <section className={styles.about}>
      <div className={styles.container}>
        <h1 className={styles.title}>Может быть о нас?</h1>
        {renderItems(about.items)}
      </div>
    </section>
  );
});

const renderItems = (items) => {
  return items.map((a, index) => {
    return (
      <DescriptionAdmin
        id={a.id}
        index={index}
        key={a.id}
        name={a.name}
        text={a.text}
        title={a.title}
        img={a.img}
        isLeftPosition={a.isLeftPosition}
      />
    );
  });
};
