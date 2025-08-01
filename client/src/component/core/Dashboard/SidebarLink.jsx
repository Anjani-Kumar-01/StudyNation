import react from 'react';
import * as Icon from 'react-icons/vsc';

const  SidebarLink = ({link,IconName}) =>{
    const Icon = Icon[IconName]; 
     const location = useLocation();
     const dispatch = useDispatch();

     const matchRoute = (route) => {
        return matchRoute({path:route},location.pathname);}
    return(
      <NavLink
        to={link.path}
        // onClick={()}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700 ${matchRoute(link.path) ? 'bg-gray-700' : ''}`}
 >

      <span className={`absolute left-0 w-1 h-full bg-yellow-500 ${matchRoute(link.path)?"opacity-100" : "opacity-0"}`}></span>

       <div className='flex items-center gap-x-2'>
        <Icon className="text-lg" />
        <span className="hidden md:inline">{link.name}</span>
       </div>
      </NavLink>
    )
}

export default SidebarLink;