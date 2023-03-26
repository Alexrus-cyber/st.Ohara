import styles from './Auth.module.css'
import {FieldCreator, InputLogin} from "./components/Form/FormCreators";
import {Field, reduxForm} from "redux-form";
import {maxLength, Required} from "./components/Validators/Validators";

const maxLength12 = maxLength(20)
const maxLength16 = maxLength(20)

const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {FieldCreator('Email', 'Email', [Required, maxLength16], InputLogin, styles.title)}
            {FieldCreator('Password', 'Password', [Required, maxLength12], InputLogin, styles.title, "password")}
            <div className={styles.title}>
                <Field name={'rememberMe'} component={"input"} type={"checkbox"}/> запомнить вход
            </div>
            <div className={styles.title}>
                <button className={styles.button}>Авторизоваться</button>
            </div>
        </form>
    )
}


export const Auth = () => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div className={styles.container}>
            <div className={styles.squareContainer}>
                <div className={styles.square}>
                    <h1>Авторизация</h1>
                    <LoginReduxForm onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);
