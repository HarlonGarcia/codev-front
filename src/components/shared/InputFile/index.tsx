import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { IoCloseSharp } from "react-icons/io5";

import * as S from './styles';

interface InputFileProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  onChange?: () => void;
  label?: string;
  image?: string;
  showCloseButton?: boolean;
  showButton?: boolean;
  error?: string;	
  className?: string; 
  variant?: 'green' | 'lavender' | 'coolgrey'; 
}

import imagePlaceholder from '../../../../public/images/card-image-placeholder.png';

export const InputFile = <T extends FieldValues>({ 
  register,
  onChange: onImageChange,
  image,
  label,
  variant,
  className,
  showCloseButton = false,
  showButton = false,
}: InputFileProps<T>) => {
  const { t } = useTranslation();
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
    onImageChange?.();

    if (preview) {
      setPreview(undefined);
      return;
    }
  
    hiddenInputRef.current?.click();
  };

  const removeImage = () => {
    onImageChange?.();
    setPreview(undefined);
  };

  const uploadButtonLabel = preview
    ? t('pages.create_challenge.fields.image.remove')
    : t('pages.create_challenge.fields.image.add');

  const showOutline = Boolean(preview) && showCloseButton;

  useEffect(function setImagePreview() {
    if (!image || !!preview) {
      return;
    }

    setPreview(image);
  }, []);

  return (
    <S.Container colorSchema={variant} className={className}>
      {label && <label>{label}</label>}

      <S.InputWrapper
        colorSchema={variant}
        hasPreview={showOutline}
      >
        {preview && showCloseButton && (
          <S.RemoveButton onClick={removeImage}>
            <IoCloseSharp />
          </S.RemoveButton>
        )}

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
      </S.InputWrapper>


      {showButton && (
        <S.UploadButton type='button' onClick={onUpload}>
          {uploadButtonLabel}
        </S.UploadButton>
      )}
    </S.Container>
  );
};