import styles from "./Modale.module.scss";
import { memo } from "react";

export const ModalLending = memo(({ active, children, title = "" }) => {
  if (active) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return (
    <div className={active ? styles.active : styles.module}>
      <div
        className={active ? styles.moduleContentActive : styles.moduleContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
        </div>
        {children}
      </div>
    </div>
  );
});
