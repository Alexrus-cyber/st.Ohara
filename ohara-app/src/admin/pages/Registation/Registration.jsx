import { inputsRegister } from "../Auth/components/Constant";
import { FieldCreator } from "../Auth/components/Form/FormCreators";
import styles from "./Registration.module.scss";
import { reduxForm } from "redux-form";
import { ButtonUI } from "../components/ButtonUI/ButtonUI";

export const Registration = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <div className={styles.container}>
      <div className={styles.squareContainer}>
        <div className={styles.square}>
          <h1 className={styles.title}>Создание администратора</h1>
          <RegisterReduxForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

const RegisterForm = ({ handleSubmit }) => {
  const custom = {
    backgroundColor: " #7D4A7D",
  };
  return (
    <form onSubmit={handleSubmit}>
      {inputsRegister.map((e) => (
        <div className={styles.textArea} key={e.id}>
          <p className={styles.p}>{e.placeholder}</p>
          {FieldCreator(
            e.id,
            e.name,
            e.placeholder,
            e.validators,
            e.typeButton,
            e.style,
            e.type,
            e.typeInput
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <ButtonUI style={custom} name={"Создать"} />
      </div>
    </form>
  );
};

const RegisterReduxForm = reduxForm({ form: "registration" })(RegisterForm);