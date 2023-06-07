import {
  maxLength,
  minLength,
  Required,
} from "../../../Auth/components/Validators/Validators";
import { InputUI } from "../../../Auth/components/Form/FormCreators";

export const maxLength100 = maxLength(40);
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
    name: "name",
    placeholder: "Имя",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 3,
    name: "surname",
    placeholder: "Фамилия",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "material",
  },
  {
    id: 4,
    name: "patronymic",
    placeholder: "Отчество",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "material",
  },
];
export const reservationInputsRight = [
  {
    id: 5,
    name: "estimatedStartTime",
    placeholder: "Дата",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "materialDate",
  },
  {
    id: 6,
    name: "phone",
    placeholder: "Номер телефона",
    validators: [Required, maxLength12, minLength(12)],
    typeButton: InputUI,
    typeInput: "materialPhone",
    normalize: (value) => {
      if (value.length < 2) {
        return "+7";
      }
      return value;
    },
  },
];
