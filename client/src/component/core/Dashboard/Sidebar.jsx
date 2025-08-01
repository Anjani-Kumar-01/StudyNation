import React from "react";
import {sidebarLinks} from '../../data/dashboard-links';
import {logout} from '../../../services/operations/authAPI'
import {useDispatch, useSelector} from 'react-redux';
import {NavLink, useLocation} from 'react-router-dom';
import {matchRoute} from '../../../utils/matchRoute';
import SidebarLink from './SidebarLink';

const Sidebar =()=>{
    const {user , loading :profileLoading} = useSelector((state) => state.profile);
    const { loading :authLoading} = useSelector((state) => state.auth);

    
    if(profileLoading || authLoading){
        return(
            <div className="mt-12">
                Loading......
            </div>
        )
    }


    return(
        <div className="flex min-w-[222px] flex-col border-r-[1px] border-r-gray-700 h-[calc(100vh-3.5rem)] bg- gray-800 py-10">
            <div>
                {
                    sidebarLinks.map((link,index)=>{
                        if(link.type && user?.accountType !== link.type)   return null;
                             return (
                                <SidebarLink key= {link.id} link= {link} iconName = {link.icon}/>
                             )
                          
                    }) }
            </div>
            <div className="mx-auto mt-6 h-[1px] w-10/12 bg-gray-600"></div>
            <div className="flex flex-col">
              <SidebarLink
                 link={{name: "setting", path: "dashboard/settings"}}
                    iconName="VscSettingsGear"
                    />
            </div>

        </div>
    )

}

export default Sidebar;
