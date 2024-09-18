import { ChangeEvent, useRef, useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import * as S from './styles';

interface InputFileProps<T extends FieldValues> {
  error?: string;	
  register: UseFormRegister<T>;    
}

const imagePlaceholder = 'https://placehold.co/200/120F26/342F48?&text=:/&font=roboto';

export const InputFile = <T extends FieldValues>({ 
  register,
}: InputFileProps<T>) => {
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | undefined>(undefined);

  const { ref: registerRef, onChange, ...rest } = register('image' as Path<T>);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event);

    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const onUpload = () => {
    if (preview) {
      setPreview(undefined);
      return;
    }
  
    hiddenInputRef.current?.click();
  };

  const uploadButtonLabel = 
    preview ? "Remove image" : "Upload image";

  return (
    <S.Container>
      <label>Capa do desafio</label>

      <input
        type={'file'}
        {...rest}
        onChange={handleFileUpload}
        ref={(e) => {
          registerRef(e);
          hiddenInputRef.current = e;
        }}
      />

      <img
        src={preview ?? imagePlaceholder}
        onClick={!preview ? onUpload : () => {}}
      />

      <S.UploadButton type='button' onClick={onUpload}>
        {uploadButtonLabel}
      </S.UploadButton>
    </S.Container>
  );
};