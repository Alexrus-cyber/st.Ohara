import styles from "../../Atmosphere.module.css";

export const ContentAdmin = (props) => {
    return (
        <>
            {!props.isLeftPosition ?
                <div className={styles.itemContainer}>
                    <img className={styles.imgRes} src={props.img} alt={"barman"}/>
                    <div className={styles.backContainer}>
                        <img className={styles.img} src={props.img} alt={"barman"}/>
                        <div className={styles.back}></div>
                    </div>
                    <div className={styles.textContainer}>
                        <h5 className={styles.title}>
                            {props.title}
                        </h5>
                        <p className={styles.text}>
                            {props.text1}
                        </p>
                        <p className={styles.text}>
                            {props.text2}
                        </p>
                    </div>
                </div>
                :
                <div className={styles.itemContainer}>
                    <img className={styles.img1} src={props.img} alt={"barman"}/>
                    <div className={styles.textContainer}>
                        <h5 className={styles.title}>
                            {props.title}
                        </h5>
                        <p className={styles.text}>
                            {props.text1}
                        </p>
                        <p className={styles.text}>
                            {props.text2}
                        </p>
                        <div className={styles.buttonContainer}>
                            <div className={styles.backButton}></div>
                            <button className={styles.button}>Меню</button>
                        </div>
                    </div>
                    <div className={styles.backContainer}>
                        <img className={styles.img2} src={props.img} alt={"barman"}/>
                        <div className={props.left === 0 ? styles.back : styles.backRevert}></div>
                    </div>
                </div>
            }
        </>
    )
}