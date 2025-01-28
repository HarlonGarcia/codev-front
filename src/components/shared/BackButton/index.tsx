import { useNavigate } from 'react-router-dom';

import { MdArrowBackIosNew } from 'react-icons/md';

import * as S from './styles';

interface BackButtonProps {
  path: string;
}

export default function BackButton({ path }: BackButtonProps) {
    const navigate = useNavigate();

    return (
        <S.Button onClick={() => navigate(path)}>
            <MdArrowBackIosNew />
        </S.Button>
    );
}
        