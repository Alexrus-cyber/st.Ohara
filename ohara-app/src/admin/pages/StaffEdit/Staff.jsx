import styles from "./Staff.module.scss";
import { Search } from "../../components/Search/Search";
import { ItemStaff } from "./components/ItemStaff/ItemStaff";
import { NavLink } from "react-router-dom";
import { UseDebounce } from "../../hoocks/UseDebounce";
import { useState } from "react";

export const Staff = () => {
  const arr = [
    {
      id: 1,
      firstName: "Алексей",
      secondName: "Рассадин",
      lastName: "Владимирович",
      email: "1eloBoss@mail.ru",
      password: "12345",
      phoneNumber: "79515152321",
    },
    {
      id: 2,
      firstName: "Владимир",
      secondName: "Рассадин",
      lastName: "Владимирович",
      email: "kok@mail.ru",
      password: "12345",
      phoneNumber: "79515152321",
    },
    {
      id: 3,
      firstName: "gdsfgsdfgdfsg",
      secondName: "gfdsgfdsgdfsgdfs",
      lastName: "Владимирович",
      email: "efdsa@mail.ru",
      password: "12345",
      phoneNumber: "79515152321",
    },
    {
      id: 4,
      firstName: "fadsfdasfsad",
      secondName: "Рассадин",
      lastName: "Владимирович",
      email: "e432@mail.ru",
      password: "12345",
      phoneNumber: "79515152321",
    },
  ];

  const [data, setData] = useState(arr);
  const [text, setText] = useState("");

  const makeRequest = UseDebounce(() => {
    const filteredValues = data.filter(
      (item) => item.email.toLowerCase().indexOf(text.toLowerCase()) !== -1
    );
    setData(filteredValues);
  }, 300);

  const handleChange = (element) => {
    const { value } = element.target;
    makeRequest(value);
    setText(value);
    if (value === "") {
      setData(arr);
    }
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
            {data.map((element) => (
              <ItemStaff
                data={element}
                email={element.email}
                firstName={element.firstName}
                secondName={element.secondName}
                id={element.id}
                key={element.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
