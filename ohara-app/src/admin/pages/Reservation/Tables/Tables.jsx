import cl from "classnames";
import styles from "../Reservation.module.scss";
import { Module } from "../../../components/Module/Module";
import ModalReservation from "../ModalReservation/ModalReservation";
import { memo, useCallback, useState } from "react";

export const Tables = memo(({ table }) => {
  const [active, setActive] = useState(false);
  const handleClickCloseModal = useCallback(() => {
    setActive(false);
  }, []);
  return (
    <div>
      <button
        disabled={table.reserve && table.reserve.status === "Progress" && true}
        className={cl(styles.formBtn, {
          [styles.inProgress]:
            table.reserve && table.reserve.status === "Progress",
          [styles.success]: table.reserve && table.reserve.status === "Success",
        })}
        onClick={() => setActive(!active)}
      >
        {table.number}
        <br />
      </button>
      <Module
        title={"Бронирование"}
        active={active}
        onClose={handleClickCloseModal}
      >
        <ModalReservation table={table} onClose={handleClickCloseModal} />
      </Module>
    </div>
  );
});
