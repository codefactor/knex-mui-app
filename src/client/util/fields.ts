import { Field } from "../clientTypes";

export function isEntityValid<T>(fields: Field<T>[], entity: Partial<T>) {
  let valid = true;
  fields.forEach((field) => {
    if (field.required && !entity[field.prop]) {
      valid = false;
    }
  });
  return valid;
}
