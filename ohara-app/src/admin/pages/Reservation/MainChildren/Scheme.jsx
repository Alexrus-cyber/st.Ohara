import styles from "../Reservation.module.scss";
import { Tables } from "../Tables/Tables";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  getBarSelector,
  getHallSelector,
  getLaungeSelector,
  getStreetSelector,
} from "../../../../slices/booking";
import { Alert, Snackbar } from "@mui/material";
import { Module } from "../../../components/Module/Module";
import ModalReservation from "../ModalReservation/ModalReservation";
import { reset } from "redux-form";
import { LoaderPage } from "../../../../components/LoaderPage/LoaderPage";

export const Scheme = ({ main, getScheme, img }) => {
  const [time, setTime] = useState(0);
  let items = useSelector(getBarSelector);
  let { error, loading } = useSelector((state) => state.booking);
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const [modalState, setModalState] = useState("");
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
  useEffect(() => {
    dispatch(reset("reservation"));
  }, [active]);

  const handleClickCloseModal = useCallback(() => {
    setActive(false);
    dispatch(reset("reservation"));
  }, []);
  const handleOpen = useCallback((table) => {
    setActive(true);
    setModalState(table);
  }, []);
  if (time < 1) {
    if (loading) {
      return <LoaderPage height={true} />;
    }
  }
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
      <img className={styles.img} src={img} alt={"scheme"} />
      <div className={styles.container}>
        {items.map((el) => (
          <Tables open={() => handleOpen(el)} table={el} key={el.id} />
        ))}
      </div>
      <Module
        title={"Бронирование"}
        active={active}
        onClose={handleClickCloseModal}
      >
        <ModalReservation
          active={active}
          table={modalState}
          onClose={handleClickCloseModal}
        />
      </Module>
    </div>
  );
};
