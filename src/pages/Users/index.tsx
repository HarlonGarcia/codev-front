import { ElementType, useCallback, useEffect, useMemo, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { debounce } from 'lodash';
import { useDispatch } from 'react-redux';

import * as S from './styles';
import { getAllUsers } from '../../store/features/usersSlice';
import { Input } from '../../components/Input';
import { MIN_SEARCH_LENGTH } from '../../utils/constants';
import { AppDispatch } from '../../store';
import { useCustomSelector } from '../../store/useCustomSelector';
import UserCard from '../../components/UserCard';

export default function Users() {
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, users } = useCustomSelector((state) => state.users);

  const getUsers = useCallback((searchTerm = '') => {
    const filters = {
      startsWith: searchTerm,
    };

    dispatch(getAllUsers(filters));
  }, []);

  const getUsersWithDebounce = useMemo(() => debounce(getUsers, 500), [getUsers]);

  const isSearchTermValid = (searchTerm: string) => searchTerm.length === 0 || searchTerm.length > MIN_SEARCH_LENGTH;

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;

    setSearchTerm(searchTerm);

    if (isSearchTermValid(searchTerm)) {
      getUsersWithDebounce(searchTerm);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          onClick={() => getUsers(searchTerm)}
          disabled={isLoading || !isSearchTermValid(searchTerm)}
        />
      </Input.Root>
      <S.UserList>
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </S.UserList>
    </S.Container>
  );
}
