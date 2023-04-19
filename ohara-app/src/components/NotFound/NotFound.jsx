import styles from "./NotFound.module.scss";
import error from "../../assets/erorr.webp";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.container}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={error} alt={"error"} />
          <h1 className={styles.title}>
            Извините, данная страница отсутсвует в нашем ресторане.
          </h1>
        </div>
        <NavLink className={styles.link} to={"/"}>
          Вернуться на главную
        </NavLink>
      </div>
    </div>
  );
};
export default NotFound;
