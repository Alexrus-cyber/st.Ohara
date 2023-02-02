import styles from "../../Atmosphere.module.css";

export const Content = (props) => {
    return (
        <>
            {props.left === 0 ?
                <div className={styles.itemContainer}>
                    <div className={styles.backContainer}>
                        <img className={styles.img} src={props.img} alt={"barman"}/>
                        <div className={styles.back}></div>
                    </div>
                    <div className={styles.textContainer}>
                        <h5 className={styles.title}>
                            Exklusive Atmosphäre
                        </h5>
                        <p className={styles.text}>
                            Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest – ausgezeichnet
                            mit zwei Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift
                            Feinschmecker“ zum Restaurant des Jahres gewählt.
                        </p>
                        <p className={styles.text}>
                            Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde,
                            man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – und stellt sich
                            selbst dabei nicht in den Vordergrund.
                        </p>
                    </div>
                </div>
                :
                <div className={styles.itemContainer}>
                    <div className={styles.textContainer}>
                        <h5 className={styles.title}>
                            Exklusive Atmosphäre
                        </h5>
                        <p className={styles.text}>
                            Genießen Sie unser Ambiente und die exzellente Küche von Peter Hagen-Wiest – ausgezeichnet
                            mit zwei Michelin-Sternen und 18 Gault-Millau Punkte sowie 2020 von der Zeitschrift
                            Feinschmecker“ zum Restaurant des Jahres gewählt.
                        </p>
                        <p className={styles.text}>
                            Entspannung, Persönlichkeit, Spontaneität – das „Ammolite“ ist frei von elitärer Attitüde,
                            man beherrscht das Handwerk, man pflegt die Konventionen und den Stil – und stellt sich
                            selbst dabei nicht in den Vordergrund.
                        </p>
                    </div>
                    <div className={styles.backContainer}>
                        <img className={styles.img} src={props.img} alt={"barman"}/>
                        <div className={props.left === 0 ? styles.back : styles.backRevert}></div>
                    </div>
                </div>
            }
        </>
    )
}