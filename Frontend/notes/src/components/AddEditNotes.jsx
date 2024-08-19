import { useState } from "react";
import React from "react";
import { MdAdd, MdClose } from "react-icons/md";
import axios from "axios"

const AddEditNotes = ({noteData,type,onClose,getAllNotes,showToastMessage}) => {
  const [title, setTitle] = useState(noteData?.title||"");
  const [input, setInput] = useState("");
  const [content, setContent] = useState(noteData?.content||"");

  const [tag, setTag] = useState(noteData?.tag||[]);
  const [error,setError] = useState(null)
  const token = localStorage.getItem("token")
   const addNewNote = async()=>{
      try{
       
        const res = await axios.post("http://localhost:3000/note/add-note",{
            title,
            content,
            tag:tag
        },{headers:{"Authorization":token}})
        if(res.data){
            showToastMessage("Notes added")
            getAllNotes()
            onClose()
        }
      }catch(e){
        console.log(e)
        
      }
   }
   const editNote = async()=>{
    const noteId = noteData._id
    console.log(noteId)
    try{
        console.log("try")
        const res = await axios.put(`http://localhost:3000/note/edit-note/${noteId}`,{
            title:title,
            content:content,
            tag:tag
        },{headers:{"Authorization":token}})
        console.log("res",res)
        if(res.data){
            showToastMessage("Notes Updated")
            getAllNotes()
            onClose()
        }
      }catch(e){
        console.log(e)
        
      }
   }
  const handleAddNote = ()=>{
       if(!title || !content){
        setError("set title and content")
        return;
       }
       setError("")
       if(type === "edit"){
       editNote()
       }else{
        addNewNote()
       }
  }
  const handleInput = (e) => {
    setInput(e.target.value);
  };
  const addNewTag = () => {
    if (input.trim() !== "") {
      setTag((prevState) => [...prevState, input.trim()]);
      setInput("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagToRemove) => {
    setTag(tag.filter((t) => t !== tagToRemove));
  };
  
  return (
    <div className="">
        <div className="flex justify-end"> 
        <button className="w-10 h-10 rounded-full flex items-center justify-center" onClick={onClose}>
            <MdClose className="text-2xl text-red-600" />
         </button>
        </div>
         
      <div className="flex flex-col gap-2">
        <label className="text-xs bg-slate-400">title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline"
          placeholder="title "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs bg-slate-400">content</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 rounded"
          placeholder="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
        ></textarea>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="text-xs bg-slate-400">tags</label>
        <div className="flex flex-row gap-2 mb-4">{tag.map((t,index)=><div key={index} className="text-slate-950 px-3 py-1 text-sm rounded bg-gray-300">#{t}<button
       onClick={()=>handleRemoveTag(t)}><MdClose/></button></div>)}</div>
        
      </div>
      <div className="flex gap-2 items-center">
      <input
          value={input}
          onKeyDown={handleKeyDown}
          onChange={handleInput}
          type="text"
          placeholder="add tags"
          className="text-sm border px-3 py-2 rounded outline-none"
        />
        <button
          onClick={() => addNewTag()}
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
        >
          <MdAdd className="text-2xl text-blue-600 hover:text-white" />
        </button>
      </div>
        
       {error && <p className="text-red-600 text-xs pt-4">{error}</p>}
      <button className="bg-blue-500 text-white rounded  font-medium mt-5 p-3" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
