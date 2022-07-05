// expressの呼び出し
const express = require("express");
const app = express();

// ルーティングを呼び出し
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const PORT = 3000;

// mongooseの呼び出し
const mongoose = require("mongoose");

// 環境変数呼び出し
require("dotenv").config();

// DB接続
mongoose
	.connect(process.env.MONGOURL)
	.then(() => {
		console.log("DBと接続中");
	})
	.catch((err) => {
		console.log(err);
	});

// ミドルウェアの設定
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.get("/", (req, res) => {
	res.send("hello express");
});

// サーバー起動
app.listen(PORT, () => console.log("サーバーが起動しました"));
