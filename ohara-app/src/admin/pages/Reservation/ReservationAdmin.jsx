import { useDispatch, useSelector } from "react-redux";
import {
  getBarSelector,
  getSchemeBar,
  getTablesBar,
} from "../../../slices/booking";
import { Tables } from "./Tables/Tables";
import { useCallback, useEffect } from "react";
import styles from "./Reservation.module.scss";

const ReservationAdmin = () => {
  const items = useSelector(getBarSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTablesBar());
  }, []);
  const getScheme = useCallback(() => {
    dispatch(getSchemeBar());
  }, []);
  return (
    <div className={styles.flex}>
      <div>
        {items.map((el) => (
          <Tables table={el} key={el.id} />
        ))}
      </div>
      <div>
        <button onClick={getScheme}>Обновить схему столов</button>
      </div>
    </div>
  );
};
export default ReservationAdmin;
