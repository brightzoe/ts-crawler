import fs from "fs";
import path from "path";
import { Router, Request, Response, NextFunction } from "express";
import Crawler from "./utils/crawler";
import Analyzer from "./utils/analyzer";
import { getRes } from "./utils/index";

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  };
}

const router = Router();
const checkLogin = (req: BodyRequest, res: Response, next: NextFunction) => {
  const isLogin = req.session?.isLogin ?? false;
  if (isLogin) {
    next();
  } else {
    res.json(getRes(null, "请先登录"));
  }
};

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
        <button>登录</button>
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
    res.json(getRes(null, "已经登录"));
  } else {
    if (password === "123" && req.session) {
      req.session.isLogin = true;
      res.send(true);
    } else {
      res.json(getRes(null, "登录失败"));
    }
  }
});

router.get("/logout", (req: Request, res: Response) => {
  if (req.session) {
    req.session.isLogin = undefined;
  }
  res.json(getRes(true));
});

router.get("/getdata", checkLogin, (req: BodyRequest, res) => {
  const secret = "secretKey";
  const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
  // const url = "https://voice.baidu.com/act/newpneumonia/newpneumonia#tab0";
  const analyzer = Analyzer.getInstance();
  const crawler = new Crawler(url, analyzer);
  res.json(true);
});
router.get("/showdata", checkLogin, (req, res) => {
  try {
    const filePath = path.resolve(__dirname, "../data/course.json");
    const result = fs.readFileSync(filePath, "utf-8");
    res.json(getRes(JSON.parse(result)));
  } catch (error) {
    res.json(getRes(null, "没有数据"));
  }
});

export default router;
