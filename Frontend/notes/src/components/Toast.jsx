import React, { useEffect } from "react";
import { LuCheck } from "react-icons/lu";
import { MdDeleteOutline } from "react-icons/md";

const Toast = ({ isShown, message, type, onClose }) => {
    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
             onClose()
        },3000)
        return ()=>{
            clearTimeout(timeOutId)
        }
    },[onClose])
  return (
    <div className={`absolute top-20 right-6 translate-all duration-300 ${
    isShown ?"opacity-100":"opacity-0"}`}>
        <div className={`min-w-52 bg-white border shadow-2xl rounded-md after:w-[5px] after:h-full ${
            type==="delete" ? "after:bg-red-500":"after:bg-green-500"}after:absolute 
            after:left-0 after:top-0 after:rounded-lg`}>
      <div className="flex items-center gap-3 py-2 px-4">
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-full${
            type === "delete" ? "bg-red-50" : "bg-green-50"
          } `}
        >
         {type==="delete" ? <MdDeleteOutline className="tex-xl text-red-500"/> :<LuCheck className="text-xl text-teal-500" />} 
          <p className="text-sm text-slate-800">{message}</p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Toast;
