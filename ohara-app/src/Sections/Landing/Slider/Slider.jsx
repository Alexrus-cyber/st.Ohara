import styles from './Slider.module.css'

export const Slider = () => {
    const arr = [
        {id: "r1"},
        {id: "r2"},
        {id: "r3"},
        {id: "r4"},
    ]
    return (
        <section className={styles.sliderMain}>
            <div className={styles.slider}>
                <div className={styles.slides}>
                    {arr.map(a => <input id={a.id} key={a.id} type={"radio"} name={"r"}/>)}

                    <div>

                    </div>

                </div>
            </div>

        </section>
    )
}