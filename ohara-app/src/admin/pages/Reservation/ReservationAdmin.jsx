import {
  getTablesHall,
  getTablesLaunge,
  getTablesStreet,
} from "../../../slices/booking";
import React, { useMemo, useState } from "react";
import styles from "./Reservation.module.scss";
import { Scheme } from "./MainChildren/Scheme";
import schemaHall from "../../../assets/Hall.png";
import scheme from "../../../assets/Veranda.png";

const ReservationAdmin = ({ user }) => {
  const [main, setMain] = useState(1);

  const getLaunge = useMemo(() => {
    return <Scheme main={main} getScheme={getTablesLaunge} />;
  }, [main]);
  const getStreet = useMemo(() => {
    return <Scheme main={main} img={scheme} getScheme={getTablesStreet} />;
  }, [main]);
  const getHall = useMemo(() => {
    return <Scheme main={main} img={schemaHall} getScheme={getTablesHall} />;
  }, [main]);

  return (
    <div className={user ? styles.main : styles.main2}>
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
};
export default ReservationAdmin;
