import styles from "../../Staff.module.scss";
import ModeEdit from "@mui/icons-material/ModeEdit";
import {IconButton} from "@mui/material";
import Close from "@mui/icons-material/Close";
import {EditStaff} from "../EditStaff/EditStaff";
import {memo, useCallback, useMemo, useState} from "react";
import {Module} from "../../../../components/Module/Module";


export const ItemStaff = memo(({data}) => {
    const [isOpenModal, setOpenModal] = useState(false);

    const handleClickCloseModal = useCallback(() => {
        setOpenModal(false);
    }, [])

    const getModalWindow = useMemo(() => {
        return (
            <Module active={isOpenModal} setActive={setOpenModal} onClose={handleClickCloseModal}>
                {isOpenModal ?  <EditStaff onClose={handleClickCloseModal} user = {data}/> : ""}
            </Module>
        )
    }, [handleClickCloseModal, isOpenModal, data])

    return (
        <div className={styles.listItem}>
            <div className={styles.content}>
                <p className={styles.padding}>ФИО: {data.firstName} {data.secondName.substring(0, 1).toUpperCase()}.</p>
                <p className={styles.padding}>Почта: {data.email}</p>
            </div>
            <div className={styles.icons}>
                <IconButton onClick={() => {setOpenModal(true)}}>
                    <ModeEdit  style={{color: "#1C675A"}}/>
                </IconButton>
                <IconButton>
                    <Close style={{color: "red"}}/>
                </IconButton>
            </div>
            {getModalWindow}
        </div>

    )
})