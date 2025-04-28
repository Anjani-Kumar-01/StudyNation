import React from "react";
import { Children } from "react";
import { Link } from "react-router-dom";

const button = ({Children,active,linkto})=>{
    return(
        <Link to={linkto}>
        
        <div className={`text-center text-[13px] text-white px-6 py-3 rounded-md font-bold bg-gray-700 ${active ? "bg-yellow-500 text-black ":"bg-gray-800"}
        hover:scale-95 transition-all duration-200
        `}> 

         {Children}
</div>
        
         </Link>
   
    )
}

export default button;