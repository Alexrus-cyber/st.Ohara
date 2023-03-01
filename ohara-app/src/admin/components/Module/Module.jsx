import styles from './Module.module.css'

export const Module = ({active,setActive, setAdd, children}) => {

    return (
        <div className={active ? styles.active : styles.module} onClick={() => {
            setActive(false)
            if (setAdd){
               setAdd(false)
            }

        }}>
            <div className={active ? styles.moduleContentActive : styles.moduleContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}