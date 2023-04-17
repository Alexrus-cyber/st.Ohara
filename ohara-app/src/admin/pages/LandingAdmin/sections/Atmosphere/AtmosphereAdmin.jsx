import styles from "./Atmosphere.module.scss";
import { ContentAdmin } from "./Components/Content/ContentAdmin";
import { memo } from "react";

export const AtmosphereAdmin = memo(({ atmosphere }) => {
  return (
    <section className={styles.atmosphere}>
      <div className={styles.container}>
        {renderContent(atmosphere.content)}
      </div>
    </section>
  );
});

const renderContent = (content) => {
  return content.map((a, index) => {
    return (
      <ContentAdmin
        id={a.id}
        index={index}
        key={a.id}
        img={a.img}
        title={a.title}
        text1={a.text1}
        text2={a.text2}
        isLeftPosition={a.isLeftPosition}
      />
    );
  });
};
