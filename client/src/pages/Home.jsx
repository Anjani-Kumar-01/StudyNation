import React from "react";
import { FaArrowRight } from "react-icons/fa";;
import { Link } from "react-router-dom";
import HighlightText from '../component/homepage';
import CTAbutton from '../component/button';
import Banner from "../assets/Images/banner.mp4"

const Home=()=>{
    return(
        <div className="bg-gray-900">
   {/* section 1 */}
   <div className="relative mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 text-white">
        {/* Become a Instructor Button */}
        <Link to={"/signup"}>
          <div className="group mx-auto mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold text-white drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-gray-800">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        {/* Sub Heading */}
        <div className="-mt-3 w-[90%] text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>
        <div className="flex flex-row gap-7 mt-8 text-white ">
   <CTAbutton active={true} linkto={"./signup"}>
     Learn more
       </CTAbutton>
    <CTAbutton active={false} linkto={"./login"} >
        Book a Demo
       </CTAbutton>
    </div>
    <div className= " mx-3 my-12  shadow-blue-200 ">
      <video 
      muted
      loop
      autoPlay
>
  <source  src={Banner}/>
        
      </video>
    </div>
    {/*Code section 1*/}
    <div>
   <codeBocks>
    
   </codeBocks>
    </div>
    </div>
   {/* section 2 */}
   {/* section 3 */}
   {/* section  */}

        </div>

    ); 
}
export default Home;