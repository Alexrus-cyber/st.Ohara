import styles from "./Staff.module.scss";
import { Search } from "../../components/Search/Search";
import { ItemStaff } from "./components/ItemStaff/ItemStaff";
import { NavLink } from "react-router-dom";
import { UseDebounce } from "../../hoocks/UseDebounce";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStaffData, setSearchValue } from "../../../slices/staff";

const Staff = memo(() => {
  const { staffList, searchValue } = useSelector((state) => state.staff);
  const [text, setText] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStaffData());
  }, [dispatch]);

  const makeRequest = UseDebounce((value) => {
    dispatch(setSearchValue(value));
  }, 300);

  const handleChange = (element) => {
    const { value } = element.target;
    makeRequest(value);
    setText(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.squareContainer}>
        <div className={styles.square}>
          <h1 className={styles.title}>Работники</h1>
          <div className={styles.search}>
            <Search
              value={text}
              onChange={handleChange}
              placeholder={"Поиск"}
            />
            <NavLink to={"/registration"} className={styles.buttonContainer}>
              <button className={styles.button}>Создать</button>
            </NavLink>
          </div>
          <div className={styles.list}>
            {staffList
              .filter((item) => {
                return searchValue.toLowerCase() === ""
                  ? item
                  : item.email.toLowerCase().includes(searchValue) ||
                      item.email.includes(searchValue);
              })
              .map((element) => (
                <ItemStaff
                  data={element}
                  email={element.email}
                  name={element.name}
                  surname={element.surname}
                  id={element.id}
                  key={element.id}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
});
export default Staff;
