import styles from "./Auth.module.scss";
import { FieldCreator } from "./components/Form/FormCreators";
import { Field, reduxForm } from "redux-form";
import { inputs } from "./components/Constant";
import { ButtonUI } from "../components/ButtonUI/ButtonUI";
import { memo } from "react";
import { useDispatch } from "react-redux";
import { loginMe } from "../../../slices/AuthApi";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {inputs.map((e) =>
        FieldCreator(
          e.id,
          e.name,
          e.placeholder,
          e.validators,
          e.typeButton,
          e.style,
          e.type,
          e.typeInput
        )
      )}
      <div className={styles.title}>
        <Field name={"rememberMe"} component={"input"} type={"checkbox"} />{" "}
        запомнить вход
      </div>
      <div className={styles.title}>
        <ButtonUI name={"Авторизоваться"} />
      </div>
    </form>
  );
};

const Auth = memo(() => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const onSubmit = (formData) => {
    dispatch(loginMe({ email: formData.email, password: formData.password }));
    navigate("/");
  };
  return (
    <div className={styles.container}>
      <div className={styles.squareContainer}>
        <div className={styles.square}>
          <h1>Авторизация</h1>
          <LoginReduxForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
});
export default Auth;
const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);
