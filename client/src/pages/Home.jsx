import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HighlightText from "../component/homepage";
import CTAbutton from "../component/button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../component/CodeBlocks";
import Learninglanguagesection from "../component/learninglanguagesection";
import Timelinesection from "../component/Timelinesection";
import InstructorSection from "../component/InstructorSection";
import Footer from "../component/comman/Footer";
import ExploreMore from "../component/Exploremore";

const Home = () => {
  return (
    <div className="w-full bg-gray-900 text-white">
      {/* Section 1 */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-9">
        {/* Become an Instructor Button */}
        <Link to="/signup">
          <div className="group mt-16 w-fit rounded-full bg-richblack-800 p-1 font-bold drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none">
            <div className="flex items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-gray-800">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        {/* Heading */}
        <div className="text-center text-4xl font-semibold">
          Empower Your Future with <HighlightText text={"Coding Skills"} />
        </div>

        {/* Subheading */}
        <div className="-mt-3 w-full max-w-3xl text-center text-lg font-bold text-richblack-300">
          With our online coding courses, you can learn at your own pace, from anywhere in the world,
          and get access to a wealth of resources including hands-on projects, quizzes, and personalized feedback from instructors.
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-7 mt-8">
          <CTAbutton active={true} linkto="/signup">Learn more</CTAbutton>
          <CTAbutton active={false} linkto="/login">Book a Demo</CTAbutton>
        </div>

        {/* Video Banner */}
        <div className="w-full mt-12">
          <video
            className="w-full max-h-[500px] rounded-lg shadow-lg"
            muted
            loop
            autoPlay
          >
            <source src={Banner} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Code Section 1 */}
        <CodeBlocks
          position={"flex-row"}
          heading={
            <div className="text-4xl font-semibold">
              Unlock your <HighlightText text={"coding potential"} /> with our online courses
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
          codeblock={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav>\n  <a href="/one">One</a>\n  <a href="/two">Two</a>\n  <a href="/three">Three</a>\n</nav>\n</body>`}
          backgroundGradient={<div className="codeblock1 absolute" />}
        />

        {/* Code Section 2 */}
        <CodeBlocks
          position={"lg:flex-row-reverse"}
          heading={
            <div className="text-4xl font-semibold">
              Start <HighlightText text={"coding in seconds"} />
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
          codeblock={`import React from "react";\nimport CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\n  return (\n    <div>Home</div>\n  );\n};\n\nexport default Home;`}
          backgroundGradient={<div className="codeblock2 absolute" />}
        />

        <ExploreMore />
      </div>

      {/* Section 2 */}
      <div className="bg-white text-gray-700 mt-16">
        <div className="homepage_bg h-[310px] flex items-center justify-center">
          <div className="w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-5">
            <div className="flex gap-7">
              <CTAbutton active={true} linkto="/signup">
                <div className="flex items-center gap-3">Explore Full Catalog <FaArrowRight /></div>
              </CTAbutton>
              <CTAbutton active={false} linkto="/signup">
                <div className="flex items-center gap-3">Learn more <FaArrowRight /></div>
              </CTAbutton>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="text-4xl font-semibold lg:w-1/2">
              Get the skills you need for a <HighlightText text={"job that is in demand"} />
            </div>
            <div className="lg:w-1/2 flex flex-col gap-6">
              <p className="text-base font-medium">
                The modern StudyNation dictates its own terms. Today, to be a competitive specialist requires more than just professional skills.
              </p>
              <CTAbutton active={true} linkto="/signup">
                <div>Learn more</div>
              </CTAbutton>
            </div>
          </div>

          <Timelinesection />
          <Learninglanguagesection />
        </div>
      </div>

      {/* Section 3 */}
      <div className="w-full bg-gray-800 text-white py-10 px-4 sm:px-6 lg:px-8 mt-10 mb-20">
        <div className="max-w-[1440px] mx-auto">
          <InstructorSection />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
