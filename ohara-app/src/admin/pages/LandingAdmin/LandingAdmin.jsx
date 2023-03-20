import {HeroAdmin} from "./sections/Hero/HeroAdmin";
import {AboutAdmin} from "./sections/About/AboutAdmin";
import {SliderAdmin} from "./sections/Slider/SliderAdmin";
import {AtmosphereAdmin} from "./sections/Atmosphere/AtmosphereAdmin";
import {MapAdmin} from "./sections/Map/MapAdmin";
import {LayingAdmin} from "./sections/Map/Components/Laying/LayingAdmin";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLandingData} from "../../../slices/landing";
import styles from './LandingAdmin.module.css'


export const LandingAdmin = () => {
    const {loading} = useSelector(state => state.landing)
    const {hero,about,atmosphere,slider} = useSelector(state => state.landing.landingList)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getLandingData());
    }, [dispatch])


    return (
        <>
            {loading ?
                "" :
                <div className={styles.container}>
                    <HeroAdmin hero={hero}/>
                    <AboutAdmin about={about}/>
                    {/*<SliderAdmin slider={slider}/>*/}
                    <AtmosphereAdmin atmosphere={atmosphere}/>
                    <MapAdmin/>
                    <LayingAdmin/>
                </div>
            }

        </>
    )
}