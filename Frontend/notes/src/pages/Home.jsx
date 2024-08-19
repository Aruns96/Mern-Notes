import React, { useEffect, useState } from "react";
import ProfileInfo from "../components/ProfileInfo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import SearchBar from "../components/SearchBar";
import NoteCard from "../components/NoteCard";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "../components/AddEditNotes";
import Modal from 'react-modal';
import axios from "axios"
import Toast from "../components/Toast";

Modal.setAppElement('#root');
const Home = () => {
    const [modal,setModal] = useState({
        isShown:false,
        type:"add",
        data:null
    })
    const [showToast,setShowToast] = useState({
        isShown:false,
        type:"add",
        data:null
    })
    const showToastMessage = (message,type)=>{
        setShowToast({isShown:true,message,type})
    }
    const handleCloseToast = ()=>{
        setShowToast({isShown:false,message:""})
    }
  const history = useHistory();
  const [search, setSearch] = useState("");
  const[person,setPerson] = useState(null)
  const [notes,setNotes] = useState([])
  const[isSearch,setIsSearch] = useState(false)
  const onLogout = () => {
    history.replace("/login");
    localStorage.clear()
  };
  const handleSearch = () => {
    if(search){
        onSearchNote(search)
    }
  };
//   const onClearSearch = () => {
//     setSearch("");
//   };
  const addButtonHandler =()=>{
    setModal({
        isShown:true,
        type:"add",
        data:null
    })
  }
  const closeHandler = ()=>{
    setModal({  isShown:false,
        type:"add",
        data:null})
  }
  const token = localStorage.getItem("token")
  const getUser = async()=>{
    try{
          const res = await axios.get("http://localhost:3000/user/get-user",{headers:{"Authorization":token}})
          setPerson(res.data.user)

    }catch(e){
          console.log(e)
          localStorage.clear()
          history.replace("/login")
    }
  }
  useEffect(()=>{
      getUser()
      getAllNotes()
  },[])

  const handleEdit = (noteDetails)=>{
    setModal({isShown:true,data:noteDetails,type:"edit"})
  }

  const getAllNotes = async()=>{
    try{
          const res = await axios.get("http://localhost:3000/note/get-notes",{headers:{"Authorization":token}})
          console.log(res.data.data)
          setNotes(res.data.data)

    }catch(e){
          console.log(e)
          
    }
  }

  const deleteNote = async(id)=>{
    try{
            const res = await axios.delete(`http://localhost:3000/note/delete-note/${id}`,{headers:{"Authorization":token}})
            if(res){
                showToastMessage("Note Deleted","delete")
                getAllNotes()
                onClose()
            }
    }catch(e){
        console.log(e)
    }
  }
  const onSearchNote = async(query)=>{
    try{
        const res = await axios.get(`http://localhost:3000/note/search-notes?search=${query}`,{headers:{"Authorization":token}})
        if(res.data){
            setIsSearch(true)
            setNotes(res.data.data)
        }
    }catch(e){
        console.log(e)
    }
  }
  const handleClearSearch = ()=>{
    setIsSearch(false)
    getAllNotes()
    setSearch("")
  }
  const onPinned = async(note)=>{
    try{
        console.log(!note.isPinned)
        const res = await axios.put(`http://localhost:3000/note/update-note-pinned/${note._id}`,{
            isPinned: !(note.isPinned)
        },{headers:{"Authorization":token}})
        console.log("res",res)
        if(res.data){
            showToastMessage("Notes Updated")
            getAllNotes()
            
        }
      }catch(e){
        console.log(e)
        
      }
  }
 
  return (
    <>
      <div className="bg-white flex item justify-between px-6 py-2">
        <h1 className="text-2xl font-bold">Notes</h1>
        <SearchBar
       
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          handleSearch={handleSearch}
          onClearSearch={handleClearSearch}
        />
        <ProfileInfo handleLogOut={onLogout} person={person}/>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
            {notes.map((note)=>(
                    <NoteCard 
                    key={note._id}
                    title={note.title}
                    date={note.createdOn}
                    content={note.content}
                    tag={note.tag}
                    isPinned={note.isPinned}
                    onEdit={()=>handleEdit(note)}
                    onDelete={()=>deleteNote(note._id)}
                    onPinNote={()=>onPinned(note)}
                    />
            ))}
        
        </div>
       
      </div>
      <button   className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-800 hover:bg-blue-300 absolute right-10 bottom-10" onClick={()=>{}}>
        <MdAdd  onClick={addButtonHandler} className="text=[40px] text-white "/>
      </button>
      <Modal isOpen={modal.isShown} onRequestClose={()=>{
        setModal({isShown:true,type:"add",data:null})
      }} 
      style={
        {overlay:{
            backgroundColor:"rgba(0,0,0,0,2)"
        }}
      }
      contentLabel=""
      className="w-[40%] max-h-3/4 bg-white rounded-md mt-14 p-5 overflow">
      <AddEditNotes onClose={closeHandler} type={modal.type} noteData={modal.data} getAllNotes={getAllNotes}
      showToastMessage={showToastMessage}/>
      </Modal> 
      <Toast isShown ={showToast.isShown} message={showToast.message} type={showToast.type} onClose={handleCloseToast}/>
    </>
  );
};

export default Home;
