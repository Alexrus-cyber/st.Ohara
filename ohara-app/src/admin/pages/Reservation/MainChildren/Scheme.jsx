import styles from "../Reservation.module.scss";
import { Tables } from "../Tables/Tables";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  getBarSelector,
  getHallSelector,
  getLaungeSelector,
  getStreetSelector,
} from "../../../../slices/booking";
import { Alert, Snackbar } from "@mui/material";

export const Scheme = ({ main, getScheme, img }) => {
  const [time, setTime] = useState(0);
  let items = useSelector(getBarSelector);
  let { error } = useSelector((state) => state.booking);
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

  useEffect(() => {}, [error]);

  return (
    <div>
      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(clearData());
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            dispatch(clearData());
          }}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
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
