require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const userRouter = require("./routes/auth");
const connect = require("./config/db");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRouter);
connect();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`---- \nServer started on port ${PORT}\n-----`));
