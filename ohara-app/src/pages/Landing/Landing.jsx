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
  useState,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  getLandingData,
  getSlider,
  listLanding,
} from "../../slices/landing";
import { LoaderPage } from "../../components/LoaderPage/LoaderPage";
import { Slider } from "./sections/Slider/Slider";
import { Alert, Snackbar } from "@mui/material";
import styles from "./Landing.module.scss";
import { ButtonUI } from "../../admin/pages/components/ButtonUI/ButtonUI";
import { ModalLending } from "./Modale/ModalLending";

const Map = lazy(() => import("./sections/Map/Map"));

const Landing = memo(() => {
  const { slider, error } = useSelector((state) => state.landing);
  const landingList = useSelector(listLanding);
  const [active, setActive] = useState(false);
  const ref = useRef(null);
  const handleClickCloseModal = useCallback(() => {
    localStorage.setItem("activeLanding", new Date().getTime());
    setActive(false);
  }, []);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLandingData());
    dispatch(getSlider());
  }, []);
  useEffect(() => {
    const time = parseInt(localStorage.getItem("activeLanding") || 0);
    setActive(new Date().getTime() - time > 60 * 1000 * 60 * 24 * 3);
  }, []);
  const scrollClick = useCallback(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
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
          <Hero handleClick={scrollClick} hero={landingList.bannerDto} />
          <About ref={ref} about={landingList.aboutDto} />
          <Suspense fallback={<LoaderPage />}>
            <Slider slider={slider} />
          </Suspense>
          <Atmosphere atmosphere={landingList.atmosphereDto} />
          <Suspense fallback={<div>Loading...</div>}>
            <Map />
          </Suspense>
          <ModalLending active={active}>
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
          </ModalLending>
        </>
      )}
    </>
  );
});
export default Landing;
