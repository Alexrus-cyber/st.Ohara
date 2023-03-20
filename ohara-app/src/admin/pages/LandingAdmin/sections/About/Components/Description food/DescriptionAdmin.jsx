import styles from "../../About.module.css";

export const DescriptionAdmin = (props) => {
    console.log(props.img)
    return (
        <>{props.isLeftPosition ? <div className={styles.itemContainer}>
                <img className={styles.imgRes} src={props.img} alt="food"/>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>{props.title}</p>
                    <p className={styles.text}>{props.text}</p>
                </div>
                <img className={styles.imgRes2} src={props.img} alt="food"/>
            </div>
            :
            <div className={styles.itemContainer}>
                <img className={styles.img} src={props.img} alt="food"/>
                <div className={styles.textContainer}>
                    <p className={styles.subtitle}>{props.title}</p>
                    <p className={styles.text}>{props.text}</p>
                </div>
            </div>
        }</>

    )
}