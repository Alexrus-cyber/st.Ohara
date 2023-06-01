import {
  maxLength,
  minLength,
  Required,
} from "../../../Auth/components/Validators/Validators";
import { InputUI } from "../../../Auth/components/Form/FormCreators";

export const maxLength100 = maxLength(100);
export const maxLength12 = maxLength(11);

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
  /*  {
      id: 6,
      name: "time",
      placeholder: "Время",
      validators: [Required, maxLength100],
      typeButton: InputUI,
      typeInput: "materialTime",
    },*/
  {
    id: 6,
    name: "guestsCount",
    placeholder: "Количество людей",
    validators: [Required, maxLength100],
    typeButton: InputUI,
    typeInput: "materialPicker",
  },
  {
    id: 7,
    name: "phone",
    placeholder: "Номер телефона",
    validators: [Required, maxLength12, minLength(11)],
    typeButton: InputUI,
    typeInput: "material",
  },
];
