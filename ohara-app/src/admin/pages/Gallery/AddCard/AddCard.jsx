import styles from './Card.module.css'

export const AddCard = (props) => {
    
    return (
        <div className={styles.card}>
            <div className={styles.plus}>+</div>
        </div>
    )
}