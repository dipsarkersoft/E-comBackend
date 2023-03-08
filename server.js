const{readdirSync}=require("fs")
const express=require("express")
const app=express()
const helmet=require('helmet')
const mongoose=require("mongoose")
require("dotenv").config()
const morgan=require("morgan")
const cors=require("cors")



//middleware.......
//app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}));
app.use(helmet())


// app.use(express.static(path.join(__dirname,"frontend/build")))

//routes ...........

readdirSync("./src/routes").map(r =>app.use("/api/v1", require(`./src/routes/${r}`)))


//Server......

const port=process.env.PORT
const database=process.env.DATABASE


//CONNECT DB..........
mongoose.set('strictQuery', true)
mongoose
.connect(database)
.then(()=>{app.listen(port,()=>{
     console.log(`Server Running on port ${port}`)
})})
.catch((error)=>{console.log(error)})


// app.get('*',function (req,res) {
//      res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
//  })

module.exports=app