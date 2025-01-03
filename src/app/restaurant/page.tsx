"use client"
import { useGSAP } from "@gsap/react";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

function Page() {
   const ref = useRef(null);
   const router = useRouter();
   const [name, setName] = useState(""); 
   const [errorName, setErrorName] = useState("");
   const [email, setEmail] = useState("");
   const [errorEmail, setErrorEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [errorPhone, setErrorPhone] = useState("");
   const [date, setDate] = useState("");
   const [errorDate, setErrorDate] = useState("");
   const [time, setTime] = useState("");
   const [errorTime, setErrorTime] = useState("");
   const [noOfPeople, setNoOfPeople] = useState("");
   const [errorNoOfPeople, setErrorNoOfPeople] = useState("");
   const [message, setMessage] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const nameRegex = /^[a-zA-Z\s]+$/;
   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
   const phoneRegex = /^[6789]{1}[0-9]{9}$/;

   useEffect(() => {
      gsap.to(ref.current, {
         scale: 1,
         x: 0,
         duration: 1,
         ease: "power3.out",
      });
   }, []);

   async function validateAndSend(event:any) {
      event.preventDefault();
      let isValid = true;

      if (name.trim() === "" || !nameRegex.test(name)) {
          setErrorName("Please enter a valid name.");
          isValid = false;
      } else {
          setErrorName("");
      }

      if (email.trim() === "" || !emailRegex.test(email)) {
          setErrorEmail("Please enter a valid email.");
          isValid = false;
      } else {
          setErrorEmail("");
      }

      if (phone.trim() === "" || !phoneRegex.test(phone)) {
          setErrorPhone("Please enter a valid phone number.");
          isValid = false;
      } else {
          setErrorPhone("");
      }

      if (date.trim() === "") {
          setErrorDate("Please enter a date.");
          isValid = false;
      } else {
          setErrorDate("");
      }

      if (time.trim() === "") {
          setErrorTime("Please enter a time.");
          isValid = false;
      } else {
          setErrorTime("");
      }

      if (noOfPeople.trim() === "" || parseInt(noOfPeople) <= 0) {
          setErrorNoOfPeople("Please enter a valid number of people.");
          isValid = false;
      } else {
          setErrorNoOfPeople("");
      }

      if (message.trim() === "") {
          setErrorMessage("Please enter a message.");
          isValid = false;
      } else {
          setErrorMessage("");
      }

      if (isValid) {
        try{
        const data={"name":name,"email":email,"phone":phone,"date":date,"time":time,"noOfPeople":noOfPeople,"message":message};
        const response=await axios.post("/api/Resturent",data);
        router.push("/cart");
        if(response.status>199 && response.status<300){
            toast.success("Book Successfully !  . Status will be updated through email and you can track on order history page . Thank you for booking with us .");
        }
        console.log(response);        
    }catch(e){
        console.log(e);
        }

      }
   }

   return (<>
   
   <div className='w-full overflow-x-hidden min-h-screen' style={{ backgroundImage: "url('https://media.ouest-france.fr/v1/pictures/2bb85adbe40d6722b19d55f599d7df56-144654.jpg?width=1400&client_id=eds&sign=9fea0896b3b4f8a398415aa43263bd9b7cbfa176f0eeda7a07859ac9f7265af6')", backgroundSize: "cover", backgroundPosition: "center" }}>
         <div className='flex justify-center items-center text-white text-5xl'>
            <form ref={ref} className="relative border-2 border-white w-full max-w-3xl p-8 flex flex-col mx-4 md:mx-0" onSubmit={validateAndSend} style={{ margin: "20rem 0rem", background: "#7c6b6b6b", backdropFilter: "blur(10px)" }}>
               <h1 className='p-2 font-bold text-center'>Restaurant Seat Booking</h1>
               <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-2 text-xl'>
                  <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" placeholder='Your Name' onChange={(e) => setName(e.target.value)} className='bg-transparent border-2 p-2 w-full'/>
                    {errorName && <span className="text-red-500">{errorName}</span>}
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder='Your Email' onChange={(e) => setEmail(e.target.value)} className='bg-transparent border-2 p-2 w-full'/>
                    {errorEmail && <span className="text-red-500">{errorEmail}</span>}
                  </div>

                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" name="phone" placeholder='Your Phone' onChange={(e) => setPhone(e.target.value)} className='bg-transparent border-2 p-2 w-full'/>
                    {errorPhone && <span className="text-red-500">{errorPhone}</span>}
                  </div>

                  <div>
                    <label htmlFor="date">Date</label>
                    <input type="date" name="date" placeholder='Date' onChange={(e) => setDate(e.target.value)} className='bg-transparent border-2 p-2 w-full'/>
                    {errorDate && <span className="text-red-500">{errorDate}</span>}
                  </div>

                  <div>
                    <label htmlFor="time">Time</label>
                    <input type="time" name="time" placeholder='Time' onChange={(e) => setTime(e.target.value)} className='bg-transparent border-2 p-2 w-full'/>
                    {errorTime && <span className="text-red-500">{errorTime}</span>}
                  </div>

                  <div>
                    <label htmlFor="noOfPeople">Number of People</label>
                    <input type="text" name="noOfPeople" placeholder='Number of People' onChange={(e) => setNoOfPeople(e.target.value)} className='bg-transparent border-2 p-2 w-full'/>
                    {errorNoOfPeople && <span className="text-red-500">{errorNoOfPeople}</span>}
                  </div>
               </div>

               <div className="mt-4">
                 <label htmlFor="message" className='text-xl'>Message</label>
                 <textarea name="message" placeholder='Message' onChange={(e) => setMessage(e.target.value)} className='bg-transparent border-2 p-2 w-full h-24 text-lg'></textarea>
                 {errorMessage && <span className="text-red-500">{errorMessage}</span>}
               </div>

               <button type="submit" className='mt-6 rounded-sm p-3 text-xl w-full bg-red-500 hover:bg-red-600 transition-all'>Send Message</button>
            </form>
         </div>
      </div>
            <ToastContainer />
   </>
      
   );
}

export default Page;
