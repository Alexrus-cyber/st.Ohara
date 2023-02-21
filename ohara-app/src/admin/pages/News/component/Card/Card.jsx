import styles from './Card.module.css'
import slider from '../../../../../assets/slider1.png'
import close from '../../../../../assets/close.png'
import redact from '../../../../../assets/redact.png'
export const Card = (props) => {
    return (
        <div style={{backgroundImage: `url("${slider}")`}} className={styles.card}>
            <div className={styles.container}>
                <div className={styles.closeContainer}>
                    <img className={styles.img} src={redact} alt={"redact"}/>
                    <img className={styles.img} src={close} alt={"close"}/>
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>Lorem ipsum dolor sit amet, consectetur...</h2>
                    <p className={styles.text}>Genießen Sie unser Ambiente,
                        und die exzellente Küche von Peter Hagen-Wies. ...</p>
                </div>
            </div>
            <button onClick={() => props.setActive(true)} className={styles.button}>Посмотреть</button>
        </div>
    )
}