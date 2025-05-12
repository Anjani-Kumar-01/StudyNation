import React from "react";
import Instructor from "../assets/Images/instructor.png";
import HighlightText from "./homepage";
import CTAButton from "./button";
import { FaArrowRight } from "react-icons/fa"
 
const InstructorSection = () => {
  return (
    <div>
        <div className="flex flex-row gap-20 items-center ">
            <div className="w-[50%] ">
               <img src={Instructor} className=" shadow-amber-50"/>
            </div>
            <div className="w-[50%] flex flex-col gap-10">
                <div className="text-4xl font-semibold">
                    Become an    
                       <HighlightText text={"  instructor"}/>
                </div>
                <p className="font-medium text-[16px] w-[80%] text-gray-700">
                    instructor are the backbone of Studynation. They are the ones who make the platform what it is.

                </p>
<div className="w-fit items-center">
<CTAButton active={true} linkto={"/signup"}>
<div className="flex flex-row items-center gap-2">
Start Learning Today
<FaArrowRight className="ml-2"/>
</div>

</CTAButton>
</div>


            </div>

        </div>
    </div>
  )


}
export default InstructorSection;