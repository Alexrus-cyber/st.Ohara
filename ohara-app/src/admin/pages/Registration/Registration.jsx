import { inputsRegister } from "../Auth/components/Constant";
import { FieldCreator } from "../Auth/components/Form/FormCreators";
import styles from "./Registration.module.scss";
import { reduxForm } from "redux-form";
import { ButtonUI } from "../components/ButtonUI/ButtonUI";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { addStaff } from "../../../slices/staff";
import { useNavigate } from "react-router-dom";

const Registration = memo(() => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const onSubmit = (formData) => {
    dispatch(addStaff(formData));
    navigate("/staff");
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
});

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
            e.typeInput,
            e.normalize
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        <ButtonUI style={custom} name={"Создать"} />
      </div>
    </form>
  );
};

export default Registration;
const RegisterReduxForm = reduxForm({ form: "registration" })(RegisterForm);
