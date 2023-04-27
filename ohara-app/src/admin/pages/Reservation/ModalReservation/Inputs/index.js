import { Required } from "../../../Auth/components/Validators/Validators";
import { InputUI } from "../../../Auth/components/Form/FormCreators";
import { maxLength25 } from "../../../Auth/components/Constant";

export const reservationInputs = [
  {
    id: 1,
    name: "email",
    placeholder: "Почта",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 2,
    name: "fio",
    placeholder: "ФИО",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 3,
    name: "phoneNumber",
    placeholder: "Номер телефона",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "material",
  },
];
export const reservationInputsRight = [
  {
    id: 4,
    name: "date",
    placeholder: "Дата",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "materialDate",
  },
  {
    id: 5,
    name: "fio",
    placeholder: "ФИО",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 6,
    name: "email",
    placeholder: "Почта",
    validators: [Required, maxLength25],
    typeButton: InputUI,
    typeInput: "material",
  },
];
