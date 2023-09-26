import {
  checkStatus,
  getTablesHall,
  getTablesLaunge,
  stopBooking,
  wakeBooking,
} from "../../../slices/booking";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./Reservation.module.scss";
import { Scheme } from "./MainChildren/Scheme";
import schemaHall from "../../../assets/Hall.png";
import schemaLaunge from "../../../assets/Launge.png";
import cl from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundReservation } from "./NotFound/NotFoundReservation";
import { LoaderPage } from "../../../components/LoaderPage/LoaderPage";

const ReservationAdmin = memo(({ user }) => {
  const { status, loading } = useSelector((state) => state.booking);
  const [main, setMain] = useState(3);
  const [session, setSession] = useState(false);
  const [status1, setStatus] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "") {
      dispatch(checkStatus());
    }
  }, []);

  useEffect(() => {
    if (status !== "") {
      setStatus(status);
    }
  }, [status]);

  const wake = useCallback(() => {
    setStatus("False");
    dispatch(wakeBooking());
  }, [status1]);
  const stop = useCallback(() => {
    setStatus("True");
    dispatch(stopBooking());
  }, [status1]);
  const getLaunge = useMemo(() => {
    return (
      <Scheme main={main} img={schemaLaunge} getScheme={getTablesLaunge} />
    );
  }, [main]);
  const getHall = useMemo(() => {
    return <Scheme main={main} img={schemaHall} getScheme={getTablesHall} />;
  }, [main]);

  const Message = useMemo(() => {
    return (
      <div className={styles.border}>
        <p className={styles.p}>
          1. Бронирование на пятницу и субботу после 18:00 платное (депозитная
          система)
        </p>
        <p className={styles.p}>
          2. На сумму депозита влияет выбранный стол (маленький - 3000, большой
          - 8000)
        </p>
        <p className={styles.p}>
          3. На сумму депозита вы можете заказывать еду и напитки
        </p>
        <p className={styles.p}>4. На внесение депозита дается 10 минут</p>
        <p className={styles.p}>
          5. Вы согласны на обработку персональных данных
        </p>
        <p className={styles.p}>
          6. После оплаты или бронирования столика, вам придет письмо на почту,
          <br />
          которое нужно будет предъявить офицанту при входе в заведение.
        </p>
        <p className={styles.p}>
          7. Подробную информацию можно узнать по номеру телефона: (4942)499-600
        </p>
        <button
          className={styles.buttonAccept}
          onClick={() => {
            document.cookie = "activeBooking=true";
            sessionStorage.setItem("activeBooking", true);
            setSession(true);
          }}
        >
          Я согласен(на) с условиями бронирования
        </button>
      </div>
    );
  }, [session]);
  if (status === "True" && !user) {
    return <NotFoundReservation />;
  }
  return (
    <div className={user ? styles.main : styles.main2}>
      {user && (
        <div className={styles.btnContainer}>
          <button className={cl(styles.btn)} onClick={stop}>
            Заблокировать бронирование
          </button>
          <button className={cl(styles.trueBtn)} onClick={wake}>
            Показать бронирование
          </button>
        </div>
      )}
      {status === "" ? (
        <LoaderPage />
      ) : (
        <h1
          className={cl(styles.title, {
            [styles.titleAdmin]: !user,
          })}
        >
          Бронирование
        </h1>
      )}

      {!sessionStorage.getItem("activeBooking") && !user && !loading && Message}
      {(sessionStorage.getItem("activeBooking") || user) && (
        <div className={styles.links}>
          <div className={styles.formRadioBtn}>
            <input
              defaultChecked={true}
              onChange={() => setMain(3)}
              type="radio"
              id="hall"
              name="menu"
              value="3"
            />
            <label htmlFor={"hall"}>Зал</label>
          </div>
          <div className={styles.formRadioBtn}>
            <input
              onChange={() => setMain(1)}
              type="radio"
              id="launge"
              name="menu"
              value="1"
            />
            <label htmlFor={"launge"}>Лаунж</label>
          </div>
        </div>
      )}
      {main === 1 &&
        (sessionStorage.getItem("activeBooking") || user) &&
        status1 === "False" &&
        getLaunge}
      {main === 3 &&
        (sessionStorage.getItem("activeBooking") || user) &&
        status1 === "False" &&
        getHall}
    </div>
  );
});
export default ReservationAdmin;
