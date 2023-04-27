import {
  maxLength,
  Required,
} from "../../../Auth/components/Validators/Validators";
import { InputUI } from "../../../Auth/components/Form/FormCreators";

export const maxLength100 = maxLength(100);
export const maxLength12 = maxLength(12);

export const reservationInputs = [
  {
    id: 1,
    name: "email",
    placeholder: "Почта",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 2,
    name: "fio",
    placeholder: "ФИО",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 3,
    name: "phoneNumber",
    placeholder: "Номер телефона",
    validators: [Required, maxLength12],
    typeButton: InputUI,
    typeInput: "material",
  },
];
export const reservationInputsRight = [
  {
    id: 4,
    name: "date",
    placeholder: "Дата",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "materialDate",
  },
  {
    id: 5,
    name: "amount",
    placeholder: "Количество людей",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "materialPicker",
  },
];
