import styles from "./News.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { getNewsData } from "../../slices/news";

const News = () => {
  const { items } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsData());
    window.scrollTo(0, 0);
  }, [dispatch]);

  return (
    <section className={styles.news}>
      <div className={styles.container}>
        <h1 className={styles.title}>Новости</h1>
        {items.slice(0, 1).map((e) => (
          <NavLink key={e.id} className={styles.mainNew} to={"/News/" + e.id}>
            <h1 className={styles.textImg}>{e.header}</h1>
            <img className={styles.mainImg} src={e.file} alt={"xxx"} />
          </NavLink>
        ))}
        <div className={styles.gallery}>
          <div className={styles.content}>
            {items.slice(1, items.length).map((e) => (
              <NavLink
                to={`/News/` + e.id}
                key={e.id}
                className={styles.secondNews}
              >
                <p className={styles.text}>{e.header}</p>
                <img className={styles.img} src={e.file} alt={"xxx"} />
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default News;
