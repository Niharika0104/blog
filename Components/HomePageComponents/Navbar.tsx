"use client"
import { BiSearch, BiEdit, BiUser } from "react-icons/bi";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const router=useRouter();
  return (
    <div className="bg-white w-full  sm:w-[95%] mx-auto flex items-center h-20 justify-between px-4">
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex">
          <span className="text-[2rem] font-sans font-extrabold text-indigo-800">Word</span>
          <span className="text-[2rem] font-sans font-extrabold text-yellow-400">Wave</span>
        </div>
        <div className="hidden sm:flex sm:relative h-12  items-center bg-green-400 rounded-full">
          <input className="bg-[#f9f9f9] rounded-full pl-10 pr-4 py-2 h-full w-[100%] border-none focus-within:outline-none" placeholder="Search" />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <BiSearch fontSize={25} />
          </span>
        </div>
      </div>
      <div className="flex gap-6 items-center text-xl">
        <div className="block sm:hidden">   <BiSearch fontSize={20} /></div>
        <span className="flex items-center gap-1 cursor-pointer" onClick={()=>{router.push("/edit")}}>
          <BiEdit />
          <span>Editor</span>
        </span>
        <span className="cursor-pointer">
          <BiUser />
        </span>
      </div>
    </div>
  );
}
