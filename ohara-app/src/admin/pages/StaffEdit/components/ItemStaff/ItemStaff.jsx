import styles from "../../Staff.module.scss";
import ModeEdit from "@mui/icons-material/ModeEdit";
import { IconButton } from "@mui/material";
import Close from "@mui/icons-material/Close";
import { EditStaff } from "../EditStaff/EditStaff";
import React, { memo, useCallback, useMemo, useState } from "react";
import { Module } from "../../../../components/Module/Module";
import { DeleteModule } from "../../../components/DeleteModule/DeleteModule";
import { deleteStaff } from "../../../../../slices/staff";

export const ItemStaff = memo(({ data }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [del, setDel] = useState(false);
  const handleClickCloseModal = useCallback(() => {
    setOpenModal(false);
    setDel(false);
  }, []);

  const getModalWindow = useMemo(() => {
    return (
      <Module
        active={isOpenModal}
        setActive={setOpenModal}
        onClose={handleClickCloseModal}
        setIsEdit={setIsEdit}
      >
        {isOpenModal ? (
          <EditStaff onClose={handleClickCloseModal} user={data} />
        ) : (
          ""
        )}
      </Module>
    );
  }, [handleClickCloseModal, isOpenModal, data]);
  const getModalDeleteWindow = useMemo(() => {
    return (
      <Module
        active={isOpenModal}
        setActive={setOpenModal}
        onClose={handleClickCloseModal}
      >
        <DeleteModule
          delete={deleteStaff}
          id={data.id}
          onClose={handleClickCloseModal}
        />
        />
      </Module>
    );
  }, [data.id, handleClickCloseModal, isOpenModal]);

  return (
    <div className={styles.listItem}>
      <div className={styles.content}>
        <p className={styles.padding}>
          ФИО: {data.firstName} {data.secondName.substring(0, 1).toUpperCase()}.
        </p>
        <p className={styles.padding}>Почта: {data.email}</p>
      </div>
      <div className={styles.icons}>
        <IconButton
          onClick={() => {
            setOpenModal(true);
            setIsEdit(true);
          }}
        >
          <ModeEdit style={{ color: "#1C675A" }} />
        </IconButton>
        <IconButton
          onClick={() => {
            setOpenModal(true);
            setDel(true);
          }}
        >
          <Close style={{ color: "red" }} />
        </IconButton>
      </div>
      {!del && getModalWindow}
      {!isEdit && getModalDeleteWindow}
    </div>
  );
});
