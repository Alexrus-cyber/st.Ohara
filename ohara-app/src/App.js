import './App.css';
import {Header} from "./components/Header/Header";
import {Landing} from "./Sections/Landing/Landing";
import {Footer} from "./components/Footer/Footer";

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
