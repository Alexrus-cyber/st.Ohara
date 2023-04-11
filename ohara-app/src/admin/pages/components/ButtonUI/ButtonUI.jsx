import styles from "./Button.module.css";

export const ButtonUI = ({name, ...props}) => {
    return (
        <button {...props} className={styles.button}>{name}</button>
    )
}