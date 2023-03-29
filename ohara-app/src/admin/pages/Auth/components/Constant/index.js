import {maxLength, Required} from "../Validators/Validators";
import {InputLogin} from "../Form/FormCreators";
import styles from "../../Auth.module.css";

export const maxLength12 = maxLength(20)
export const maxLength16 = maxLength(25)
export const inputs = [
    {
        id:1,
        name: 'Email',
        placeholder: 'Email',
        validators: [Required, maxLength16],
        typeButton: InputLogin,
        style: styles.title
    },
    {
        id:2,
        name: 'Password',
        placeholder: 'Password',
        validators: [Required, maxLength12],
        typeButton: InputLogin,
        style: styles.title,
        type: "password"
    },
]