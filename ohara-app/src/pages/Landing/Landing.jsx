import { Hero } from "./sections/Hero/Hero";
import { About } from "./sections/About/About";
import { Slider } from "./sections/Slider/Slider";
import { Atmosphere } from "./sections/Atmosphere/Atmosphere";
import { memo, useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLandingData } from "../../slices/landing";
import { LoaderPage } from "../../components/LoaderPage/LoaderPage";

const Map = lazy(() => import("./sections/Map/Map"));
const Landing = memo(() => {
  const { loading } = useSelector((state) => state.landing);
  const { hero, about, atmosphere, slider } = useSelector(
    (state) => state.landing.landingList
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLandingData());
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <>
          <Hero hero={hero} />
          <About about={about} />
          <Suspense fallback={<LoaderPage />}>
            <Slider slider={slider} />
          </Suspense>
          <Atmosphere atmosphere={atmosphere} />
          <Suspense fallback={<div>Loading...</div>}>
            <Map />
          </Suspense>
        </>
      )}
    </>
  );
});
export default Landing;
