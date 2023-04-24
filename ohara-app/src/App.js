import "./App.css";
import styles from "./main.module.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./admin/pages/components/Navbar/Navbar";
import Header from "./components/Header/Header";
import { lazy, Suspense, useEffect } from "react";
import { LoaderPage } from "./components/LoaderPage/LoaderPage";
import { getMe } from "./slices/AuthApi";
import { useDispatch, useSelector } from "react-redux";

const MenuAdmin = lazy(() => import("./admin/pages/Menu/MenuAdmin"));
const GalleryAdmin = lazy(() => import("./admin/pages/Gallery/GalleryAdmin"));
const NewsAdmin = lazy(() => import("./admin/pages/News/NewsAdmin"));
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
const Reservation = lazy(() => import("./pages/Reservation/Reservation"));
const New = lazy(() => import("./pages/News/components/New/New"));
const Staff = lazy(() => import("./admin/pages/StaffEdit/Staff"));
const EditStaff = lazy(() =>
  import("./admin/pages/StaffEdit/components/EditStaff/EditStaff")
);
const Footer = lazy(() => import("./components/Footer/Footer"));
const Landing = lazy(() => import("./pages/Landing/Landing"));
const News = lazy(() => import("./pages/News/News"));
const Gallery = lazy(() => import("./pages/Gallery/Gallery"));
const NotFound = lazy(() => import("./components/NotFound/NotFound"));

function App() {
  const { user } = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="App">
        {user.roleEntity ? (
          <div className={styles.main}>
            <Navbar />
            <Suspense fallback={<LoaderPage />}>
              <Routes>
                <Route path={"/"} element={<MenuAdmin />} />
                <Route path={"/galleryAdmin"} element={<GalleryAdmin />} />
                <Route path={"/newsAdmin"} element={<NewsAdmin />} />
                <Route path={"/menuAdmin"} element={<MenuAdmin />} />
                <Route path={"/landingAdmin"} element={<LandingAdmin />} />
                <Route
                  path={"/reservationAdmin"}
                  element={<ReservationAdmin />}
                />
                <Route path={"/registration"} element={<Registration />} />
                <Route path={"/staff"} element={<Staff />} />
                <Route path={"/editStaff"} element={<EditStaff />} />
                <Route path={"/*"} element={<NotFound />} />
                <Route path={"/menu"} element={<Menu />} />
                <Route path={"/gallery"} element={<Gallery />} />
                <Route path={"/news"} element={<News />} />
                <Route path={"/news/:id"} element={<New />} />
                <Route path={"/reservation"} element={<Reservation />} />
                <Route path={"/landing"} element={<Landing />} />
                <Route path={"/login"} element={<Auth />} />
              </Routes>
            </Suspense>
          </div>
        ) : (
          <div>
            <Header />
            <Suspense fallback={<LoaderPage />}>
              <Routes>
                <Route path={"/login"} element={<Auth />} />
                <Route path={"/"} element={<Landing />} />
                <Route path={"/menu"} element={<Menu />} />
                <Route path={"/gallery"} element={<Gallery />} />
                <Route path={"/news"} element={<News />} />
                <Route path={"/news/:id"} element={<New />} />
                <Route path={"/reservation"} element={<Reservation />} />
                <Route path={"/*"} element={<NotFound />} />
              </Routes>
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <Footer />
            </Suspense>
          </div>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
