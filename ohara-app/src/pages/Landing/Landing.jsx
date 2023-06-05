import { Hero } from "./sections/Hero/Hero";
import { About } from "./sections/About/About";
import { Atmosphere } from "./sections/Atmosphere/Atmosphere";
import React, {
  memo,
  useEffect,
  Suspense,
  lazy,
  useMemo,
  useCallback,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  activesFalse,
  clearError,
  getLandingData,
  getSlider,
} from "../../slices/landing";
import { LoaderPage } from "../../components/LoaderPage/LoaderPage";
import { Slider } from "./sections/Slider/Slider";
import { Alert, Snackbar } from "@mui/material";
import { Module } from "../../admin/components/Module/Module";
import styles from "./Landing.module.scss";
import { ButtonUI } from "../../admin/pages/components/ButtonUI/ButtonUI";

const Map = lazy(() => import("./sections/Map/Map"));
const Landing = memo(() => {
  const { landingList, slider, error, active } = useSelector(
    (state) => state.landing
  );
  const handleClickCloseModal = useCallback(() => {
    dispatch(activesFalse());
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingData());
    dispatch(getSlider());
  }, []);

  const errorMessage = useMemo(() => {
    return (
      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(clearError());
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            dispatch(clearError());
          }}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    );
  }, [error]);
  return (
    <>
      {!landingList.aboutDto ? (
        <div>
          <LoaderPage />
          {errorMessage}
        </div>
      ) : (
        <>
          {errorMessage}
          <Hero hero={landingList.bannerDto} />
          <About about={landingList.aboutDto} />
          <Suspense fallback={<LoaderPage />}>
            <Slider slider={slider} />
          </Suspense>
          <Atmosphere atmosphere={landingList.atmosphereDto} />
          <Suspense fallback={<div>Loading...</div>}>
            <Map />
          </Suspense>
          <Module active={active} onClose={handleClickCloseModal}>
            <div className={styles.center}>
              <h1 className={styles.h}>18+</h1>
              <p className={styles.p}>
                Добро пожаловать на сайт паба St.O'Hara. Для доступа необходимо
                подтвердить совершеннолетний возраст.
              </p>
              <p className={styles.small}>
                Сайт содержит информацию для лиц совершеннолетнего возраста.
                Сведения, размещенные на сайте, не являются рекламой, носят
                исключительно информационный характер, и предназначены только
                для личного использования.
              </p>
              <ButtonUI
                name={"Мне исполнилось"}
                onClick={handleClickCloseModal}
              />
            </div>
          </Module>
        </>
      )}
    </>
  );
});
export default Landing;
