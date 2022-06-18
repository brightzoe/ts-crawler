import * as superagent from "superagent";
import * as fs from "fs";
import * as path from "path";

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

export default Crawler;
