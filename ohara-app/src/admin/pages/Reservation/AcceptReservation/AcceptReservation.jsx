import styles from "./AcceptReservation.module.scss";
import success from "../../../../assets/check (1).png";

export const AcceptReservation = () => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          Вы успешно забронировали, вам отправлено письмо на почту
        </h1>
        <img className={styles.img} src={success} alt={"success"} />
      </div>
    </div>
  );
};
