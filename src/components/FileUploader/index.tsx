import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

import { LuTrash } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';
import { ISizeVariant } from 'types';

import { tvPreview, tvUploadArea, tvUploadDragOver } from './variants';

interface FileUploaderProps {
    label: string;
    onChange: (value?: File) => void;
    color?: 'primary' | 'secondary';
    size?: ISizeVariant;
}

const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];

export const FileUploader = ({
    label,
    color,
    size,
    onChange,
}: FileUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | undefined>();

    const handleDragOver = (dragging: boolean) => (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        setIsDraggingOver(dragging);
    };

    const isValidFileType = (file: File) => {        
        return supportedTypes.includes(file.type);
    };

    const handleFiles = (files: FileList) => {
        const file = files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);
      
        reader.onloadend = (event) => {      
            if (isValidFileType(file)) {
                onChange(file);
                setPreview(event.target?.result as string || '');
                setIsDraggingOver(false);
            }
        };
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
      
        const files = event.dataTransfer.files;
        const fileInput = inputRef.current;
      
        if (files.length && fileInput) {
            fileInput.files = files;
      
            handleFiles(files);
        }
    };

    const handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
       
        if (files?.length) {      
            handleFiles(files);
        }
    };

    const classes = twMerge(tvUploadArea({ color, size }),
        isDraggingOver ? tvUploadDragOver({ color }) : '',
    );

    return (
        <div className='flex flex-col w-full'>
            {!preview && (
                <div
                    onDragOver={handleDragOver(true)}
                    onDragLeave={handleDragOver(false)}
                    onDragEnter={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                    }}
                    onDrop={handleDrop}
                    className={classes}
                    onClick={() => inputRef.current?.click()}
                >
                    {label}
                </div>
            )}
            <input
                ref={inputRef}
                type='file'
                onChange={handleSelect}
                hidden
            />
            {preview && (
                <div
                    onClick={() => {
                        onChange(undefined);
                        setPreview(undefined);
                    }}
                    className={tvPreview({ size })}
                >                        
                    <div
                        className="hidden absolute inset-0 bg-purple-900/85 items-center justify-center transition-all duration-300 ease-in-out backdrop-blur-[1px] group-hover:flex"
                    >
                        <p className="flex items-center gap-2 text-xl font-bold text-center text-red-500">
                            <Trans>{'global.label.click.remove'}</Trans>
                            <LuTrash />
                        </p>
                    </div>
                    <img
                        className='object-cover w-full h-full aspect-square'
                        src={preview}
                    />
                </div>
            )}
        </div>
    )
}
