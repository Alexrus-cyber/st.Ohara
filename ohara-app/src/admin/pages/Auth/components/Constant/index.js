import { maxLength, Required } from "../Validators/Validators";
import { InputUI } from "../Form/FormCreators";
import styles from "../../Auth.module.scss";

export const maxLength20 = maxLength(20);
export const maxLength25 = maxLength(25);
export const maxLength100 = maxLength(100);

export const inputs = [
  {
    id: 1,
    name: "email",
    placeholder: "email",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    style: styles.title,
    typeInput: "reg",
  },
  {
    id: 2,
    name: "password",
    placeholder: "password",
    validators: [Required, maxLength20],
    typeButton: InputUI,
    style: styles.title,
    type: "password",
    typeInput: "reg",
  },
];

export const inputsRegister = [
  {
    id: 1,
    name: "email",
    placeholder: "Почта",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "reg",
  },
  {
    id: 2,
    name: "password",
    placeholder: "Пароль",
    validators: [Required, maxLength20],
    typeButton: InputUI,
    type: "password",
    typeInput: "reg",
  },
  {
    id: 3,
    name: "name",
    placeholder: "Имя",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "reg",
  },
  {
    id: 4,
    name: "surname",
    placeholder: "Фамилия",
    validators: [Required, maxLength20],
    typeButton: InputUI,
    typeInput: "reg",
  },
  {
    id: 5,
    name: "patronymic",
    placeholder: "Отчество",
    validators: [Required, maxLength20],
    typeButton: InputUI,
    typeInput: "reg",
  },
  {
    id: 6,
    name: "phoneNumber",
    placeholder: "Номер",
    validators: [Required, maxLength20],
    typeButton: InputUI,
    typeInput: "reg",
  },
  {
    id: 7,
    name: "roleEntity",
    placeholder: "Выберите должность",
    validators: [Required, maxLength20],
    typeButton: InputUI,
    typeInput: "select",
  },
];
