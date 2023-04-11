import styles from './Atmosphere.module.css'
import {Content} from "./Components/Content/Content";

export const Atmosphere = ({atmosphere}) => {
    return (
        <section className={styles.atmosphere}>
            <div className={styles.container}>
                {atmosphere.content.map(a => <Content key={a.id} img={a.img} title={a.title} text1={a.text1} text2={a.text2} isLeftPosition={a.isLeftPosition}/>)}
            </div>
        </section>
    )
}