import styles from "../../Staff.module.css";
import {NavLink} from "react-router-dom";
import ModeEdit from "@mui/icons-material/ModeEdit";
import {IconButton} from "@mui/material";
import Close from "@mui/icons-material/Close";
import {EditStaff} from "../EditStaff/EditStaff";
import {useCallback, useMemo, useState} from "react";
import {nanoid} from "@reduxjs/toolkit";
import {Module} from "../../../../components/Module/Module";


export const ItemStaff = ({data}) => {
    const [modalState, setModalState] = useState(data)
    const [isOpenModal, setOpenModal] = useState(false);

    const handleClickCloseModal = useCallback(() => {
        setOpenModal(false);
    }, [])

    const getModalWindow = useMemo(() => {
        return (
            <Module active={isOpenModal} setActive={setOpenModal} onClose={handleClickCloseModal}>
                {isOpenModal ?  <EditStaff onClose={handleClickCloseModal} user = {modalState}/> : ""}
            </Module>
        )
    }, [handleClickCloseModal, isOpenModal, modalState])

    return (
        <div className={styles.listItem}>
            <p className={styles.padding}>Имя: {data.firstName} {data.secondName.substring(0, 1).toUpperCase()}.</p>
            <p className={styles.padding}>Email: {data.email}</p>
                <IconButton onClick={() => {setOpenModal(true)}}>
                    <ModeEdit  style={{color: "#1C675A"}}/>
                </IconButton>
            <IconButton>
                <Close style={{color: "red"}}/>
            </IconButton>
            {getModalWindow}
        </div>

    )
}