import styles from "./New.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getNew } from "../../../../slices/news";

export const New = () => {
  const { oneNew } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNew());
  }, [dispatch]);
  return (
    <section className={styles.new}>
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          <p className={styles.title}>{oneNew.title}</p>
          <p className={styles.text}>{oneNew.text}</p>
        </div>
        <div className={styles.rightContainer}>
          <img className={styles.img} src={oneNew.img} alt={"xxx"} />
        </div>
      </div>
    </section>
  );
};
