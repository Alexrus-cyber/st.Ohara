import { memo } from "react";
import { reduxForm } from "redux-form";
import { FieldCreator } from "../../Auth/components/Form/FormCreators";
import { ButtonUI } from "../../components/ButtonUI/ButtonUI";
import { reservationInputs } from "./Inputs";
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
    <form onSubmit={handleSubmit}>
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
      </div>
      <div>
        <ButtonUI name={"Забронировать"} />
      </div>
    </form>
  );
};

export default ModalReservation;
const ReservationReduxForm = reduxForm({ form: "reservation" })(
  ReservationForm
);
