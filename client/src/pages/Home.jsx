import React from "react";
import { FaArrowRight } from "react-icons/fa";;
import { Link } from "react-router-dom";
import HighlightText from '../component/homepage';
import CTAbutton from '../component/button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from "../component/CodeBlocks";
import Learninglanguagesection from "../component/learninglanguagesection";
import Timelinesection from "../component/Timelinesection";
import InstructorSection from "../component/InstructorSection";


const Home=()=>{
    return(
        <div className="bg-gray-900">
   {/* section 1 */}
   <div className="h-fit mx-auto flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-9 text-white">
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
  
  <CodeBlocks
   position={"flex-row"}
   heading={
    <div className="text-4xl font-semibold">
       unlock your 
       <HighlightText text={"coding potential"}/>
       with our online courses
      </div>
   }
  
    subheading={
      "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
    }
    ctabtn1={{
      btnText: "Try it Yourself",
      link: "/signup",
      active: true,
    }}
    ctabtn2={{
      btnText: "Learn More",
      link: "/signup",
      active: false,
    }}
    codeColor={"text-yellow-400"}
    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
    backgroundGradient={<div className="codeblock1 absolute"></div>}
  />
  
  
    </div>
    <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[100%] text-4xl font-semibold lg:w-[50%] align-text-center">
                Start
                <HighlightText text={"   coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              link: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              link: "/signup",
              active: false,
            }}
            codeColor={"text-yellow-100"}
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        
    </div>
   {/* section 2 */}
      <div className="bg-white text-gray-500">
        <div className="homepage_bg h-[310px]">
          <div className="w-11/12 max-w-maxContent flex  flex-col items-center justify-between gap-5 mx-auto">
          <div className="h-[150px]">

          </div>
          <div className="flex flex-row gap-7 text-white">
            <CTAbutton active={true} linkto={"/signup"}>
            <div className="flex items-center gap-3">
                   Explore Full Catalog
                   <FaArrowRight/>
            </div>
           

            </CTAbutton>
            <CTAbutton active={false} linkto={"/signup"}>
            <div className="flex items-center gap-3">
                   Learn more
                   <FaArrowRight/>
            </div>


            </CTAbutton>

          </div>


        </div>

      </div>
      <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5">
      <div className="flex flex-row gap-5 mb-10">
        <div className="text-4xl font-semibold w-[45%]">
          Get the skills you need for a 
          <HighlightText text={"job tht is in demand"}/>
        </div>
        <div className="flex flex-col gap-10 w-[40%] items-start">
          <div className="text-[16px] text-bold">
            The modern Studynation is the dictates ita own terms. Today,to be a compatitive 
            spacialist requires more than professional skills
         </div>
         <CTAbutton active={true} linkto={"/signup"}>
          <div>
            Learn more
          </div>
         </CTAbutton>

        </div>

      </div>

      
      </div>
      <Timelinesection/>
    <Learninglanguagesection/>


      </div>
   
   {/* section 3 */}
   <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto mt-10 mb-20 bg-gray-800 text-white py-10 px-5 rounded-lg">
   <InstructorSection/>

   </div>
   {/* section  */}

        </div>
        

    ); 
}
export default Home;