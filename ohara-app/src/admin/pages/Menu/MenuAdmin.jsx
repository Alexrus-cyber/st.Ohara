import styles from "./MenuAdmin.module.scss";
import React, { memo, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearData,
  getMenuLaunchData,
  getMenuMainData,
} from "../../../slices/menu";
import { Alert, Snackbar } from "@mui/material";
import { ChildrenAdminMenu } from "./Components/ChildrenAdminMenu";

const MenuAdmin = memo(() => {
  const { error } = useSelector((state) => state.menu);
  const [main, setMain] = useState(true);
  const dispatch = useDispatch();

  const getMain = useMemo(() => {
    return <ChildrenAdminMenu getMenu={getMenuMainData} launch={false} />;
  }, [main]);
  const getLaunch = useMemo(() => {
    return <ChildrenAdminMenu getMenu={getMenuLaunchData} launch={true} />;
  }, [main]);

  return (
    <section className={styles.container}>
      <Snackbar
        open={error !== ""}
        autoHideDuration={6000}
        onClose={() => {
          dispatch(clearData());
        }}
      >
        <Alert
          severity="error"
          onClose={() => {
            dispatch(clearData());
          }}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <h1 className={styles.title}>Меню</h1>
      <div className={styles.links}>
        <div onClick={() => setMain(true)} className={styles.formRadioBtn}>
          <input
            type="radio"
            defaultChecked={true}
            onChange={() => setMain(true)}
            id="main1"
            name="menu"
            value="main"
          />
          <label htmlFor={"main1"}>Основное</label>
        </div>
        <div onClick={() => setMain(false)} className={styles.formRadioBtn}>
          <input
            onChange={() => setMain(false)}
            type="radio"
            id="launch2"
            name="menu"
            value="launch"
          />
          <label htmlFor={"launch2"}>Бизнес-ланчи</label>
        </div>
      </div>
      {main && getMain}
      {!main && getLaunch}
    </section>
  );
});

export default MenuAdmin;
