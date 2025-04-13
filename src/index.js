import mongoose from "mongoose";
import express,{json} from "express";
import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";

import cors from "cors";
import morgan from "morgan";

const app = express();
app.use(cors({
    origin: "*",
}));
app.use(morgan("combined"));
const api = "/api"
function conn(){
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(" successful connected  to mongo db");
    startServer();
})
.catch((error)=>{
    console.log(error.message)
    setTimeout(()=>{
        conn()
    }, 5000)
})
}



function startServer(){
app.use(json())

app.get("/", (req, res)=>{
    res.status(200).json({message: "Hello from teacher bomba backend"})
});
app.use(`${api}/auth`,AuthRoutes);
app.use(`${api}/user`, UserRoutes);
app.use(`${api}/admin`, adminRoutes);
const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}`);
    
}); 
}

conn();