import {HeroAdmin} from "./sections/Hero/HeroAdmin";
import {AboutAdmin} from "./sections/About/AboutAdmin";
import {AtmosphereAdmin} from "./sections/Atmosphere/AtmosphereAdmin";
import {MapAdmin} from "./sections/Map/MapAdmin";
import {LayingAdmin} from "./sections/Map/Components/Laying/LayingAdmin";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLandingData} from "../../../slices/landing";
import styles from './LandingAdmin.module.css'
import {ButtonUI} from "../components/ButtonUI/ButtonUI";
import {FieldArray, reduxForm} from "redux-form";
import {DescriptionAdmin} from "./sections/About/Components/Description food/DescriptionAdmin";

const LandingForm = ({handleSubmit,data}) => {
    const customButton = {
        position: "fixed",
        top: "90%",
        maxWidth: 200,
        zIndex: 10000,
        height: 50,
        fontSize: 26,
    }

    return (
        <form onSubmit={handleSubmit} className={styles.container}>
            <HeroAdmin hero={data.hero}/>
            <AboutAdmin about={data.about}/>
            <AtmosphereAdmin atmosphere={data.atmosphere}/>
            <MapAdmin/>
            <LayingAdmin/>
            <ButtonUI styleProp={customButton} name={"Сохранить"}/>
        </form>
    )
}

export const LandingAdmin = () => {
    const {loading} = useSelector(state => state.landing)
    const {landingList} = useSelector(state => state.landing)
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getLandingData());
    }, [dispatch])

    const onSubmit = (formData) => {
        console.log(formData);
    }

    return (
        <>
            {loading ?
                "" :
                <LandingReduxForm initialValues={landingList} data={landingList} onSubmit={onSubmit}/>
            }

        </>
    )
}

const LandingReduxForm = reduxForm({form: 'landing'})(LandingForm);