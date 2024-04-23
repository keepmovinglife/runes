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

interface DechiperData {
  hex: string;
}

// 交易解码

app.post('/dechiper', (req: Request, res: Response) => {
  const raw: DechiperData = req.body; // 声明并获取请求体中的用户数据
  const runestone = Runestone.dechiper(Buffer.from(
    raw.hex,
    "hex",
  ));
  console.log(runestone);
  console.log(JSON.stringify(runestone));
  // 在此处处理用户数据，例如保存到数据库等操作
  res.status(201).json({ message: 'User created successfully', runestone });
});

interface EnchiperData {
  method: string;
  block: string;
  tx_index: string;
  amount: string;
  out_index: string;
}

// 交易编码
app.post('/enchiper', (req: Request, res: Response) => {
  const enchiperData: EnchiperData = req.body;
  if (enchiperData.method === 'mint'){
    const runes = new Runestone({
      edicts: [
        {
          id: new RuneId(U64.fromString(enchiperData.block), U32.fromString(enchiperData.tx_index)),
          output: U32.fromString(enchiperData.out_index),
        },
      ],
      mint: new RuneId(U64.fromString(enchiperData.block), U32.fromString(enchiperData.tx_index)),
      
    });
    const buffer =runes.enchiper();
    const hex=buffer.toString('hex');
    res.status(201).json({ message: 'User created successfully', hex });

  }else if (enchiperData.method === 'transfer'){
    const runes = new Runestone({
      edicts: [
        {
          id: new RuneId(U64.fromString(enchiperData.block), U32.fromString(enchiperData.tx_index)),
          amount: U128.fromString(enchiperData.amount),
          output: U32.fromString(enchiperData.out_index),
        },
      ],
      
    });
    const buffer =runes.enchiper();
    const hex=buffer.toString('hex');
    console.log(hex);
    res.status(201).json({ message: 'User created successfully', hex });

  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

