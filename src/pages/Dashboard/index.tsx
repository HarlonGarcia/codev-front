import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from 'components/Sidebar';

export default function Dashboard() {
    const [isSiderbarVisible, setIsSidebarVisible] = useState(true);
  
    return (
        <div className='pt-24 px-14 sm:px-24 md:pt-32'>
            <Sidebar
                visible={isSiderbarVisible}
                setVisible={setIsSidebarVisible}
            />
            <div className='mx-auto 4xl:max-w-screen-4xl'>
                <Outlet />
            </div>
        </div>
    );
}
