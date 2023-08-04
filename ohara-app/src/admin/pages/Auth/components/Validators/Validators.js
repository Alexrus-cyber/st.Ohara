export const maxLength = (max) => (value) =>
  value && value.length > max
    ? `Привышение лимита водимых символов максимум ${max}`
    : undefined;

export const Required = (value) =>
  value === undefined ? "Пустое поле" : undefined;

export const minLength = (min) => (value) =>
  value && value.length < min
    ? `Вы не можете ввести меньше ${min} символов`
    : undefined;

export const mailChecked = (value) =>
  !value.includes("@") ? `Введите корректную почту` : undefined;
