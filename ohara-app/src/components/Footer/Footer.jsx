import styles from "./Footer.module.scss";
import logo from "../../assets/logo.png";
import insta from "../../assets/insta.png";
import telega from "../../assets/telegram.png";
import vk from "../../assets/vk.png";
import { memo } from "react";
import { NavLink } from "react-router-dom";

const Footer = memo(() => {
  const items = [
    {
      id: 1,
      src: insta,
      link: "https://www.instagram.com/st.ohara_irishpub/",
      header: "В инстаграмме",
    },
    {
      id: 2,
      src: vk,
      link: "https://vk.com/irishpubkostroma",
      header: "Во вконтакте",
    },
    {
      id: 3,
      src: telega,
      link: "https://t.me/stohara",
      header: "В телеграмме",
    },
  ];
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <NavLink
            className={styles.imgContainer}
            onClick={() => window.scrollTo(0, 0)}
            to={"/"}
          >
            <img className={styles.img} src={logo} alt={"stOhara"} />
          </NavLink>
          <p className={styles.textLeft}>☘️Ирландский паб в центре Костромы</p>
          <div className={styles.icons}>
            {items.map((el) => (
              <NavLink key={el.id} to={el.link}>
                <img className={styles.icon} src={el.src} alt={"telegrams"} />
              </NavLink>
            ))}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.info}>
            <p>Телефон: +7(494)249-96-00</p>
            <p>Резерв столиков по тел. 499-600</p>
          </div>
          <div className={styles.info}>
            <p>Вс-чт: 12.00-0.00</p>
            <p>Пт-сб: 12.00-1.00</p>
          </div>
        </div>
        <div className={styles.right}>
          <p className={styles.rightTitle}>АКТУАЛЬНЫЕ НОВОСТИ</p>
          {items.map((el) => (
            <NavLink key={el.id} to={el.link} className={styles.rightText}>
              {el.header}
            </NavLink>
          ))}
        </div>
      </div>
      <p className={styles.footerText}>
        © 2023 Europa-Park St.O'Hara Irish Pub
      </p>
    </footer>
  );
});

export default Footer;
