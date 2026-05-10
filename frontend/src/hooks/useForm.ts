import { useState } from "react";

export const useForm = <T extends object>(initialForm: T) => {
  const [form, setForm] = useState<T>(initialForm);

  const handleOnChangeInput = (name: keyof T, value: T[keyof T]) => {
    setForm({ ...form, [name]: value });
  };

  return {
    ...form,
    handleOnChangeInput,

    setForm,
  };
};
