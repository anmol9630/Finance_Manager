const express=require("express");
const cors=require("cors");
const bodyParser = require("body-parser");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");
const dotenv=require("dotenv");
const userRoute=require("./Routes/userRoute");
const morgan = require("morgan")
const {Error} = require("./middleware/ErrorHandler");

dotenv.config();
const port=process.env.PORT || 8000;

const app=express();

mongoose.connect(process.env.database).then(()=>{
    console.log("database connected");
})

app.use(morgan("dev"))

const corsOptions = {
    origin: 'http://localhost:5173', 
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization"
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("/user",userRoute);


app.use(Error)

app.listen(port,()=>{
    console.log(`Port is running on ${port}`);
})