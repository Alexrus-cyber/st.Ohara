import styles from "./Staff.module.css";
import {Search} from "../../components/Search/Search";
import {ItemStaff} from "./components/ItemStaff/ItemStaff";
import {NavLink} from "react-router-dom";


export const Staff = () => {

    const arr = [
        {id: 1, firstName: "Алексей", secondName: "Рассадин", lastName: "Владимирович", email: "eloBoss@mail.ru", password: "12345", phoneNumber: "79515152321"},
        {id: 2, firstName: "Владимир", secondName: "Рассадин",lastName: "Владимирович", email: "eloBoss@mail.ru", password: "12345", phoneNumber: "79515152321"},
        {id: 3, firstName: "gdsfgsdfgdfsg", secondName: "gfdsgfdsgdfsgdfs",lastName: "Владимирович", email: "eloBoss@mail.ru", password: "12345", phoneNumber: "79515152321"},
        {id: 4, firstName: "fadsfdasfsad", secondName: "Рассадин",lastName: "Владимирович", email: "eloBoss@mail.ru", password: "12345", phoneNumber: "79515152321"},
    ]
    return (
        <div className={styles.container}>
            <div className={styles.squareContainer}>
                <div className={styles.square}>
                    <h1 className={styles.title}>Работники</h1>
                    <div className={styles.search}>
                        <Search/>
                    </div>
                    <div className={styles.list}>
                        {arr.map((element) =>
                            <ItemStaff data={element} email={element.email} firstName={element.firstName} secondName={element.secondName} id={element.id} key={element.id}/>)}
                    </div>
                    <NavLink to={"/registration"} style={{margin:20}}>
                        <button className={styles.button}>Создать</button>
                    </NavLink>
                </div>
            </div>
        </div>
    )
}