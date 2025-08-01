import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";   
import CountryCode from "../data/countrycode.json"

const ContectUsForm =()=>{
    const [loading,setloading] = useState(false);
    const{
        register,
        handleSubmit,
        reset,
        formState :{errors,isSubmitSucessful}
    } = useForm();

    const submitContectForm = async(data) =>{
             try {
        setloading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      // console.log("Email Res - ", res)
      setloading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setloading(false)
    }
    }

         useEffect(()=>{
             if(isSubmitSucessful){
                reset({
                    email :"",
                    firstname:"",
                    lastname:"",
                    message:"",
                    phoneNo:"",
                })
             }
         },[reset,isSubmitSucessful])


   return(
  <form onSubmit={handleSubmit(submitContectForm)}>
    <div className="flex gap-5">
        {/* /*first name*/ }
        <div className="flex flex-col">
            <label htmlFor="firstname">First Name</label>
            <input
               type="text"
               name="firstname"
               id="firstname"
               placeholder="Enter first name"
                {...register("firstname",{required:true})}
               />
               {
                errors.firstname && (
                    <span>
                        Please enter your name
                    </span>
                )
               }
        </div>
        {/* /*last name*/ }
        <div className="flex flex-col">
            <label htmlFor="lastname">Last Name</label>
            <input
               type="text"
               name="lastname"
               id="lastname"
               placeholder="Enter last name"
                {...register("lastname")}
               />
            
        </div>
        {/* /*email*/ }
        <div className="flex flex-col">
            <label htmlFor="email">Email Address</label>
            <input
               type="email"
               name="email"
               id="email"
               placeholder="Enter your email"
                {...register("email",{required:true})}
               />
                   {
                errors.email && (
                    <span>
                        Please enter your email address 
                    </span>
                )
               }
            
        </div>
            {/* phoneNo */}
            <div className="flex flex-col gap-2">
                <label htmlFor="phonenumber">Phone Number</label>
                <div className="flex flex-row gap-5">
                    {/* dropdown */}
                    <div className="flex w-[25px] gap-5">
                        <select 
                           name="dropdown"
                           id="dropdown"
                           {...register("countryCode",{required:true})} 
                            >
                            {
                                   CountryCode.map((element,index)=>{
                                    return (
                                         <option key={index}>
                                            {element.code} - {element.country}
                                         </option>
                                    )
                                   })
                            }
                        </select>
                    </div>
                    <div className="flex w-[80%]"> 
                        <input
                            type="number"
                            name="phonenumber"
                            id="phonenumber"
                            placeholder="12345 67890"
                            className="text-black"
                            {...register("phoneNo.",
                            {
                                required:{value:true,message:"please enter phone Number"},
                                maxLength:{value:10,message:"invalid phone number"},
                                 minLength :{value:8,message:"invalid phone number"}})}
                            />
                                 {
                          errors.phoneNo && (
                    <span>
                        Please enter your phone number
                    </span>
                )
               }
                    </div>

                </div>
            </div>
        {/* message */}
        <div className="flex flex-col">
           <label>Message</label>
         <textarea
              name="message"
              id="message"
              cols={30}
              rows={7}
              placeholder="Enter your message"
              {...register('message',{required:true})}
          />
              {
                errors.message && (
                    <span>
                        Please enter your message
                    </span>
                )
               }
        </div>
      
    </div>
         <button type="submit" className="rounded-md bg-yellow-58 text-center px-6 text-[16px] font-bold text-black">
            Sent message
         </button>
  </form>
   )
}

export default ContectUsForm
