import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
} from "@chakra-ui/react";

import './styles.scss'

type FloatInputProps = ComponentPropsWithoutRef<'input'> & {
  label?: ReactNode;
  error?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'bold';
};

export const FloatInput = forwardRef<HTMLInputElement, FloatInputProps>(
  function FloatInput(props, ref) {
    const {
      id,
      label,
      required,
      error,
      ...otherProps
    } = props;

    return (
      <FormControl
        variant="floating"
        id={id}
        isRequired={required}
        isInvalid={!!error}
        className='float-input'
      >
        <ChakraInput
          spellCheck={false}
          ref={ref} {...otherProps}
        />

        {label && (
          <FormLabel>{label}</FormLabel>
        )}

        {error && (
          <FormErrorMessage>{error}</FormErrorMessage>
        )}
      </FormControl>
    )
  }
);
