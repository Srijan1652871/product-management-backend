require("dotenv").config();

const express = require("express")
const connectDB= require("./src/config/db")
const cors = require('cors')

const userRoutes = require("./src/routes/user.routes")
const productRoutes = require("./src/routes/product.routes")


const app = express()
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
connectDB();
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("Welcome to my server")
})

app.use("/auth", userRoutes);
app.use("/products", productRoutes);

app.listen(5000, ()=>{
    console.log("server running....")
})