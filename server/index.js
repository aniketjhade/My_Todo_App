const express = require("express");
const dotenv = require("dotenv");
dotenv.config("./.env");
const dbConnect = require("./dbConnect");
const authRouter = require("./Routers/authRouter");
const todoRouter=require("./Routers/todoRouter");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");



//middleware
app.use(express.json({limit:"10mb"})); // it is responsible for the insomnia/any request to the auth controller i.e body.req
app.use(morgan("common")); // it will show logs whenever we hit for the send for request and response
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
  })
);


app.use("/auth", authRouter);
app.use('/todos',todoRouter);

const PORT = process.env.PORT || 4001;
dbConnect();

app.listen(PORT, () => {
  console.log(`listening on PORT : ${PORT}`);
});
