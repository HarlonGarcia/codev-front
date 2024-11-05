import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from 'components/Sidebar';

export default function Dashboard() {
    const [isSiderbarVisible, setIsSidebarVisible] = useState(true);
  
    return (
        <div className='pt-24 md:pt-32 px-24'>
            <Sidebar
                visible={isSiderbarVisible}
                setVisible={setIsSidebarVisible}
            />
            <Outlet />
        </div>
    );
}
