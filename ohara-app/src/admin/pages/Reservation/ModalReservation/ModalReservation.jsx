import { memo, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { FieldCreator, InputUI } from "../../Auth/components/Form/FormCreators";
import { ButtonUI } from "../../components/ButtonUI/ButtonUI";
import { reservationInputs, reservationInputsRight } from "./Inputs";
import styles from "./ModalReservation.module.scss";
import { useDispatch } from "react-redux";
import { createBooking } from "../../../../slices/booking";

const ModalReservation = memo(({ onClose, table }) => {
  if (table.reserve && table.reserve.status === "Progress") {
    onClose();
  }
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    console.log(formData);
    onClose();
    dispatch(
      createBooking({
        id: table.id,
        data: formData,
        callback: (result) => {
          window.location.href = result;
        },
      })
    );
  };
  return (
    <div>
      <h1>Стол №{table.number}</h1>
      <ReservationReduxForm onSubmit={onSubmit} />
    </div>
  );
});

const ReservationForm = ({ handleSubmit }) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
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
      <div className={styles.display}>
        <input type={"checkbox"} onChange={() => setDisabled(!disabled)} />
        <p>Вы согласны на обработку персональных данных</p>
      </div>
      <div className={styles.padding}>
        <ButtonUI disabled={!disabled && true} name={"Забронировать"} />
      </div>
    </form>
  );
};

export default ModalReservation;
const ReservationReduxForm = reduxForm({ form: "reservation" })(
  ReservationForm
);
