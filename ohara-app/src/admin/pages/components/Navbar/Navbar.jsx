import styles from "./Navbar.module.scss";
import admin from "../../../../assets/logotest.webp";
import { NavLink } from "react-router-dom";
import { AppBar, Drawer, IconButton, Toolbar, useTheme } from "@mui/material";
import { memo, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useDispatch } from "react-redux";
import { setUserNull } from "../../../../slices/AuthApi";

const drawerWidth = "100%";
const Navbar = memo(({ setAdmin, user }) => {
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
          <ContentNavbar
            setAdmin={setAdmin}
            handleDrawerClose={handleDrawerClose}
            user={user}
          />
        </div>
      </Drawer>
      <div className={styles.navbar}>
        <div className={styles.navbarContainer}>
          <ContentNavbar setAdmin={setAdmin} user={user} />
        </div>
      </div>
    </>
  );
});

const ContentNavbar = ({ handleDrawerClose, user }) => {
  const dispatch = useDispatch();
  const arr = [
    { id: 5, src: "/landingAdmin", text: "Главная" },
    { id: 7, src: "/sliderAdmin", text: "Слайдер" },
    { id: 1, src: "/", text: "Меню" },
    { id: 2, src: "/newsAdmin", text: "Новости" },
    { id: 3, src: "/galleryAdmin", text: "Галерея" },
    { id: 4, src: "/reservationAdmin", text: "Бронирование" },
    { id: 6, src: "/staff", text: "Работники" },
  ];

  return (
    <>
      <img className={styles.img} src={admin} alt={"admin"} />
      <h1 className={styles.title}>St.O'hara</h1>
      <p className={styles.name}>{user.name}</p>
      <p>{user.roleEntity === "Admin" ? "Админ" : "Сотрудник"}</p>
      <div className={styles.links}>
        {arr.map((e) => (
          <NavLink
            key={e.id}
            to={e.src}
            onClick={handleDrawerClose}
            className={({ isActive }) =>
              isActive ? styles.active : styles.link
            }
          >
            {e.text}
          </NavLink>
        ))}
      </div>
      <button
        onClick={() => {
          handleDrawerClose;
          sessionStorage.clear();
          dispatch(setUserNull());
        }}
        className={styles.buttonBack}
      >
        <NavLink onClick={handleDrawerClose} className={styles.back} to={"/"}>
          Выйти
        </NavLink>
      </button>
    </>
  );
};
export default Navbar;
