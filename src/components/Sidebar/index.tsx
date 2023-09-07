import { Link } from 'react-router-dom';
import { IoClose } from 'react-icons/io5';
import { FaUsers, FaCodeBranch } from 'react-icons/fa';

import * as S from './styles';
import { useCustomSelector } from '../../store/useCustomSelector';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { closeSidebar } from '../../store/features/sidebarSlice';

export default function Sidebar() {
  const { isOpened } = useCustomSelector((state) => state.sidebar);
  const dispatch = useDispatch<AppDispatch>();

  const variant = isOpened ? 'OPENED' : 'CLOSED';

  const closeAdminSidebar = () => dispatch(closeSidebar());
  
  return (
    <S.Container view={variant}>
      <S.Header>
        <span>Bem vindo Harlon</span>
        <button onClick={closeAdminSidebar}>
          <IoClose />
        </button>
      </S.Header>
      <div className='separator' />
      <S.Content>
        <Link to='/dashboard' onClick={closeAdminSidebar}>
          <FaUsers />  
          <small>Users</small>
        </Link>
        <Link to='/dashboard/challenges' onClick={closeAdminSidebar}>
          <FaCodeBranch />  
          <small>Challenges</small>
        </Link>
      </S.Content>
    </S.Container>
  );
}
