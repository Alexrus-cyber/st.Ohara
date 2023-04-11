import load from '../../assets/beer-86.gif'
import styles from './Loader.module.css'
export const Loader = () => {
    return (
        <div className={styles.container}>
            <img style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "70%",
                width: "100%",
                height: "100%",
                maxHeight:"90%"
            }} src={load} alt={"load"}></img>
        </div>

    )
}