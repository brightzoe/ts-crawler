import express from "express";
import router from "./router";

const app = express();
app.use(router);


app.listen(8001,()=>{
  console.log("server is running at http://localhost:8001");
})