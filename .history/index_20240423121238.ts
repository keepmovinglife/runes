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


// 交易编码
app.post('/enchiper/mint', (req: Request, res: Response) => {

  // const stone: Runestone = req.body; // 声明并获取请求体中的用户数据

  

  const runestone = new Runestone({
    edicts: [
      {
        id: new RuneId(new U64(2585299n), new U32(178n)),
        amount: new U128(8000n),
        output: new U32(0n),
      },
      // {
      //   id: new RuneId(new U64(2585709n), new U32(141n)),
      //   amount: new U128(1111n),
      //   output: new U32(2222n),
      // },
    ],
    // mint: new RuneId(new U64(840000n), new U32(22n)),
    // pointer: new U32(1212342342n),
    // etching: {
    //   rune: spacedRune.rune,
    //   spacers: spacedRune.spacers,
    //   premine: new U128(232390482390843242n),
    //   symbol: Symbol.fromString("R"),
    //   terms: {
    //     amount: new U128(232323232323232390482390843242n),
    //     cap: new U128(532390482390843242n),
    //     height: {
    //       start: new U64(1n),
    //       end: new U64(1n),
    //     },
    //     offset: {
    //       start: new U64(2n),
    //       end: new U64(2n),
    //     },
    //   },
    // },
  })
});

  app.post('/enchiper/transfer', (req: Request, res: Response) => {

    // const stone: Runestone = req.body; // 声明并获取请求体中的用户数据
  
    
  
    const runestone = new Runestone({
      edicts: [
        {
          id: new RuneId(new U64(2585299n), new U32(178n)),
          amount: new U128(8000n),
          output: new U32(0n),
        },
        // {
        //   id: new RuneId(new U64(2585709n), new U32(141n)),
        //   amount: new U128(1111n),
        //   output: new U32(2222n),
        // },
      ],
      // mint: new RuneId(new U64(840000n), new U32(22n)),
      // pointer: new U32(1212342342n),
      // etching: {
      //   rune: spacedRune.rune,
      //   spacers: spacedRune.spacers,
      //   premine: new U128(232390482390843242n),
      //   symbol: Symbol.fromString("R"),
      //   terms: {
      //     amount: new U128(232323232323232390482390843242n),
      //     cap: new U128(532390482390843242n),
      //     height: {
      //       start: new U64(1n),
      //       end: new U64(1n),
      //     },
      //     offset: {
      //       start: new U64(2n),
      //       end: new U64(2n),
      //     },
      //   },
      // },
    }



);


  // 在此处处理用户数据，例如保存到数据库等操作

  const buffer = runestone.enchiper();

  console.log({
    buffer,
  });
;

const hex=buffer.toString('hex');

  res.status(201).json({hex});
});


const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

