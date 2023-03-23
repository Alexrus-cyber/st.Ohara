import styles from './Module.module.css'

export const Module = ({active,setActive, setAdd, children, onClose}) => {
    if (active){
        document.body.style.overflow = 'hidden';
    }else{
        document.body.style.overflow = 'auto';
    }
    return (
        <div className={active ? styles.active : styles.module} onClick={onClose}>
            <div className={active ? styles.moduleContentActive : styles.moduleContent} onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className={styles.close}>X</button>
                {children}
            </div>
        </div>
    )
}