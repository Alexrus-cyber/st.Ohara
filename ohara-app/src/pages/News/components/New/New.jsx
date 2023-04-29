import styles from "./New.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { getNew } from "../../../../slices/news";
import { useParams } from "react-router-dom";

export const New = memo(() => {
  const { oneNew } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  const param = useParams();
  useEffect(() => {
    dispatch(getNew(param.id));
    window.scrollTo(0, 0);
  }, [dispatch]);

  console.log(param);
  return (
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
