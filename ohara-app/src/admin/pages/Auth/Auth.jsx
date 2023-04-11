import styles from './Auth.module.css'
import {FieldCreator} from "./components/Form/FormCreators";
import {Field, reduxForm} from "redux-form";
import {inputs} from "./components/Constant";
import {ButtonUI} from "../components/ButtonUI/ButtonUI";

const LoginForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {inputs.map(e =>
                FieldCreator(e.id,e.name, e.placeholder, e.validators, e.typeButton, e.style , e.type,  e.typeInput)
            )}
            <div className={styles.title}>
                <Field name={'rememberMe'} component={"input"} type={"checkbox"}/> запомнить вход
            </div>
            <div className={styles.title}>
                <ButtonUI name={"Авторизоваться"}/>
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
