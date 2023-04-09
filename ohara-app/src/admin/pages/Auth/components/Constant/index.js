import {maxLength, Required, minLength} from "../Validators/Validators";
import {InputLogin} from "../Form/FormCreators";
import styles from "../../Auth.module.css";

export const maxLength20 = maxLength(20)
export const maxLength25 = maxLength(25)
export const maxLength100 = maxLength(100)
const minLength8 = minLength(8)
const minLength3 = minLength(3)

export const inputs = [
    {
        id:1,
        name: 'Email',
        placeholder: 'email',
        validators: [Required, maxLength25, minLength8],
        typeButton: InputLogin,
        style: styles.title
    },
    {
        id:2,
        name: 'Password',
        placeholder: 'password',
        validators: [Required, maxLength20, minLength8],
        typeButton: InputLogin,
        style: styles.title,
        type: "password"
    },
]

export const inputsRegister = [
    {
        id:1,
        name: 'email',
        placeholder: 'Почта',
        validators: [Required, maxLength25,minLength8],
        typeButton: InputLogin,
    },
    {
        id:2,
        name: 'password',
        placeholder: 'Пароль',
        validators: [Required, maxLength20,minLength8],
        typeButton: InputLogin,
        type: "password"
    },
    {
        id:3,
        name: 'firstName',
        placeholder: 'Имя',
        validators: [Required, maxLength20,minLength3],
        typeButton: InputLogin,

    },
    {
        id:4,
        name: 'secondName',
        placeholder: 'Фамилия',
        validators: [Required, maxLength20,minLength3],
        typeButton: InputLogin,

    },
    {
        id:5,
        name: 'lastName',
        placeholder: 'Отчество',
        validators: [Required, maxLength20,minLength3],
        typeButton: InputLogin,
    },
    {
        id:6,
        name: 'phoneNumber',
        placeholder: 'Номер',
        validators: [Required, maxLength20,minLength8],
        typeButton: InputLogin,
    },
]