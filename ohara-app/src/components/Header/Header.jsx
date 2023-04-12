import styles from "./Header.module.css"
import logo from "../../assets/logo.png"
import {NavLink} from "react-router-dom";
import {AppBar, Drawer, IconButton, Toolbar, useTheme} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {useState} from "react";

const drawerWidth = "100%";
export const Header = () => {
    const arr = [
        {id: 1, text: "Главная", path: '/'},
        {id: 2, text: "Меню", path: '/Menu'},
        {id: 3, text: "Галерея", path: '/Gallery'},
        {id: 4, text: "Новости", path: '/News'},
        {id: 5, text: "Бронирование", path: '/Reservation'},
    ]
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const handleDrawerClose = () => {
        setOpen(false);
        document.body.style.overflow = 'auto';
    };

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <img className={styles.img} src={logo} alt={"stOhara"}/>
                <AppBar style={{backgroundColor: "transparent", boxShadow: "unset",height: 10}} className={styles.secret} position="fixed" open={open}>
                    <Toolbar style={{maxWidth: 50, width: "100%"}}>
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
                <Drawer className={styles.secret}
                        sx={{
                            flexShrink: 0,
                            "& .MuiDrawer-paper": {
                                width: drawerWidth,
                                boxSizing: "border-box"
                            }
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
                        <h1 className={styles.title}>St.O'hara</h1>
                        <img className={styles.imgSecret} src={logo} alt={"admin"}/>
                        <div className={styles.links}>
                            {arr.map(e =>  <NavLink onClick={handleDrawerClose} key={e.id} to={e.path} className={({isActive}) => (isActive ? styles.active : styles.link)}>{e.text}</NavLink>)}
                        </div>
                    </div>
                </Drawer>
                <div className={styles.middle}>
                    {arr.map(e => <NavLink className={({isActive}) => (isActive ? styles.active : styles.link)} key={e.id} to={e.path}>{e.text}</NavLink>)}
                </div>
            </div>

        </header>
    )
}