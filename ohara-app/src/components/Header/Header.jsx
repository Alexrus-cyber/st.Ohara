import styles from "./Header.module.scss";
import logo from "../../assets/logotest.webp";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  createTheme,
  Drawer,
  IconButton,
  ThemeProvider,
  Toolbar,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import cl from "classnames";

const drawerWidth = "100%";
const BreakPointTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 600,
      bg: 900,
      lg: 1200,
    },
  },
});

export { BreakPointTheme };
const Header = () => {
  const arr = [
    { id: 1, text: "Главная", path: "/" },
    { id: 2, text: "Меню", path: "/menu" },
    { id: 3, text: "Галерея", path: "/gallery" },
    { id: 4, text: "Бронирование", path: "/reservation" },
  ];
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
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to={"/"} className={styles.img}>
          <img className={styles.img} src={logo} alt={"stOhara"} />
        </NavLink>
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
        <ThemeProvider theme={BreakPointTheme}>
          <Drawer
            className={styles.secret}
            sx={{
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: {
                  xs: drawerWidth,
                  sm: drawerWidth,
                  md: 420,
                  bg: 420,
                  lg: 420,
                },
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
              <img className={styles.imgSecret} src={logo} alt={"admin"} />
              <h1 className={styles.title}>St.O'hara</h1>
              <div className={styles.links}>
                {arr.map((e) => (
                  <NavLink
                    onClick={handleDrawerClose}
                    key={e.id}
                    to={e.path}
                    className={({ isActive }) =>
                      isActive ? styles.active : styles.link
                    }
                  >
                    {e.text}
                  </NavLink>
                ))}
              </div>
            </div>
          </Drawer>
        </ThemeProvider>
        <div className={styles.middle}>
          {arr.map((e) => (
            <NavLink
              className={({ isActive }) =>
                cl(styles.link, {
                  [styles.active]: isActive,
                })
              }
              key={e.id}
              to={e.path}
            >
              {e.text}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
