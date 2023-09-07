import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { MdEdit, MdRemoveRedEye } from 'react-icons/md';

import * as S from './styles';
import { getAllUsers } from '../../../../store/features/userSlice';
import { AppDispatch } from '../../../../store';
import { User } from '../../../../types/User';
import UserModal from '../../../../components/UserModal';
import { openUserModal } from '../../../../store/features/userModalSlice';

const fakeUsers: User[] = [{
  id: '0',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  githubUrl: 'https://github.com/johndoe',
  additionalUrl: 'https://johndoe.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
}, {
  id: '1',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  githubUrl: 'https://github.com/johndoe',
  additionalUrl: 'https://johndoe.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '2',
  name: 'Jane Smith',
  email: 'janesmith@gmail.com',
  githubUrl: 'https://github.com/janesmith',
  additionalUrl: 'https://janesmith.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '3',
  name: 'Alice Johnson',
  email: 'alicejohnson@gmail.com',
  githubUrl: 'https://github.com/alicejohnson',
  additionalUrl: 'https://alicejohnson.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '4',
  name: 'Bob Brown',
  email: 'bobbrown@gmail.com',
  githubUrl: 'https://github.com/bobbrown',
  additionalUrl: 'https://bobbrown.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '5',
  name: 'Ella Davis',
  email: 'elladavis@gmail.com',
  githubUrl: 'https://github.com/elladavis',
  additionalUrl: 'https://elladavis.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '6',
  name: 'Mike Wilson',
  email: 'mikewilson@gmail.com',
  githubUrl: 'https://github.com/mikewilson',
  additionalUrl: 'https://mikewilson.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '7',
  name: 'Sarah Lee',
  email: 'sarahlee@gmail.com',
  githubUrl: 'https://github.com/sarahlee',
  additionalUrl: 'https://sarahlee.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '8',
  name: 'David Clark',
  email: 'davidclark@gmail.com',
  githubUrl: 'https://github.com/davidclark',
  additionalUrl: 'https://davidclark.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '9',
  name: 'Emily White',
  email: 'emilywhite@gmail.com',
  githubUrl: 'https://github.com/emilywhite',
  additionalUrl: 'https://emilywhite.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '10',
  name: 'James Turner',
  email: 'jamesturner@gmail.com',
  githubUrl: 'https://github.com/jamesturner',
  additionalUrl: 'https://jamesturner.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '11',
  name: 'Olivia Harris',
  email: 'oliviaharris@gmail.com',
  githubUrl: 'https://github.com/oliviaharris',
  additionalUrl: 'https://oliviaharris.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '12',
  name: 'William Martin',
  email: 'williammartin@gmail.com',
  githubUrl: 'https://github.com/williammartin',
  additionalUrl: 'https://williammartin.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '13',
  name: 'Sophia Turner',
  email: 'sophiaturner@gmail.com',
  githubUrl: 'https://github.com/sophiaturner',
  additionalUrl: 'https://sophiaturner.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '14',
  name: 'Liam Walker',
  email: 'liamwalker@gmail.com',
  githubUrl: 'https://github.com/liamwalker',
  additionalUrl: 'https://liamwalker.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '15',
  name: 'Ava Green',
  email: 'avagreen@gmail.com',
  githubUrl: 'https://github.com/avagreen',
  additionalUrl: 'https://avagreen.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '16',
  name: 'Noah Brown',
  email: 'noahbrown@gmail.com',
  githubUrl: 'https://github.com/noahbrown',
  additionalUrl: 'https://noahbrown.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '17',
  name: 'Mia Johnson',
  email: 'miajohnson@gmail.com',
  githubUrl: 'https://github.com/miajohnson',
  additionalUrl: 'https://miajohnson.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '18',
  name: 'Ethan Smith',
  email: 'ethansmith@gmail.com',
  githubUrl: 'https://github.com/ethansmith',
  additionalUrl: 'https://ethansmith.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '19',
  name: 'Charlotte Davis',
  email: 'charlottedavis@gmail.com',
  githubUrl: 'https://github.com/charlottedavis',
  additionalUrl: 'https://charlottedavis.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id: '20',
  name: 'Alexander Wilson',
  email: 'alexanderwilson@gmail.com',
  githubUrl: 'https://github.com/alexanderwilson',
  additionalUrl: 'https://alexanderwilson.com/home',
  createdAt: new Date(),
  updatedAt: new Date(),
}];

interface Action {
  type: 'edit' | 'delete' | 'view';
  icon: JSX.Element;
}

const actions: Action[] = [{
  type: 'view',
  icon: <MdRemoveRedEye />,
}, {
  type: 'edit',
  icon: <MdEdit />,
}, {
  type: 'delete',
  icon: <FaTrash />,
}];

export default function Users() {
  const [ selectedUser, setSelectedUser ] = useState('');
  // const { users } = useCustomSelector((state) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const getUsers = useCallback(() => {
    dispatch(getAllUsers());
  }, []);

  const handleUserAction = (id: string, action: Action['type']) => {
    console.log(id, action);

    if (action === 'edit') {
      // dispatch(editUser(id));
      return;
    }

    setSelectedUser(id);
    dispatch(openUserModal());
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <S.Container>
      <h2>Users</h2>
      <S.UsersList>
        {fakeUsers.map((user) => (
          <S.UserRow key={user.id}>
            <S.UserContent>
              <small>
                {user.id}
              </small>
              <strong>
                {user.name}
              </strong>
            </S.UserContent>
            <S.Actions>
              {actions.map(({ type, icon }) => (
                <S.Action
                  key={type}
                  action={type}
                  onClick={() => handleUserAction(user.id, type)}
                >
                  {icon}
                </S.Action>
              ))}
            </S.Actions>
          </S.UserRow>
        ))}
      </S.UsersList>
      <UserModal user={selectedUser} />
    </S.Container>
  );
}
