import cl from "classnames";
import styles from "../Reservation.module.scss";
import { memo } from "react";

export const Tables = memo(({ table, open }) => {
  return (
    <div>
      <button
        disabled={table.reserve && table.reserve.status === "Progress" && true}
        className={cl(styles.formBtn, {
          [styles.inProgress]:
            table.reserve && table.reserve.status === "Progress",
        })}
        onClick={open}
      >
        {table.number}
      </button>
    </div>
  );
});
