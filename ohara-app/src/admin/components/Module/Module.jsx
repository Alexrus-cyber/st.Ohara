import styles from './Module.module.css'

export const Module = ({active,setActive, setAdd, children, onClose}) => {

    return (
        <div className={active ? styles.active : styles.module} onClick={onClose}>
            <div className={active ? styles.moduleContentActive : styles.moduleContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}