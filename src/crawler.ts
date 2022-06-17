import * as superagent from "superagent";
import * as fs from "fs";
import * as path from "path";
import CourseAnalyzer from "./courseAnalyzer";

export interface Analyzer {
  analyze: (html: string, path: string) => string;
}
class Crawler {
  private filePath = path.resolve(__dirname, "../data/course.json");

  constructor(private url: string, private analyzer: Analyzer) {
    this.initSpiderProcess();
  }
  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    fs.writeFileSync(this.filePath, fileContent);
  }
  private async getRawHtml() {
    const res = await superagent.get(this.url);
    // console.log(res.text);
    return res.text;
  }
}
const secret = "secretKey";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
// const url = "https://voice.baidu.com/act/newpneumonia/newpneumonia#tab0";
const analyzer = CourseAnalyzer.getInstance();
const crawler = new Crawler(url, analyzer);
