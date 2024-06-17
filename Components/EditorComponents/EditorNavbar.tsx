"use client"
import { BiSearch, BiEdit, BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
interface Editor {
  title: string;
  content: string;
  publish: () => void;
}
export default function Navbar(props:Editor) {
  const router=useRouter();
  return (
    <div className="bg-white w-[95%] mx-auto flex items-center h-20 justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="flex">
          <span className="text-[2rem] font-sans font-extrabold text-indigo-800">Word</span>
          <span className="text-[2rem] font-sans font-extrabold text-yellow-400">Wave</span>
        </div>
        
      </div>
      <div className="flex gap-6 items-center text-xl">
        <button className="rounded-full bg-indigo-600 hover:bg-opacity-60 py-2 px-6 text-white font-bold"
        onClick={()=>{props.publish()}}>Publish</button>
        <span className="cursor-pointer">
          <BiUser />
        </span>
      </div>
    </div>
  );
}
