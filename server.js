// expressの呼び出し
const express = require("express");
const app = express();

// usersのルーティングを呼び出し
const userRoute = require("./routes/users");
const PORT = 3000;

// ミドルウェアの設定
app.use("/api/users", userRoute);

// サーバー起動
app.listen(PORT, () => console.log("サーバーが起動しました"));
