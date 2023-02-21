import {Hero} from "./sections/Hero/Hero";
import {About} from "./sections/About/About";
import {Slider} from "./sections/Slider/Slider";
import {Atmosphere} from "./sections/Atmosphere/Atmosphere";
import {Map} from "./sections/Map/Map";
import {Laying} from "./sections/Map/Components/Laying/Laying";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLandingData} from "../../slices/landing";


export const Landing = () => {
    const {loading} = useSelector(state => state.landing)
    const {hero,about,atmosphere,slider} = useSelector(state => state.landing.landingList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLandingData());
    }, [dispatch])


    return (
        <>
            {loading ?
                "" : <>
                    <Hero hero={hero}/>
                    <About about={about}/>
                    <Slider slider={slider}/>
                    <Atmosphere atmosphere={atmosphere}/>
                    <Map/>
                    <Laying/>
                </>
            }

        </>
    )
}