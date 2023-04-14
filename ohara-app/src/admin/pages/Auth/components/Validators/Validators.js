export const maxLength = (max) => (value) =>
  value && value.length > max
    ? `Вы привысили лимит водимых символов максимум ${max}`
    : undefined;

export const Required = (value) =>
  value === undefined ? "Вы ничего не ввели" : undefined;

export const minLength = (min) => (value) =>
  value && value.length < min
    ? `Вы не можете ввести меньше ${min} символов`
    : undefined;
