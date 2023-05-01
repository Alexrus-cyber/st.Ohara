import { HeroAdmin } from "./sections/Hero/HeroAdmin";
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editLanding, getLandingData } from "../../../slices/landing";
import styles from "./LandingAdmin.module.scss";
import { ButtonUI } from "../components/ButtonUI/ButtonUI";
import { reduxForm } from "redux-form";
import { AboutAdmin } from "./sections/About/AboutAdmin";
import { AtmosphereAdmin } from "./sections/Atmosphere/AtmosphereAdmin";

const LandingForm = memo(({ handleSubmit, data }) => {
  const customButton = {
    position: "fixed",
    top: "87%",
    zIndex: 10000,
    fontSize: 26,
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        <HeroAdmin hero={data.bannerDto} />
        <AboutAdmin about={data.aboutDto} />
        <AtmosphereAdmin atmosphere={data.atmosphereDto} />
        <ButtonUI style={customButton} name={"Сохранить"} />
      </form>
    </>
  );
});

const LandingAdmin = memo(() => {
  const { landingList, loading } = useSelector((state) => state.landing);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLandingData());
  }, []);

  const onSubmit = useCallback(
    (formData) => {
      console.log(formData);
      dispatch(editLanding(formData));
    },
    [dispatch]
  );
  console.log(landingList);
  return (
    <>
      {loading ? (
        ""
      ) : (
        <LandingReduxForm
          initialValues={landingList}
          data={landingList}
          onSubmit={onSubmit}
        />
      )}
    </>
  );
});
export default LandingAdmin;
const LandingReduxForm = reduxForm({ form: "landing" })(LandingForm);
