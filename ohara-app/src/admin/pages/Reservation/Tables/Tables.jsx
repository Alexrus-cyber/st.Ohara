import cl from "classnames";
import styles from "../Reservation.module.scss";
import { memo } from "react";

export const Tables = memo(({ table, open }) => {
  const separator =
    table.reserve && table.reserve.estimatedStartTime.split("T");
  const time = separator && separator[1].split(":");
  return (
    <div>
      <button
        disabled={table.reserve && table.reserve.status === "Progress" && true}
        className={cl(styles.formBtn, {
          [styles.inProgress]:
            table.reserve && table.reserve.status === "Progress",
          [styles.success]: table.reserve && table.reserve.status === "Success",
        })}
        onClick={open}
      >
        {table.number}
        <br />
        {table.reserve && time[0] + ":" + time[1]}
      </button>
    </div>
  );
});
