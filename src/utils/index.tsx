import { ChangeHandler, RefCallBack } from 'react-hook-form';

/* eslint-disable @typescript-eslint/no-unused-vars */
type ObjectDiffParams = {
    base?: object;
    target?: object;
}

type RegisterProps = {
    onChange: ChangeHandler;
    onBlur: ChangeHandler;
    ref: RefCallBack;
    name: string;
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    minLength?: number;
    pattern?: string;
    required?: boolean;
    disabled?: boolean;
}

export const githubUrlRegex = new RegExp(/\bgithub.com\b/);

export const getCookie = (key: string) => {
    const cookies = `; ${document.cookie}`;
    const parts = cookies.split(`; ${key}=`);

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift();
    }
};

export const getBase64Image = (image?: string) => {
    return image ? `data:image/jpeg;base64,${image}` : undefined;
};


export const getObjectDiff = ({ base, target }: ObjectDiffParams) => {
    type TargetKey = keyof typeof target;
    type TargetType = Record<TargetKey, unknown>;

    const baseObject = base as TargetType;

    if (!target || JSON.stringify(base) === JSON.stringify(target)) {
        return null;
    }

    if (!base) {
        return target;
    }

    const diffItems = {} as TargetType;
    const keys = Object.keys(target) as TargetKey[];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];

        if (baseObject[key] !== target[key]) {
            diffItems[key] = target[key];
        }
    }

    return diffItems;
}

export const getPropsExcludeRef = (props: RegisterProps) => {
    const { ref, ...rest } = props;

    return rest;
}