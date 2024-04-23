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
  block: bigint;
  tx_index: bigint;
  amount: bigint;
  out_inex: bigint;
}

// 交易编码
app.post('/enchiper', (req: Request, res: Response) => {
  const enchiperData: EnchiperData = req.body;

  console.log("-------------------");
  console.log(enchiperData);
  console.log("-------------------");
  if (enchiperData.method === 'mint'){
    const runes = new Runestone({
      edicts: [
        {
          id: new RuneId(new U64(enchiperData.block), new U32(enchiperData.tx_index)),
          amount: new U128(enchiperData.amount),
          output: new U32(enchiperData.out_inex),

        },
      ],
      mint: new RuneId(new U64(enchiperData.block), new U32(enchiperData.tx_index)),
      // mint: new RuneId(new U64(840000n), new U32(22n)),
    });
    const buffer =runes.enchiper();
    const hex=buffer.toString('hex');
    res.status(201).json({ message: 'User created successfully', hex });

  }else if (enchiperData.method === 'transfer'){
    const runes = new Runestone({
      edicts: [
        {
          id: new RuneId(new U64(840000n), new U32(22n)),
          amount: new U128(10000000000n),
          output: new U32(0n),

          // id: new RuneId(new U64(enchiperData.block), new U32(enchiperData.tx_index)),
          // amount: new U128(enchiperData.amount),
          // output: new U32(enchiperData.out_inex),
        },
      ],
    });
    const buffer =runes.enchiper();
    const hex=buffer.toString('hex');
    res.status(201).json({ message: 'User created successfully', buffer });

  }
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

