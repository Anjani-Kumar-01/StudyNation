import React from "react";
import logo1 from "../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../assets/TimeLineLogo/Logo4.svg";
const timeline =[
    {
        logo :logo1,
        heading:"Leadership",
        Description:"Fully commited to the success comapany"
    },
    {
        logo :logo2,
        heading:"Responsibility",
        Description:"Fully commited to the success comapany"
    },
    {
        logo :logo3,
        heading:"Leadership",
        Description:"Fully commited to the success comapany"
    },
    {
        logo :logo4,
        heading:"Leadership",
        Description:"Fully commited to the success comapany"
    },
   

]
const Timelinesection=()=>{
    return(
        <div>
            <div className="flex flex-row gap-15 items-center ">
                <div className="w-[45%] flex flex-col gap-5">
                   {
                    timeline.map((element,index) =>{
                        return(
                             <div className="flex flex-row gap-6" key={index}>
                                <div className="w-[50px] h-[50px] bg-white flex flex-center">
                                    <img src={element.logo}/>
                                    </div>
                                    <div>
                                        <h2 className="font-semibold text-[18px]">{element.heading}</h2>
                                        <p className="text-base">{element.Description}</p>
                                        </div>
                                </div>
                        )
                    })
                   }

                </div>

            </div>
        </div>
    )
}
export default Timelinesection;