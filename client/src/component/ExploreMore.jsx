import React from "react";
import {HomePageExplore} from "./data/homepage-explore";
import HighlightText from "./homepage";
// import CourseCard from "./CourseCard";
const tabNames = [
 "Free",
 "New to Coding",
 "Most Popular",
 "Skill paths",

];

const ExploreMore = () => {
    const [currentTab, setCurrentTab] = React.useState(tabNames[0]);
    const [courses, setCourses] = React.useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard]=React.useState(HomePageExplore[0].courses[0].heading);

    const  setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);

    }
  return (
    <div >
<div className="text-4xl font-semibold text-center">
  unlock the 
  <HighlightText text={"  power of Code"}/>
</div>
<p className="text-center text-lg font-semibold text-gray-500 mt-3">
  Learn to build anything you imagine
</p>
<div className="flex flex-row gap-2  rounded-full bg-gray-800 justify-center mt-5 mb-5 border-gray-100">
  {
    tabNames.map((element, index) => {
      return(
        <div
        className={`text-16px flex flex-row items-center gap-2
          ${currentTab === element ? "text-gray-500  bg-gray-900 font-medium" 
            : "text-gray-500"} rounded-full transition-all  duration-200 cursor-pointer hover:bg-gray-900 hover:text-gray-500 px-7 py-2`}
            key={index}
            onClick={() => {
              setMyCards(element);
            }}
        >
         {element}
        </div>
      )
})
}
</div>
<div className=" lg:h-[150px]"> 
  <div className="absolute flex flex-row gap-10 justify-between w-full ">
    {
      courses.map((element,index)=>{
        return(
        <CourseCard
        key={index}
        cardData={element}
        currentCard={currentCard}
        setCurrentCard={setCurrentCard} 
        /> 
        )
      })
    }
  </div>

</div>
    </div>
  );
}

export default ExploreMore;