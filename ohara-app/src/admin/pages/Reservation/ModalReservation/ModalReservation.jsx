import { memo } from "react";
import { Field, reduxForm } from "redux-form";
import { FieldCreator, InputUI } from "../../Auth/components/Form/FormCreators";
import { ButtonUI } from "../../components/ButtonUI/ButtonUI";
import { reservationInputs, reservationInputsRight } from "./Inputs";
import styles from "./ModalReservation.module.scss";

const ModalReservation = memo(({ onClose }) => {
  const onSubmit = (formData) => {
    console.log(formData);
    onClose();
  };
  return <ReservationReduxForm onSubmit={onSubmit} />;
});

const ReservationForm = ({ handleSubmit }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Стол №1</h1>
      <div className={styles.container}>
        <div>
          {reservationInputs.map((e) => (
            <div className={styles.field} key={e.id}>
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
        </div>
        <div>
          {reservationInputsRight.map((e) => (
            <div className={styles.field} key={e.id}>
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
        </div>
      </div>
      <div className={styles.message}>
        <Field
          name={`message`}
          component={InputUI}
          title={"Сообщение"}
          typeInput={"text"}
        />
      </div>

      <div className={styles.padding}>
        <ButtonUI name={"Забронировать"} />
      </div>
    </form>
  );
};

export default ModalReservation;
const ReservationReduxForm = reduxForm({ form: "reservation" })(
  ReservationForm
);
