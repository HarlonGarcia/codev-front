import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from 'components/Sidebar';

export default function Dashboard() {
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
    return (
        <div className='pt-24 px-14 sm:px-24 md:pt-32 lg:px-32 3xl:px-80'>
            <Sidebar
                isVisible={isSidebarVisible}
                setIsVisible={setIsSidebarVisible}
            />
            <div className='mx-auto 4xl:max-w-screen-4xl'>
                <Outlet />
            </div>
        </div>
    );
}
