import { useCallback, useState } from "react";
import { Module } from "../../components/Module/Module";
import ModalReservation from "./ModalReservation/ModalReservation";
import styles from "./Reservation.module.scss";
import cl from "classnames";

const ReservationAdmin = () => {
  const [active, setActive] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleClickCloseModal = useCallback(() => {
    setActive(false);
  }, []);
  return (
    <div>
      <button
        disabled={active && true}
        className={cl(styles.formBtn, {
          [styles.inProgress]: active,
          [styles.success]: success,
        })}
        onClick={() => setActive(!active)}
      >
        1<br />
        {success && `13:00`}
      </button>
      <Module
        title={"Бронирование"}
        active={active}
        onClose={handleClickCloseModal}
      >
        <ModalReservation
          setSuccess={setSuccess}
          onClose={handleClickCloseModal}
        />
      </Module>
    </div>
  );
};
export default ReservationAdmin;
