import { memo } from "react";
import { Field, reduxForm } from "redux-form";
import { FieldCreator, InputUI } from "../../Auth/components/Form/FormCreators";
import { ButtonUI } from "../../components/ButtonUI/ButtonUI";
import { reservationInputs, reservationInputsRight } from "./Inputs";
import styles from "./ModalReservation.module.scss";
import { useDispatch } from "react-redux";
import { createBooking } from "../../../../slices/booking";

const ModalReservation = memo(({ onClose, table }) => {
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    console.log(formData);
    onClose();
    dispatch(
      createBooking({
        data: formData,
        callback: (result) => {
          window.location.href = result;
        },
      })
    );
  };

  const tables = {
    price: "3000",
    hall: table.hall,
    tableNumber: table.number,
  };
  return (
    <ReservationReduxForm
      initialValues={tables}
      table={tables}
      onSubmit={onSubmit}
    />
  );
});

const ReservationForm = ({ handleSubmit, table }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Стол №{table.tableNumber}</h1>
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
