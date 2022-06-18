import express, { Request, Response, NextFunction } from "express";
import cookieSession from "cookie-session";
import router from "./router";

const app = express();
app.use(express.json()); //处理JSON 格式请求体
app.use(express.urlencoded({ extended: false })); //处理表单格式的请求体
app.use(
  cookieSession({
    name: "session",
    keys: ["server hh"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(router);

app.listen(8001, () => {
  console.log("server is running at http://localhost:8001");
});
