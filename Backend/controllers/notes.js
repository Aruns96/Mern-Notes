const Note = require("../models/notes")

const postAddNote = async(req,res)=>{
       const {title,content,tag} = req.body
        if(!title){
            return res.status(400).json({message:"title is required"})
        }
        if(!content){
            return res.status(400).json({message:"content is required"})
        }
       try{
                   const note = new Note({title,content,tag:tag||[],userId:req.user._id})
                   await note.save()
                   return res.status(200).json({message:"note added",data:note})
       }catch(e){
            return  res.status(500).json({error:e})
       }
}


const editNote =async(req,res)=>{
     const noteId = req.params.noteId
     const {title,content,tag,isPinned} = req.body
     if(!title && !content &&!tag){
        return res.status(400).json({message:"no changes provided"})
     }
     try{
          const note = await Note.findOne({_id:noteId,userId:req.user._id})
         
          if(!note){
            return res.status(404).json({message:"note not found"})
          }
          if(title){
            note.title = title
          }
          if(content){
            note.content = content
          }

          if(tag){
            note.tag = tag
          }  
          if(isPinned){
            note.isPinned = isPinned
          }

          await note.save()
          return res.status(201).json({message:"note updated",data:note})
     }catch(e){
      return   res.status(500).json({error:e})
     }

}
const getNotes = async(req,res)=>{
    
    try{        const allNote = await Note.find()
                const notes = await Note.find({userId:req.user._id}).sort({isPinned:-1})
               // console.log(req.user._id,allNote)
                return res.status(200).json({message:"notes list",data:notes})
    }catch(e){
         return  res.status(500).json({error:e})
    }
}

const deleteNote = async(req,res)=>{
    try{
                 const noteId = req.params.noteId
                 await Note.findByIdAndDelete({_id:noteId,userId:req.user._id})
                 return res.status(200).json({message:"note sucessfully deleted "})
    }catch(e){
         return  res.status(500).json({error:e})
    }
}


const updatepinNote =async(req,res)=>{
    const noteId = req.params.noteId
    const {isPinned} = req.body
   
    try{
         const note = await Note.findOne({_id:noteId,userId:req.user._id})
         if(!note){
           return res.status(404).json({message:"note not found"})
         }
        
         if(isPinned){
           note.isPinned = isPinned || false
         }

         await note.save()
         return res.status(201).json({messgae:"note updated",data:note})
    }catch(e){
     return   res.status(500).json({error:e})
    }

}

const searchNote = async(req,res)=>{
    const query=req.query.search
    try{
        const matchingNotes = await Note.find({userId:req.user._id,
            $or:[
                {title:{$regex:new RegExp(query,"i")}},
                {content:{$regex:new RegExp(query,"i")}}
            ]
        })
        return res.status(200).json({message:"search complete",data:matchingNotes})
   }catch(e){
    return   res.status(500).json({error:e})
   }

}

module.exports = {postAddNote,editNote,getNotes,deleteNote,updatepinNote,searchNote}