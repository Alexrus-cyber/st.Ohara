import React, { memo, useMemo, useState } from "react";
import styles from "./Menu.module.scss";
import { ChildrenMenu } from "./ChildrenMenu/ChildrenMenu";
import { getMenuLaunchData, getMenuMainData } from "../../slices/menu";

const Menu = memo(() => {
  const [main, setMain] = useState(true);

  const getMain = useMemo(() => {
    return <ChildrenMenu getMenu={getMenuMainData} />;
  }, [main]);
  const getLaunch = useMemo(() => {
    return <ChildrenMenu getMenu={getMenuLaunchData} />;
  }, [main]);
  return (
    <section className={styles.menu}>
      <div className={styles.container}>
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
      </div>
    </section>
  );
});

export default Menu;
