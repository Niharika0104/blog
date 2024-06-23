"use client"
import { useState, useEffect } from 'react';
import Image from "next/image";
import staffimage1 from "@/public/Images/staffimage1.png";
import { PiHandsClappingFill } from "react-icons/pi";
import { LiaCommentSolid } from "react-icons/lia";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import parse from 'html-react-parser';
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/Context/AuthContext";
import Shimmer from './Shimmer';
import { PostInfo } from '@/app/Types/types';


export default function Article(){
    const router=useRouter();
    const auth=useAuth();
    const [user,setuser]=useState(auth?.user)
    const [loading,setloading]=useState(false)
    console.log(auth.user)
    const name=auth?.user?.name;
    const arr:PostInfo[]=[]
    const [data,setdata]=useState(arr);
    useEffect(()=>{
        const fetchdata=async()=>{
            setloading(true);
          const res=  await axios.post("/api/post/getposts",{
                userId:auth?.user?.userId
            })
            setloading(false);
            setdata(res.data.data)
           
        }
       
        fetchdata()
    },[auth])

    return (
        <div className="flex flex-col gap-5 mx-6">
            {!loading?data.map((item)=>{
                   return (
                    <div className="flex justify-between items-center cursor-pointer" key={item?.id} onClick={()=>{router.push(`/${item.id}`)}}>
                    <div className="flex flex-col gap-4  w-full">
                      <div className="flex gap-2 items-center">
                      <Image src={staffimage1} alt={"staff icons"} className='h-6 w-6 rounded-full'/>
                        <p>{user?.name}</p>   
                        </div>  
                        <div>
                           {parse(item.title)}
                        </div>
                        <div className="flex w-full   justify-between px-10">
                            <div className="flex gap-3 items-center">
                           <div className="text-[14px]">{item.createdAt.split('T')[0]}</div>
                           <div><PiHandsClappingFill fontSize={22}/></div>
                            <div><LiaCommentSolid fontSize={22}/></div>
                            </div>
                            <div className="flex gap-3 items-center">
                            <div><MdOutlineBookmarkAdd fontSize={22}/></div>
                            <div><FiMoreHorizontal fontSize={22}/></div>
                            </div>
                           
                        </div>
                    </div>
                    <Image src={staffimage1} alt="staff image" className="h-40 w-auto"/>
                    </div>
                   )
            }):<Shimmer/>}
          
       
        </div>
    )
}