import { ElementType, useCallback, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import { getAllUsers } from '../../store/features/usersSlice';
import { Input } from '../../components/Input';
import * as S from './styles';
import { MIN_SEARCH_LENGTH } from '../../utils/constants';
import { AppDispatch } from '../../store';
import { useCustomSelector } from '../../store/useCustomSelector';

export default function Users() {
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading } = useCustomSelector((state) => state.users);

  const getUsers = useCallback((searchTerm = '') => {
    const filters = {
      startsWith: searchTerm,
    };

    dispatch(getAllUsers(filters));
  }, []);

  const getUsersWithDebounce = useMemo(() => debounce(getUsers, 500), [getUsers]);

  const isSearchTermValid = (searchTerm: string) => searchTerm.length > MIN_SEARCH_LENGTH;

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;

    setSearchTerm(searchTerm);

    if (isSearchTermValid(searchTerm)) {
      getUsersWithDebounce(searchTerm);
    }
  };

  return (
    <S.Container>
      <Input.Root>
        <Input.Content 
          placeholder='Buscar' 
          value={searchTerm} 
          onChange={handleSearch} 
          disabled={isLoading}
        />
        <Input.Action 
          icon={(FaSearch as ElementType)} 
          onClick={() => console.log('Oi')}
          disabled={isLoading}
        />
      </Input.Root>
    </S.Container>
  );
}
