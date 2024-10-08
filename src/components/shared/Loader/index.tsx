import { Spinner } from '@chakra-ui/react';

import * as S from './styles';

interface LoaderProps {
  loading?: boolean;
}

export const Loader = ({ loading = true }: LoaderProps) => {
  if (!loading) {
    return <></>;
  }
  return (
    <S.Container>
      <Spinner speed='0.65s' size='xl' />
    </S.Container>
  );
}