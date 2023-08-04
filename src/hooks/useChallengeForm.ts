import { useState, ChangeEvent } from 'react';

interface ChallengeFormState {
  title: string;
  description: string;
  category: string;
  status: string;
}

const initialState: ChallengeFormState = {
  title: '',
  description: '',
  category: '',
  status: '',
};

const useChallengeForm = (challengeDto?: ChallengeFormState) => {
  const [ formData, setFormData ] = useState<ChallengeFormState>(challengeDto || initialState);

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement | HTMLTextAreaElement >) => {
    setFormData({ ...formData, [target.id]: target.value });
  };

  const handleInputNumberChange = ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    const newValue = target.value.replace(/\D/g, '');
    setFormData({ ...formData, [target.id]: newValue });
  };

  const changeFormPayload = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  return {
    formData,
    handleInputChange,
    handleInputNumberChange,
    changeFormPayload
  };
};

export default useChallengeForm;