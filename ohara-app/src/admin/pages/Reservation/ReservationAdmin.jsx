import {
  checkStatus,
  getTablesHall,
  getTablesLaunge,
  getTablesStreet,
  stopBooking,
  wakeBooking,
} from "../../../slices/booking";
import React, { memo, useEffect, useMemo, useState } from "react";
import styles from "./Reservation.module.scss";
import { Scheme } from "./MainChildren/Scheme";
import schemaHall from "../../../assets/Hall.png";
import scheme from "../../../assets/Veranda.png";
import cl from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundReservation } from "./NotFound/NotFoundReservation";

const ReservationAdmin = memo(({ user }) => {
  const { status } = useSelector((state) => state.booking);
  const [main, setMain] = useState(1);
  const dispatch = useDispatch();
  let st = false;

  useEffect(() => {
    dispatch(checkStatus());
  }, []);

  if (status) {
    if (status === "False") {
      st = false;
    } else {
      st = true;
    }
  }
  const getLaunge = useMemo(() => {
    return <Scheme main={main} getScheme={getTablesLaunge} />;
  }, [main]);
  const getStreet = useMemo(() => {
    return <Scheme main={main} img={scheme} getScheme={getTablesStreet} />;
  }, [main]);
  const getHall = useMemo(() => {
    return <Scheme main={main} img={schemaHall} getScheme={getTablesHall} />;
  }, [main]);

  if (st && !user) {
    return <NotFoundReservation />;
  }
  return (
    <div className={user ? styles.main : styles.main2}>
      {user && (
        <div>
          <button
            className={cl(styles.btn)}
            onClick={() => dispatch(stopBooking())}
          >
            Скрыть бронь
          </button>
          <button
            className={cl(styles.trueBtn)}
            onClick={() => dispatch(wakeBooking())}
          >
            Показать бронь
          </button>
        </div>
      )}
      <h1 className={styles.title}>Бронирование</h1>
      <div className={styles.links}>
        <div className={styles.formRadioBtn}>
          <input
            onChange={() => setMain(1)}
            type="radio"
            id="launge"
            name="menu"
            defaultChecked={true}
            value="1"
          />
          <label htmlFor={"launge"}>Лаунж</label>
        </div>
        <div className={styles.formRadioBtn}>
          <input
            onChange={() => setMain(2)}
            type="radio"
            id="street"
            name="menu"
            value="2"
          />
          <label htmlFor={"street"}>Веранда</label>
        </div>
        <div className={styles.formRadioBtn}>
          <input
            onChange={() => setMain(3)}
            type="radio"
            id="hall"
            name="menu"
            value="3"
          />
          <label htmlFor={"hall"}>Зал</label>
        </div>
      </div>
      {main === 1 && getLaunge}
      {main === 2 && getStreet}
      {main === 3 && getHall}
    </div>
  );
});
export default ReservationAdmin;
