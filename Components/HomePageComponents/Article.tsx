"use client"

import { useEffect } from "react"
import Image from "next/image"
import { PiHandsClapping } from "react-icons/pi";
import { BiBookmarkAlt, BiChat, BiShare } from "react-icons/bi";
import staffimage1 from "@/public/Images/staffimage1.png";
import parse from 'html-react-parser';
import { CgMoreAlt } from "react-icons/cg";
import { PostInfo } from "@/app/Types/types";

const handlefollow=()=>{

}
export default function Article(props:PostInfo){
useEffect(()=>{

},[])
return (
    <div className="w-[70%] mx-auto mt-10">
        <h1 className="text-black font-bold text-center">title</h1>
        {/* second sectoin */}
        <div className="flex items-center">
         
          <Image src={staffimage1} alt={"staff icons"} className='h-6 w-6 rounded-full'/>
        
          <div>
            <div className="flex flex-col gap-3">
                <p>{props.author.name}</p>
                <p>{props.createdAt}</p>

            </div>
          </div>

          <div className="cursor-pointer text-indigo-500 font-medium" onClick={handlefollow}>Follow</div>


        </div>
        {/* third section */}
        <div className="mt-8 border-t-2 border-b-2 border-gray-50 flex justify-between ">
            <div className="flex gap-2">
               <div><PiHandsClapping/> {props.likes.length}</div> 
               <div><BiChat/> {props.comments.length}</div> 

            </div>
            <div className="flex gap-2">
               <div><BiBookmarkAlt/> </div> 
               <div><BiShare/> </div> 
               <div><CgMoreAlt/> </div> 


            </div>
        </div>
        {/* content */}
        <div>
            {parse(props.content)}
        </div>
    </div>
)
}