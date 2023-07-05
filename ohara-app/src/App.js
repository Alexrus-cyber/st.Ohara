import "./App.css";
import styles from "./main.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./admin/pages/components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { lazy, Suspense, useEffect, useMemo } from "react";
import { LoaderPage } from "./components/LoaderPage/LoaderPage";
import { getMe } from "./slices/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken } from "./slices/API/API";
import { ArrowUpwardOutlined } from "@mui/icons-material";
import { AcceptReservation } from "./admin/pages/Reservation/AcceptReservation/AcceptReservation";

const Payment = lazy(() => import("./pages/Payment/Payment"));
const SliderAdmin = lazy(() => import("./admin/pages/Slider/SliderAdmin"));
const MenuAdmin = lazy(() => import("./admin/pages/Menu/MenuAdmin"));
const GalleryAdmin = lazy(() => import("./admin/pages/Gallery/GalleryAdmin"));
const LandingAdmin = lazy(() =>
  import("./admin/pages/LandingAdmin/LandingAdmin")
);
const ReservationAdmin = lazy(() =>
  import("./admin/pages/Reservation/ReservationAdmin")
);
const Registration = lazy(() =>
  import("./admin/pages/Registration/Registration")
);
const Auth = lazy(() => import("./admin/pages/Auth/Auth"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const Staff = lazy(() => import("./admin/pages/StaffEdit/Staff"));
const EditStaff = lazy(() =>
  import("./admin/pages/StaffEdit/components/EditStaff/EditStaff")
);
const Footer = lazy(() => import("./components/Footer/Footer"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function App() {
  const { user, token1 } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  const token = sessionStorage.getItem("token");
  setAccessToken(token);

  useEffect(() => {
    if (token) {
      dispatch(getMe());
    }
  }, [token1]);

  const routing = useMemo(() => {
    if (user !== null && user.id) {
      return (
        <div className={styles.main}>
          <Navbar user={user} />
          <Suspense fallback={<LoaderPage />}>
            <Routes>
              <Route path={"/"} element={<MenuAdmin />} />
              <Route path={"/galleryAdmin"} element={<GalleryAdmin />} />
              <Route path={"/menuAdmin"} element={<MenuAdmin />} />
              <Route path={"/landingAdmin"} element={<LandingAdmin />} />
              <Route path={"/sliderAdmin"} element={<SliderAdmin />} />
              <Route
                path={"/reservationAdmin"}
                element={<ReservationAdmin user={true} />}
              />
              <Route path={"/registration"} element={<Registration />} />
              {user.roleEntity === "Admin" && (
                <Route path={"/staff"} element={<Staff />} />
              )}
              {user.roleEntity === "Admin" && (
                <Route path={"/editStaff"} element={<EditStaff />} />
              )}
              <Route path={"/*"} element={<NotFound />} />
              <Route path={"/menu"} element={<Menu />} />
              <Route path={"/gallery"} element={<Gallery />} />
              <Route path={"/landing"} element={<Landing />} />
              <Route path={"/login"} element={<Auth />} />
              <Route path={"/payment"} element={<Payment />} />
              <Route path={"/payment/:paymentId"} element={<Payment />} />
              <Route path={"/acceptReserve"} element={<AcceptReservation />} />
            </Routes>
          </Suspense>
        </div>
      );
    }
    return (
      <div>
        <Header />
        <ArrowUpwardOutlined
          className={styles.arrow}
          onClick={() => {
            window.scrollTo(0, 0);
          }}
        />
        <Suspense fallback={<LoaderPage />}>
          <Routes>
            <Route path={"/login"} element={<Auth />} />
            <Route path={"/"} element={<Landing />} />
            <Route path={"/menu"} element={<Menu />} />
            <Route path={"/gallery"} element={<Gallery />} />
            <Route
              path={"/reservation"}
              element={<ReservationAdmin user={false} />}
            />
            <Route path={"/payment"} element={<Payment />} />
            <Route path={"/payment/:paymentId"} element={<Payment />} />
            <Route path={"/acceptReserve"} element={<AcceptReservation />} />
            <Route path={"/*"} element={<NotFound />} />
          </Routes>
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </div>
    );
  }, [user]);
  return (
    <BrowserRouter>
      <div className="App">{routing}</div>
    </BrowserRouter>
  );
}

export default App;
