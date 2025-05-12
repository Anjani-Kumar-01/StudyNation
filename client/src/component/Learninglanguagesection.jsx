import React from "react";
import HighlightText from './homepage';
import know_your_progress from "../assets/Images/Know_your_progress.png";
import compare_with_others from '../assets/Images/Compare_with_others.svg'
import Plan_your_lessons from '../assets/Images/Plan_your_lessons.png';
import CTAButton from "../component/button";
const Learninglanguagesection=()=>{
    return(
        <div className="mt-[150px]">
            <div className="flex flex-col gap-5">
                <div className="text-4xl font-semibold text-center">
                    Your Swiss knife for 
                    <HighlightText text={"learning any language"}/>
                </div>
                <div  className="text-center text-gray-600 mx-auto text-base mt-3 w-[70%]">
                   Using spin making learning multiple language easy .
                    with 20+ language realistic voice-over, progress tracking , custom schedule and more
                </div>
                <div className="flex flex-row items-center mt-5">
                    <img src={know_your_progress} className="object-contain mr- -32"/>
                    <img src={compare_with_others}className="object-contain"/>
                    <img src={Plan_your_lessons} className="object-contain"/>

                </div>
                <div className="w-fit items-center mx-auto mt-10">
                    <CTAButton active={true} linkto={"/signup"}>
                    <div>
                        Learn more
                    </div>
                    </CTAButton>
                </div>

            </div>
        </div>
    )
}
export default Learninglanguagesection;