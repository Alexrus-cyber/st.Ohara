import styles from "./Payment.module.scss";
import success from "../../assets/check (1).png";
import cancel from "../../assets/cancelPay.png";

export const PaymentSuccess = ({ status }) => {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.h1}>
          {status === "Success"
            ? "Платеж был успешно произведен"
            : "Платеж был отменен по причине: истечения времени на оплату"}
        </h1>
        {status === "Success" ? (
          <img className={styles.img} src={success} alt={"success"} />
        ) : (
          <img className={styles.img} src={cancel} alt={"success"} />
        )}
      </div>
    </div>
  );
};
