import { Hero } from "./sections/Hero/Hero";
import { About } from "./sections/About/About";
import { Atmosphere } from "./sections/Atmosphere/Atmosphere";
import React, { memo, useEffect, Suspense, lazy, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, getLandingData, getSlider } from "../../slices/landing";
import { LoaderPage } from "../../components/LoaderPage/LoaderPage";
import { Slider } from "./sections/Slider/Slider";
import { Alert, Snackbar } from "@mui/material";

const Map = lazy(() => import("./sections/Map/Map"));
const Landing = memo(() => {
  const { landingList, slider, error } = useSelector((state) => state.landing);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!landingList.aboutDto) {
      dispatch(getLandingData());
      dispatch(getSlider());
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        errorMessage
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
        </>
      )}
    </>
  );
});
export default Landing;
