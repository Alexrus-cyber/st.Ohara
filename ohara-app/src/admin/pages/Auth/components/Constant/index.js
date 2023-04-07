import {maxLength, Required} from "../Validators/Validators";
import {InputLogin} from "../Form/FormCreators";
import styles from "../../Auth.module.css";

export const maxLength12 = maxLength(20)
export const maxLength16 = maxLength(25)
export const maxLength100 = maxLength(100)

export const inputs = [
    {
        id:1,
        name: 'Email',
        placeholder: 'email',
        validators: [Required, maxLength16],
        typeButton: InputLogin,
        style: styles.title
    },
    {
        id:2,
        name: 'Password',
        placeholder: 'password',
        validators: [Required, maxLength12],
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
        validators: [Required, maxLength16],
        typeButton: InputLogin,
    },
    {
        id:2,
        name: 'password',
        placeholder: 'Пароль',
        validators: [Required, maxLength12],
        typeButton: InputLogin,
        type: "password"
    },
    {
        id:3,
        name: 'firstName',
        placeholder: 'Имя',
        validators: [Required, maxLength12],
        typeButton: InputLogin,

    },
    {
        id:4,
        name: 'secondName',
        placeholder: 'Фамилия',
        validators: [Required, maxLength12],
        typeButton: InputLogin,

    },
    {
        id:5,
        name: 'lastName',
        placeholder: 'Отчество',
        validators: [Required, maxLength12],
        typeButton: InputLogin,
    },
    {
        id:6,
        name: 'phoneNumber',
        placeholder: 'Номер',
        validators: [Required, maxLength12],
        typeButton: InputLogin,
    },
]