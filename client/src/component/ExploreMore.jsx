import React from "react";
import {HomePageExplore} from "./data/homepage-explore"
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

    </div>
  );
}

export default ExploreMore;