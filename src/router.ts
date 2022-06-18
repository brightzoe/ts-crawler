import { Router, Request, Response } from "express";
import fs from "fs";
import path from "path";
import Crawler from "./crawler";
import CourseAnalyzer from "./courseAnalyzer";

interface RequestWithBody extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const isLogin = req.session?.isLogin ?? false;
  if (isLogin) {
    res.send(`
  <html>
    <body>
    <a href='/getdata'> 爬取内容</a>
      <a href="/logout">logout</a>

    </body>
  </html>
`);
  } else {
    res.send(`
  <html>
    <body>
      <form method='post' action='/login'>
        <input type='password' name='password'/>
        <button>提交</button>
      </form>
    </body>
  </html>
`);
  }
});
router.post("/login", (req, res) => {
  const { password } = req.body;
  const isLogin = req.session?.isLogin ?? false;
  if (isLogin) {
    res.send("已经登录");
  } else {
    if (password === "123" && req.session) {
      req.session.isLogin = true;
      res.send("登录成功");
    } else {
      res.send("登录失败");
    }
  }
});

router.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    req.session.isLogin = undefined;
  }
  res.redirect("/");
});

router.get("/getdata", (req: RequestWithBody, res) => {
  const isLogin = req.session?.isLogin ?? false;
  if (isLogin) {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    // const url = "https://voice.baidu.com/act/newpneumonia/newpneumonia#tab0";
    const analyzer = CourseAnalyzer.getInstance();
    const crawler = new Crawler(url, analyzer);
    res.send("get data success");
  } else {
    res.send("can't get data, you need to login first");
  }
});
router.get("/showdata", (req, res) => {
  const isLogin = req.session?.isLogin ?? false;
  if (isLogin) {
    try {
      const filePath = path.resolve(__dirname, "../data/course.json");
      const result = fs.readFileSync(filePath, "utf-8");
      res.json(JSON.parse(result));
    } catch (error) {
      res.send("暂时没有内容");
    }
  } else {
    res.send("请登陆后查看内容");
  }
});

export default router;
