import styles from "../Reservation.module.scss";
import { Tables } from "../Tables/Tables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getBarSelector,
  getHallSelector,
  getLaungeSelector,
  getStreetSelector,
} from "../../../../slices/booking";

export const Scheme = ({ main, getScheme, img }) => {
  const [time, setTime] = useState(0);
  let items = useSelector(getBarSelector);
  const dispatch = useDispatch();
  switch (main) {
    case 1: {
      items = useSelector(getLaungeSelector);
      break;
    }
    case 2: {
      items = useSelector(getStreetSelector);
      break;
    }
    case 3: {
      items = useSelector(getHallSelector);
      break;
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setTime(time + 1);
    }, 5000);
    dispatch(getScheme());
  }, [time]);
  return (
    <div>
      {main !== 1 && <img className={styles.img} src={img} alt={"scheme"} />}
      <div className={styles.container}>
        {items
          .filter((el) => el.number < 14)
          .map((el) => (
            <Tables table={el} key={el.id} />
          ))}
      </div>
    </div>
  );
};
