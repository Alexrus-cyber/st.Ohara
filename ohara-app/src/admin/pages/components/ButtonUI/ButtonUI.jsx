import styles from "./Button.module.css";

export const ButtonUI = ({name}) => {
    return (
        <button className={styles.button}>{name}</button>
    )
}