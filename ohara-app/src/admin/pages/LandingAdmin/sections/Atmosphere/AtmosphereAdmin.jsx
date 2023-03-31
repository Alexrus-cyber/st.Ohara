import styles from './Atmosphere.module.css'
import {ContentAdmin} from "./Components/Content/ContentAdmin";
import {landingList} from "../../../../../slices/landing/mocks/landing";
import {FieldArray} from "redux-form";

export const AtmosphereAdmin = ({atmosphere}) => {
    return (
        <section className={styles.atmosphere}>
            <div className={styles.container}>
                <FieldArray name="Content" component={renderContent} />
            </div>
        </section>
    )
}

const renderContent = () => {
    return (
        landingList.atmosphere.content.map((a, index) => {
            return (
                <ContentAdmin index={index} key={a.id} img={a.img} title={a.title} text1={a.text1} text2={a.text2} isLeftPosition={a.isLeftPosition}/>
            )
        }))

}