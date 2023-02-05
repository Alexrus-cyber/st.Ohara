import './App.css';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Landing} from "./pages/Landing/Landing";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Menu} from "./pages/Menu/Menu";
import {Gallery} from "./pages/Gallery/Gallery";
import {News} from "./pages/News/News";
import {Reservation} from "./pages/Reservation/Reservation";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Header></Header>
                <Routes>
                    <Route path={'/'} element={<Landing/>}/>
                    <Route path={'/Menu'} element={<Menu/>}/>
                    <Route path={'/Gallery'} element={<Gallery/>}/>
                    <Route path={'/News'} element={<News/>}/>
                    <Route path={'/Reservation'} element={<Reservation/>}/>
                </Routes>
                <Footer></Footer>
            </div>
        </BrowserRouter>

    );
}

export default App;
