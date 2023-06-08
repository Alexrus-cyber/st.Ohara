import styles from "./NotFound.module.scss";
import { NavLink } from "react-router-dom";

export const NotFoundReservation = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <h1 className={styles.title}>
            Извините, ссылка не доступна
            <br />
            Резерв столиков по тел. (4942)499-600
          </h1>
        </div>
        <NavLink className={styles.link} to={"/"}>
          Вернуться на главную
        </NavLink>
      </div>
    </div>
  );
};
