import './App.css';
import {Header} from "./components/Header/Header";
import {Hero} from "./Sections/Hero/Hero";
import {About} from "./Sections/About/About";

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Hero></Hero>
            <About/>
        </div>
    );
}

export default App;
