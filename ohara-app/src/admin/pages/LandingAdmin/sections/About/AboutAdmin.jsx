import styles from "./About.module.css"
import {DescriptionAdmin} from "./Components/Description food/DescriptionAdmin";
import {FieldArray} from "redux-form";
import {landingList} from "../../../../../slices/landing/mocks/landing";


export const AboutAdmin = ({about}) => {
    return (
        <section className={styles.about}>
            <div className={styles.container}>
                <h1 className={styles.title}>Может быть о нас?</h1>
                <FieldArray name="items" component={renderItems} />
                {/*{about.items.map(a => <DescriptionAdmin key={a.id} name={a.name} text={a.text} title={a.title} img={a.img} isLeftPosition={a.isLeftPosition}/>)}*/}
            </div>
        </section>
    )
}


const renderItems = () => {
    return (
       landingList.about.items.map((a, index) => {
               return (
                   <DescriptionAdmin index={index} key={a.id} name={a.name} text={a.text} title={a.title} img={a.img} isLeftPosition={a.isLeftPosition}/>
               )
        }))

}