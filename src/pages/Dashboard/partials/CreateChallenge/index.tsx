import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { zodResolver } from '@hookform/resolvers/zod';
import { FileUploader } from 'components/FileUploader';
import { RichText } from 'components/RichText';
import { Select } from 'components/Select';
import { Input } from 'components/shared/Input';
import { AuthContext } from 'contexts/AuthContext';
import { challengeStatuses } from 'enums/challengeStatus';
import { useCategories } from 'services/category';
import { useCreateChallenge } from 'services/challenge';
import { useTechnologies } from 'services/technology';
import { getPropsExcludeRef } from 'utils';

import { SelectedTechnologies } from './partials/SelectedTechnologies';
import { CreateChallengeSchema, createChallengeSchema } from './validation';

interface ITechnologiesState {
    items: ITechnology[];
    error: string;
}

const CreateChallenge = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { user: currentUser } = useContext(AuthContext);

    const [technologiesState, setTechnologiesState] = useState<ITechnologiesState>({
        items: [],
        error: '',
    });

    const {
        items: selectedTechnologies,
        error: technologiesError,
    } = technologiesState;

    const { data: categories = [] } = useCategories();
    const { data: technologies = [] } = useTechnologies();
    const { mutate: createChallenge } = useCreateChallenge();

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        getValues,
        formState: { errors: formErrors },
    } = useForm<CreateChallengeSchema>({
        resolver: zodResolver(createChallengeSchema),
    });

    const validate = () => {
        const description = getValues('description');
        const hasDescription = description?.replace(/<\/?[^>]+(>|$)/g, '');

        if (!hasDescription) {
            setDescriptionError(t('pages.create_challenge.fields.description.error'));
        }

        if (0 >= selectedTechnologies.length) {
            setTechnologiesState((technologies) => ({
                ...technologies,
                error: t('pages.create_challenge.fields.technologies.error.min'),
            }));
        }
    };

    const onSubmit: SubmitHandler<CreateChallengeSchema> = (formValues) => {
        if (technologiesError) {
            return;
        }

        const newChallenge = {
            ...formValues,
            technologies: selectedTechnologies.map(({ id }) => id),
            authorId: currentUser?.id,
        };

        createChallenge(newChallenge, {
            onSuccess: () => {
                toast.success(t('pages.create_challenge.submit.success'));
                navigate('/challenges')
            },
        });
    };

    const setDescriptionError = (message: string = '') => {
        setError('description', {
            type: 'required',
            message,
        })
    };

    const handleDescriptionChange = (value: string) => {
        const text = value.replace(/<\/?p[^>]*>/g, '');
        
        if (!text) {
            setDescriptionError(t('pages.create_challenge.fields.description.error'));
        } else {
            setDescriptionError();
        }

        setValue('description', value)
    };

    const addTechnology = (event: ChangeEvent<HTMLSelectElement>) => {
        if (5 <= selectedTechnologies.length) {
            toast(t('pages.create_challenge.fields.technologies.error.limit'));
            return;
        }

        const technologyId = event.target.value;
        const isTechAlreadyAdded = selectedTechnologies
            .some(({ id }) => id === technologyId)

        if (isTechAlreadyAdded) {
            return;
        }

        const newTechnology = technologies.find(({ id }) => id === technologyId);

        if (!newTechnology) {
            return;
        }

        setTechnologiesState((prevState) => ({
            error: '',
            items: [...prevState.items, newTechnology],
        }));
    };

    const removeChallenge = (technologyId: string) => {
        setTechnologiesState((prevState) => ({
            ...prevState,
            items: prevState.items.filter(({ id }) => id !== technologyId),
        }));
    };

    const handleFieldChange = (field: keyof CreateChallengeSchema, value: unknown) => {
        setValue(field, value);
    };

    const hydratedCategories = useMemo(() => {
        if (0 === categories.length) {
            return [];
        }

        setValue('categoryId', categories[0].id);

        return categories.map(({ id, name }) => ({
            key: id,
            label: name,
            value: id,
        }));
    }, [categories]);

    const hydratedTechnologies = useMemo(() => {
        const filteredTechnologies = technologies
            .filter(({ id }) => {
                return !selectedTechnologies.some((tech) => tech.id === id);
            });

        return filteredTechnologies.map(({ id, name }) => ({
            key: id,
            label: name,
            value: id,
        }));
    }, [technologies, selectedTechnologies]);

    const statuses = useMemo(() => {
        const unwantedStatuses = [challengeStatuses.CANCELED.id, challengeStatuses.FINISHED.id];
        const filteredStatuses = Object
            .values(challengeStatuses)
            .filter(({ id }) => !unwantedStatuses.includes(id));

        setValue('status', filteredStatuses[0]?.id);
    
        return filteredStatuses.map(({ id, label }) => ({
            key: id,
            value: id,
            label,
        }));
    }, [technologies]);

    return (
        <div className='max-w-[80rem] mx-auto'>
            <div className='flex flex-col gap-8'>
                <Input
                    {...register('title')}
                    label={t('pages.create_challenge.fields.title.label')}
                    error={formErrors.title?.message}
                    size={'xl'}
                    weight={'bold'}
                />
                <RichText
                    onChange={(value) => handleDescriptionChange(value)}
                    error={formErrors.description?.message}
                    placeholder={
                        t('pages.create_challenge.fields.description.placeholder')
                    }
                />
                <SelectedTechnologies
                    items={selectedTechnologies}
                    onClick={removeChallenge}
                />
                <div className='grid grid-cols-1 gap-12 mb-6 sm:grid-cols-2 sm:gap-6 md:flex md:flex-wrap md:gap-10'>
                    <Select
                        {...register('categoryId')}
                        label={t('pages.create_challenge.fields.category.label')}
                        error={formErrors.categoryId?.message}
                        onChange={(e) => handleFieldChange('categoryId', e.target.value)}
                        options={hydratedCategories}
                    />
                    <Select
                        id={'technologies'}
                        name={'technologies'}
                        onChange={addTechnology}
                        placeholder={t('global.select.none')}
                        label={t('pages.create_challenge.fields.technologies.label')}
                        error={technologiesError}
                        options={hydratedTechnologies}
                        canDeselect
                    />
                    <Select
                        {...getPropsExcludeRef(register('status'))}
                        label={t('pages.create_challenge.fields.status.label')}
                        onChange={(e) => handleFieldChange('status', e.target.value)}
                        error={formErrors.status?.message}
                        options={statuses}
                    />
                </div>
                <div className='flex flex-col gap-4'>
                    <label className='text-green-800 sm:text-lg'>
                        <Trans>{'pages.create_challenge.fields.image.label'}</Trans>
                    </label>
                    <FileUploader
                        label={t('pages.create_challenge.fields.image.add')}
                        onChange={(file) => handleFieldChange('image', file)}
                        color='secondary'
                        size='xl'
                    />
                </div>
                <button
                    type='submit'
                    onClick={(event) => {
                        const submit = handleSubmit(onSubmit);

                        validate();
                        submit(event);
                    }}
                    className='px-5 py-3 font-semibold text-purple-900 transition-all duration-300 ease-in-out bg-green-800 rounded w-fit md:rounded-lg xl:px-8 xl:text-lg hover:bg-green-900'
                >
                    <Trans>{'pages.create_challenge.submit.label'}</Trans>
                </button>
            </div>
        </div>
    );
}

export default CreateChallenge;