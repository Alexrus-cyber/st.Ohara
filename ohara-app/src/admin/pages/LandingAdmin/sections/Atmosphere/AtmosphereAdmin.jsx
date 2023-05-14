import styles from "./Atmosphere.module.scss";
import { ContentAdmin } from "./Components/Content/ContentAdmin";
import { memo } from "react";

export const AtmosphereAdmin = memo(({ atmosphere }) => {
  return (
    <section className={styles.atmosphere}>
      <div className={styles.container}>{renderContent(atmosphere)}</div>
    </section>
  );
});

const renderContent = (atmosphere) => {
  return atmosphere.map((a, index) => {
    return (
      <ContentAdmin
        id={a.id}
        index={index}
        key={a.id}
        img={a.urlFile}
        title={a.header}
        text={a.description}
        isLeftPosition={a.isLeftPosition}
      />
    );
  });
};
