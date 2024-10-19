import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from 'components/Sidebar';

import * as S from './styles';

export default function Dashboard() {
  const [isSiderbarVisible, setIsSidebarVisible] = useState(true);
  
  return (
    <S.Container>
      <Sidebar
        visible={isSiderbarVisible}
        setVisible={setIsSidebarVisible}
      />
      <Outlet />
    </S.Container>
  );
}
