import './App.css';
import {Header} from "./components/Header/Header";
import {Footer} from "./components/Footer/Footer";
import {Landing} from "./pages/Landing/Landing";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Landing/>
            <Footer></Footer>
        </div>
    );
}

export default App;
