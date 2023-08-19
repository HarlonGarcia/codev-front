import { useState, ChangeEvent } from 'react';

export default function useForm<T>(initialState: T) {
  const [ formData, setFormData ] = useState<T>(initialState);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    setFormData({ ...formData, [target.id]: target.value });
  };

  const changeFormPayload = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return {
    formData,
    handleInputChange,
    changeFormPayload
  };
}