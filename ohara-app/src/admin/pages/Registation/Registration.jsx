import {inputsRegister} from "../Auth/components/Constant";
import {FieldCreator} from "../Auth/components/Form/FormCreators";
import styles from "./Registration.module.css";
import {reduxForm} from "redux-form";
import {ButtonUI} from "../components/ButtonUI/ButtonUI";

export const Registration = () => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div className={styles.container}>
            <div className={styles.squareContainer}>
                <div className={styles.square}>
                    <h1>Регистрация</h1>
                    <RegisterReduxForm onSubmit={onSubmit}/>
                </div>
            </div>
        </div>
    )
}

const RegisterForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {inputsRegister.map(e =>
                <div className={styles.textArea} key={e.id}>
                    <p className={styles.p}>{e.placeholder}</p>
                    {FieldCreator(e.id,e.name, e.placeholder, e.validators, e.typeButton, e.style , e.type)}
                </div>
            )}
            <div className={styles.title}>
                <ButtonUI name={"Зарегистрироваться"}/>
            </div>
        </form>
    )
}

const RegisterReduxForm = reduxForm({form: 'registration'})(RegisterForm);