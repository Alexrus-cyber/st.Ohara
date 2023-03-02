import styles from './Card.module.css'
import close from '../../../../../assets/close.png'
import redact from '../../../../../assets/redact.png'
import {Module} from "../../../../components/Module/Module";
import {useCallback, useState} from "react";
import {DeleteModule} from "../../../components/DeleteModule/DeleteModule";
import {deleteNew} from "../../../../../slices/news";

export const Card = ({ handleClickItem, data,setModuleState }) => {
    const [isOpenModal, setOpenModal] = useState(false);
    
    const handleClickOpenNews = useCallback((newsData) => {
        setOpenModal(true);
    }, [])

    const handleClickCloseModal = useCallback(() => {
        setOpenModal(false);
    }, [])

    return (
        <div style={{backgroundImage: `url("${data.img}")`}} className={styles.card}>
            <div className={styles.container}>
                <div className={styles.closeContainer}>
                    <img className={styles.img} onClick={() => {
                        handleClickItem()
                        setModuleState(data)
                    }}  src={redact} alt={"redact"}/>
                    <img className={styles.img} onClick={() => handleClickOpenNews()} src={close} alt={"close"}/>
                </div>
                <div className={styles.textContainer}>
                    <h2 className={styles.title}>{data.title.substring(0, 30) + "..."}</h2>
                    <p className={styles.text}>{data.text.substring(0, 80) + "..."}</p>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                <button onClick={() => {
                    handleClickItem()
                    setModuleState(data)
                }} className={styles.button}>Посмотреть</button>
            </div>
            <Module active={isOpenModal} setActive={setOpenModal} onClose={handleClickCloseModal}>
                <DeleteModule delete={deleteNew} id={data.id} onClose={handleClickCloseModal}/>/>
            </Module>
        </div>
    )
}