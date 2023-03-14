import './App.css';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Landing} from "./pages/Landing/Landing";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Menu} from "./pages/Menu/Menu";
import {Gallery} from "./pages/Gallery/Gallery";
import {News} from "./pages/News/News";
import {Reservation} from "./pages/Reservation/Reservation";
import {New} from "./pages/News/components/New/New";
import {NewsAdmin} from "./admin/pages/News/NewsAdmin";
import {Navbar} from "./admin/pages/components/Navbar/Navbar";
import styles from './main.module.css'
import {MenuAdmin} from "./admin/pages/Menu/MenuAdmin";
import {ReservationAdmin} from "./admin/pages/Reservation/ReservationAdmin";
import {GalleryAdmin} from "./admin/pages/Gallery/GalleryAdmin";

function App() {
    const admin = false;
    return (
        <BrowserRouter>
            <div className="App">
                {admin
                    ?
                    <div className={styles.main}>
                        <Navbar/>
                        <Routes>
                            <Route path={'/'} element={<MenuAdmin/>}/>
                            <Route path={'/galleryAdmin'} element={<GalleryAdmin/>}/>
                            <Route path={'/newsAdmin'} element={<NewsAdmin/>}/>
                            <Route path={'/menuAdmin'} element={<MenuAdmin/>}/>
                            <Route path={'/reservationAdmin'} element={<ReservationAdmin/>}/>
                        </Routes>
                    </div>
                    :
                    <div>
                        <Header/>
                        <Routes>
                            <Route path={'/'} element={<Landing/>}/>
                            <Route path={'/Menu'} element={<Menu/>}/>
                            <Route path={'/Gallery'} element={<Gallery/>}/>
                            <Route path={'/News'} element={<News/>}/>
                            <Route path={'/Reservation'} element={<Reservation/>}/>
                            <Route path={'/new'} element={<New/>}>
                                <Route path={":id"}
                                       element={<New/>}></Route>
                            </Route>
                        </Routes>
                        <Footer></Footer>
                    </div>
                }
            </div>
        </BrowserRouter>
    );
}

export default App;
