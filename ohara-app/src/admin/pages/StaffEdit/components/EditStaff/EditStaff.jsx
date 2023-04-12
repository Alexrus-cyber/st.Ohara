import styles from "./EditStaff.module.scss";
import {reduxForm} from "redux-form";
import {FieldCreator} from "../../../Auth/components/Form/FormCreators";
import {ButtonUI} from "../../../components/ButtonUI/ButtonUI";
import {inputsRegister} from "../../../Auth/components/Constant";

export const EditStaff = ({user}) => {
    const onSubmit = (formData) => {
        console.log(formData);
    }
    return (
        <div className={styles.color}>
            <h1>Админ №{user.id}</h1>
            <RegisterReduxForm initialValues={user} onSubmit={onSubmit}/>
        </div>
    )
}

const RegisterForm = ({handleSubmit}) => {
    return (
        <form className={styles.squareContainer} onSubmit={handleSubmit}>
            {inputsRegister.map(e =>
                <div className={styles.textArea} key={e.id}>
                    <p className={styles.p}>{e.placeholder}</p>
                    {FieldCreator(e.id, e.name, e.placeholder, e.validators, e.typeButton, e.style, e.type, e.typeInput)}
                </div>
            )}
            <div className={styles.title}>
                <ButtonUI name={"Сохранить"}/>
            </div>
        </form>
    )
}

const RegisterReduxForm = reduxForm({form: 'registration'})(RegisterForm);