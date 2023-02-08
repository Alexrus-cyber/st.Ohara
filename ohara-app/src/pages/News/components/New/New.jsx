import styles from './New.module.css'
import window from  '../../../../assets/slider1.png'

export const New = () => {
    return (
        <section className={styles.new}>
            <div className={styles.container}>
                <div className={styles.itemContainer}>
                    <p className={styles.title}>Главная новость</p>
                    <p className={styles.text}>Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest – ausgezeichnet mit zwei
                        Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von
                        der Zeitschrift Feinschmecker“ zum Restaurant des Jahres gewählt.</p>
                    <p className={styles.text}>Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde,
                        man beherrscht das Handwerk, man pflegt die Konventionen und
                        den Stil – und stellt sich selbst dabei nicht in den Vordergrund.</p>
                </div>
                <div className={styles.rightContainer}>
                    <img className={styles.img} src={window} alt={"xxx"}/>
                </div>
            </div>
        </section>
    )
}