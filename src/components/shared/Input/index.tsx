import { InputHTMLAttributes, ReactNode } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
} from '@chakra-ui/react';

type DefaultInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

type InputProps<T extends FieldValues> = DefaultInputProps & {
  label?: ReactNode;
  error?: ReactNode;
  register: UseFormRegister<T>;
  size?: 'sm' | 'md' | 'lg' | 'xl';
};

export const Input = <T extends FieldValues>(props: InputProps<T>) => {
  const {
    id,
    label,
    error,
    required,
    register,
    ...rest
  } = props;

  return (
    <FormControl
      variant="floating"
      id={id}
      isRequired={required}
      isInvalid={!!error}
    >
      <ChakraInput
        {...rest}
        {...register(id as Path<T>)}
        placeholder=" "
      />
      <FormLabel>{label}</FormLabel>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};
