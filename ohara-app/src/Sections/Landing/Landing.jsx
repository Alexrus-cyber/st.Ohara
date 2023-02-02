import {Hero} from "./Hero/Hero";
import {About} from "./About/About";
import {Slider} from "./Slider/Slider";
import {Atmosphere} from "./Atmosphere/Atmosphere";
import {Map} from "./Map/Map";
import {Laying} from "./Map/Components/Laying/Laying";

export const Landing = () => {
    return (
        <>
            <Hero/>
            <About/>
            <Slider/>
            <Atmosphere/>
            <Map/>
            <Laying/>
        </>
    )
}