import {Hero} from "./sections/Hero/Hero";
import {About} from "./sections/About/About";
import {Slider} from "./sections/Slider/Slider";
import {Atmosphere} from "./sections/Atmosphere/Atmosphere";
import {Map} from "./sections/Map/Map";
import {Laying} from "./sections/Map/Components/Laying/Laying";


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