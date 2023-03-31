import styles from "./Button.module.css";

export const ButtonUI = ({styleProp, name}) => {
    return (
        <button style={styleProp} className={styles.button}>{name}</button>
    )
}