import { useCallback, useState } from "react";
import { Module } from "../../components/Module/Module";
import ModalReservation from "./ModalReservation/ModalReservation";

const ReservationAdmin = () => {
  const [active, setActive] = useState(false);

  const handleClickCloseModal = useCallback(() => {
    setActive(false);
  }, []);
  return (
    <div>
      <button onClick={() => setActive(!active)}>Открыть бронь</button>
      <Module
        title={"Бронирование"}
        active={active}
        onClose={handleClickCloseModal}
      >
        <ModalReservation onClose={handleClickCloseModal} />
      </Module>
    </div>
  );
};
export default ReservationAdmin;
