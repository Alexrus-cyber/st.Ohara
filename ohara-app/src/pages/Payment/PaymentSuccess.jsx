import styles from "./Payment.module.scss";
import success from "../../assets/check (1).png";
import cancel from "../../assets/cancelPay.png";

export const PaymentSuccess = ({ status }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          {status === "success"
            ? "Платеж был успешно произведен"
            : "Платеж был отменен по причине истекло время принятия"}{" "}
        </h1>
        {status === "success" ? (
          <img className={styles.img} src={success} alt={"success"} />
        ) : (
          <img className={styles.img} src={cancel} alt={"success"} />
        )}
      </div>
    </div>
  );
};
