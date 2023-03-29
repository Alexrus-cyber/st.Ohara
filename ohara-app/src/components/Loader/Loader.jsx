import load from '../../assets/Loader.gif'
import styles from './Loader.module.css'
export const Loader = () => {
    return (
        <div className={styles.container}>
            <img style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: "100px",
                width: "100%",
                height: "100%",
                maxHeight:"100px"
            }} src={load} alt={"load"}></img>
        </div>

    )
}