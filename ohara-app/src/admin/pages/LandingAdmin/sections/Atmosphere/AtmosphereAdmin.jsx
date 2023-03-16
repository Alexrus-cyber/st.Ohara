import styles from './Atmosphere.module.css'
import {ContentAdmin} from "./Components/Content/ContentAdmin";

export const AtmosphereAdmin = ({atmosphere}) => {
    return (
        <section className={styles.atmosphere}>
            <div className={styles.container}>
                {atmosphere.ContentArr.map(a => <ContentAdmin key={a.id} img={a.img} title={a.title} text1={a.text1} text2={a.text2} left={a.left}/>)}
            </div>
        </section>
    )
}