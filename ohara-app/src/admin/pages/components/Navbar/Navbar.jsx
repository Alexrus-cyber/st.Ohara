import styles from "./Navbar.module.scss";
import admin from "../../../../assets/logo.webp";
import { NavLink } from "react-router-dom";
import { AppBar, Drawer, IconButton, Toolbar, useTheme } from "@mui/material";
import { memo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import cl from "classnames";

const drawerWidth = "100%";
const Navbar = memo(() => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleDrawerClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <>
      <AppBar
        style={{
          backgroundColor: "transparent",
          boxShadow: "unset",
          height: 10,
        }}
        className={styles.secret}
        position="fixed"
        open={open}
      >
        <Toolbar style={{ maxWidth: 50, width: "100%" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={styles.secret}
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
        <div className={styles.navbarSecret}>
          <ContentNavbar handleDrawerClose={handleDrawerClose} />
        </div>
      </Drawer>
      <div className={styles.navbar}>
        <ContentNavbar />
      </div>
    </>
  );
});

const ContentNavbar = ({ handleDrawerClose }) => {
  const arr = [
    { id: 5, src: "/landingAdmin", text: "Главная" },
    { id: 1, src: "/menuAdmin", text: "Меню" },
    { id: 2, src: "/newsAdmin", text: "Новости" },
    { id: 3, src: "/galleryAdmin", text: "Галерея" },
    { id: 4, src: "/reservationAdmin", text: "Бронирование" },
    { id: 6, src: "/staff", text: "Работники" },
  ];

  return (
    <>
      <h1 className={styles.title}>St.O'hara</h1>
      <img className={styles.img} src={admin} alt={"admin"} />
      <p className={styles.name}>Анастасия Михайлова</p>
      <div className={styles.links}>
        {arr.map((e) => (
          <NavLink
            key={e.id}
            to={e.src}
            onClick={handleDrawerClose}
            className={({ isActive }) =>
              cl(styles.link, {
                [styles.active]: isActive,
              })
            }
          >
            {e.text}
          </NavLink>
        ))}
      </div>
    </>
  );
};
export default Navbar;
