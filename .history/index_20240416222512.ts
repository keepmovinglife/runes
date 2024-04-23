import express, { Request, Response } from 'express';
const app = express();
const bodyParser = require('body-parser'); // 或者使用 `npm install --save @types/body-parser` 并导入 `import bodyParser from 'body-parser';`

// 使用 body-parser 中间件解析请求体（如 JSON、URL-encoded 格式）
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

interface Data {
  hex: string;
}

app.post('/enchiper', (req: Request, res: Response) => {
  const hex: Data = req.body; // 声明并获取请求体中的用户数据

  console.log(hex);

  // 在此处处理用户数据，例如保存到数据库等操作

  res.status(201).json({ message: 'User created successfully', user });
});
app.post('/dechiper', (req: Request, res: Response) => {
  const user: User = req.body; // 声明并获取请求体中的用户数据

  // 在此处处理用户数据，例如保存到数据库等操作

  res.status(201).json({ message: 'User created successfully', user });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});