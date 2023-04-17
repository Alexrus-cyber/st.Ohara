import styles from "./Footer.module.scss";
import logo from "../../assets/logo.png";
import insta from "../../assets/insta.png";
import vk from "../../assets/vk.png";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { getNewsData } from "../../slices/news";
import { NavLink } from "react-router-dom";

const Footer = memo(() => {
  const { news } = useSelector((state) => state.news);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getNewsData());
  }, [dispatch]);
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <img className={styles.img} src={logo} alt={"stOhara"} />
          <p className={styles.textLeft}>
            Ammolite - The Lighthouse Restaurant Peter-Thumb-Straße 6 77977 Rust
            Deutschland
          </p>
          <div className={styles.icons}>
            <img className={styles.icon} src={insta} alt={"stOhara"} />
            <img className={styles.icon} src={vk} alt={"stOhara"} />
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.info}>
            <p>Telefon: +7(432)432-20-30</p>
            <p>Telefon: +7(432)432-20-30</p>
          </div>
          <div className={styles.info}>
            <p>Telefon: +7(432)432-20-30</p>
            <p>Telefon: +7(432)432-20-30</p>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.rightTitle}>АКТУАЛЬНЫЕ НОВОСТИ</p>
          {news.slice(-3).map((el) => (
            <NavLink
              key={el.id}
              to={`new/${el.id}`}
              className={styles.rightText}
            >
              {el.title}
            </NavLink>
          ))}
        </div>
      </div>
      <p className={styles.footerText}>
        © 2022 Europa-Park St.O'Hara Irish Pub
      </p>
    </footer>
  );
});

export default Footer;
