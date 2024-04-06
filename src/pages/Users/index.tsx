import { ElementType, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSearch } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

import { debounce } from 'lodash';

import { Input } from '../../components/Input';
import UserCard from '../../components/UserCard';
import { AppDispatch } from '../../store';
import { getUsers } from '../../store/features/userSlice';
import { useSelector } from '../../store/useSelector';
import { MIN_SEARCH_LENGTH } from '../../utils/constants';
import * as S from './styles';

export default function Users() {
  const { t } = useTranslation('translation', { keyPrefix: 'pages.users' });
  const [ searchTerm, setSearchTerm ] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, users } = useSelector((state) => state.users);

  const getAllUsers = useCallback((searchTerm = '') => {
    const filters = {
      startsWith: searchTerm,
    };

    dispatch(getUsers(filters));
  }, [dispatch]);

  const getUsersWithDebounce = useMemo(
    () => debounce(getAllUsers, 500),
    [getAllUsers]
  );

  const isSearchTermValid = (searchTerm: string) =>
    searchTerm.length === 0 || searchTerm.length > MIN_SEARCH_LENGTH;

  const handleSearch = (event: React.FormEvent<HTMLInputElement>) => {
    const searchTerm = event.currentTarget.value;

    setSearchTerm(searchTerm);

    if (isSearchTermValid(searchTerm)) {
      getUsersWithDebounce(searchTerm);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <S.Container>
      <Input.Root>
        <Input.Content
          placeholder={t('search.placeholder')}
          value={searchTerm}
          onChange={handleSearch}
          disabled={isLoading}
        />
        <Input.Action
          icon={(FaSearch as ElementType)}
          onClick={() => getAllUsers(searchTerm)}
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
