import { HeroAdmin } from "./sections/Hero/HeroAdmin";
import { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editLanding,
  getLandingData,
  listLanding,
} from "../../../slices/landing";
import styles from "./LandingAdmin.module.scss";
import { ButtonUI } from "../components/ButtonUI/ButtonUI";
import { reduxForm } from "redux-form";
import { AboutAdmin } from "./sections/About/AboutAdmin";
import { AtmosphereAdmin } from "./sections/Atmosphere/AtmosphereAdmin";

const LandingAdmin = memo(() => {
  const { loading } = useSelector((state) => state.landing);
  const landingList = useSelector(listLanding);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLandingData());
  }, []);

  return (
    <>
      {loading ? (
        ""
      ) : (
        <LandingReduxForm
          initialValues={landingList}
          onSubmit={(formData) => {
            const data = {
              ...formData,
              bannerDto: { ...formData.bannerDto },
              aboutDto: [...formData.aboutDto],
              atmosphereDto: [...formData.atmosphereDto],
            };

            data.bannerDto.urlFile = landingList.bannerDto.urlFile;
            data.bannerDto.idFile = landingList.bannerDto.idFile;
            data.aboutDto = data.aboutDto.map((item) => {
              return {
                ...item,
                idFile: landingList.aboutDto.filter(
                  (el) => el.id === item.id
                )[0].idFile,
              };
            });
            data.atmosphereDto = data.atmosphereDto.map((item) => {
              return {
                ...item,
                idFile: landingList.atmosphereDto.filter(
                  (el) => el.id === item.id
                )[0].idFile,
              };
            });
            console.log(data);
            dispatch(editLanding(data));
          }}
          destroyOnUnmount={false}
        />
      )}
    </>
  );
});
export default LandingAdmin;

const LandingForm = memo(({ handleSubmit, initialValues }) => {
  const customButton = {
    position: "fixed",
    top: "87%",
    zIndex: 10000,
    fontSize: 26,
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.container}>
        <HeroAdmin hero={initialValues.bannerDto} />
        <AboutAdmin about={initialValues.aboutDto} />
        <AtmosphereAdmin atmosphere={initialValues.atmosphereDto} />
        <ButtonUI style={customButton} name={"Сохранить"} />
      </form>
    </>
  );
});

const LandingReduxForm = reduxForm({
  form: "landing",
  keepDirtyOnReinitialize: true,
  pure: true,
})(LandingForm);
