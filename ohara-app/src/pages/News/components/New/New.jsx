import styles from "./New.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useState } from "react";
import { getNew } from "../../../../slices/news";
import { LoaderPage } from "../../../../components/LoaderPage/LoaderPage";

export const New = memo(() => {
  const { oneNew, id } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getNew(id));
    const timer = setTimeout(() => {
      setLoading(false);
    }, 750);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
  }, [dispatch]);
  return loading ? (
    <LoaderPage />
  ) : (
    <section className={styles.new}>
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          <p className={styles.title}>{oneNew.header}</p>
          <p className={styles.text}>{oneNew.description}</p>
        </div>
        <div className={styles.rightContainer}>
          <img className={styles.img} src={oneNew.file} alt={"xxx"} />
        </div>
      </div>
    </section>
  );
});
export default New;
