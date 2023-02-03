import styles from './Atmosphere.module.css'
import {Content} from "./Components/Content/Content";
import {ContentArr} from "./Constants";

export const Atmosphere = () => {

    return (
        <section className={styles.atmosphere}>
            <div className={styles.container}>
                {ContentArr.map(a => <Content key={a.id} img={a.img} title={a.title} text1={a.text1} text2={a.text2} left={a.left}/>)}
            </div>
        </section>
    )
}