const express = require("express")
const cors = require("cors")
const monooge = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
const userRoute = require("./routes/user")
const noteRoute = require("./routes/notes")

const app = express()
app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.use("/user",userRoute)
app.use("/note",noteRoute)

monooge.connect(process.env.MONGO)
.then(result=>{
    app.listen(3000,()=>{
        console.log("server is listening..")
    })
})
.catch(e=>console.log(e))
