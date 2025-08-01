import React from "react";
import ContectUsForm from "../../ContectUsForm/ContectUsForm";

const ContactFormSection=()=>{
 return(
    <div className="mx-auto ">
       <h1> Get in Touch</h1>
       <p> We'd love to here for you , Please fill out this form</p>
       <div>
         <ContectUsForm/>
       </div>
    </div>
 )
}

export default ContactFormSection;