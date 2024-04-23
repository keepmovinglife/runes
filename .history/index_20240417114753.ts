import express, { Request, Response } from 'express';
import { Runestone } from "./src/Runestone";
import { U128, U32, U64 } from "big-varuint-js";
import { RuneId } from "./src/RuneId";
import { SpacedRune } from "./src/SpacedRune";
import { Symbol } from "./src/Symbol";
import { Etching } from "./src/types";
import bodyParser from 'body-parser';
const app = express();

// 使用 body-parser 中间件解析请求体（如 JSON、URL-encoded 格式）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface Data {
  hex: string;
}


app.post('/enchiper', (req: Request, res: Response) => {
  const raw: Data = req.body; // 声明并获取请求体中的用户数据
  const runestone = Runestone.dechiper(Buffer.from(
    raw.hex,
    "hex",
  ));
  console.log(runestone);
  // 在此处处理用户数据，例如保存到数据库等操作
  res.status(201).json({ message: 'User created successfully', runestone });
});
// app.post('/dechiper', (req: Request, res: Response) => {
//   const user: User = req.body; // 声明并获取请求体中的用户数据

//   // 在此处处理用户数据，例如保存到数据库等操作

//   res.status(201).json({ message: 'User created successfully', user });
// });
app.get('/test', (req: Request, res: Response) => {
  
  // 在此处处理用户数据，例如保存到数据库等操作

  
  const runestone = new Runestone({
    edicts: [
      {
        id: new RuneId(new U64(2585709n), new U32(141n)),
        amount: new U128(100n),
        output: new U32(1n),
      },
      {
        id: new RuneId(new U64(2585709n), new U32(141n)),
        amount: new U128(1111n),
        output: new U32(2222n),
      },

    ],
    // etching: new Etching({}),
    mint: new RuneId(new U64(2585709n), new U32(141n)),
  });

  res.status(201).json({ message: 'User created successfully', runestone });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});