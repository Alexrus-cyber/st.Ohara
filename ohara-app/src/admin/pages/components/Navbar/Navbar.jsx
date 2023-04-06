import styles from './Navbar.module.css';
import admin from '../../../../assets/admin.png'
import {NavLink} from "react-router-dom";
import {AppBar, Drawer, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const drawerWidth = 240;
export const Navbar = () => {
    const arr = [
        {id: 5, src: "/landingAdmin", text: "Главная"},
        {id: 1, src: "/menuAdmin", text: "Меню"},
        {id: 2, src: "/newsAdmin", text: "Новости"},
        {id: 3, src: "/galleryAdmin", text: "Галерея"},
        {id: 4, src: "/reservationAdmin", text: "Бронирование"},
        {id: 6, src: "/staff", text: "Работники"},
    ]
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <>
            <AppBar style={{backgroundColor: "transparent", boxShadow: "unset"}} className={styles.secret} position="fixed" open={open}>
                <Toolbar>
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
                    <img className={styles.img} src={admin} alt={"admin"}/>
                    <p className={styles.name}>Анастасия Михайлова</p>
                    <div className={styles.links}>
                        {arr.map(e =>  <NavLink key={e.id} to={e.src} className={({isActive}) => (isActive ? styles.active : styles.link)}>{e.text}</NavLink>)}
                    </div>
                </div>
            </Drawer>
            <div className={styles.navbar}>
                <h1 className={styles.title}>St.O'hara</h1>
                <img className={styles.img} src={admin} alt={"admin"}/>
                <p className={styles.name}>Анастасия Михайлова</p>
                <div className={styles.links}>
                    {arr.map(e =>  <NavLink key={e.id} to={e.src} className={({isActive}) => (isActive ? styles.active : styles.link)}>{e.text}</NavLink>)}
                </div>
            </div>
        </>

    )
}