import { Router, Request, Response } from "express";
import Crawler from "./crawler";
import CourseAnalyzer from "./courseAnalyzer";
const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});
router.get("/data", (req, res) => {
  const secret = "secretKey";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  // const url = "https://voice.baidu.com/act/newpneumonia/newpneumonia#tab0";
  const analyzer = CourseAnalyzer.getInstance();
  const crawler = new Crawler(url, analyzer);
  res.send("get data");
});

export default router;
