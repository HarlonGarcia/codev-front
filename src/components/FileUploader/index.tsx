import { ChangeEvent, DragEvent, useRef, useState } from 'react';
import { Trans } from 'react-i18next';

import { LuTrash } from 'react-icons/lu';
import { twMerge } from 'tailwind-merge';

interface FileUploaderProps {
    label: string;
    onChange: (value?: File) => void;
}

const supportedTypes = ['image/jpeg', 'image/png', 'image/gif'];

export const FileUploader = ({ label, onChange }: FileUploaderProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);
    const [preview, setPreview] = useState<string | undefined>();

    const preventDefaultBehavior = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDragOver = (dragging: boolean) => (e: React.DragEvent<HTMLDivElement>) => {
        preventDefaultBehavior(e);
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
        preventDefaultBehavior(event);
      
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

    const classes = twMerge('flex justify-center items-center w-full h-56 text-center leading-10 border border-purple-800 border-dashed rounded-lg cursor-pointer transition-all duration-300 ease-in-out hover:bg-purple-900/30',
        isDraggingOver ? 'border-pink-700 bg-purple-900/30' : 'bg-purple-900/20',
    );

    return (
        <div className='w-full flex flex-col'>
            {!preview && (
                <div
                    onDragOver={handleDragOver(true)}
                    onDragLeave={handleDragOver(false)}
                    onDragEnter={preventDefaultBehavior}
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
                    className={'group relative w-full h-56 border-2 border-dashed border-pink-900/70 rounded-lg overflow-hidden transition-all duration-300 ease-in-out cursor-pointer hover:border-red-500'}
                >                        
                    <div className="hidden absolute inset-0 bg-purple-900/85 items-center justify-center transition-all duration-300 ease-in-out backdrop-blur-[1px] group-hover:flex">
                        
                        <p className="flex items-center gap-2 text-red-500 text-center text-xl font-bold">
                            <Trans>{'global.label.click.remove'}</Trans>
                            <LuTrash />
                        </p>
                    </div>
                    <img
                        className='aspect-square object-cover w-full h-full'
                        src={preview}
                    />
                </div>
            )}
        </div>
    )
}
