import styles from './Module.module.css'

export const Module = ({active, children, onClose, title, setIsEdit}) => {
    if (active) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    if (!title){
        title = "";
    }

    return (
        <div className={active ? styles.active : styles.module} onClick={() => {
            onClose()
            if (setIsEdit) {
                setIsEdit(false)
            }
        }}>
            <div className={active ? styles.moduleContentActive : styles.moduleContent}
                 onClick={(e) => e.stopPropagation()}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{title}</h1>
                    <button onClick={() => {
                        onClose()
                        if (setIsEdit) {
                            setIsEdit(false)
                        }
                    }} className={styles.close}>X
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}