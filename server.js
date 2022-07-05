// expressの呼び出し
const express = require("express");
const app = express();

// ルーティングを呼び出し
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postsRoute = require("./routes/posts");
const PORT = 3000;

// ミドルウェアの設定
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postsRoute);

app.get("/", (req, res) => {
	res.send("hello express");
});

// サーバー起動
app.listen(PORT, () => console.log("サーバーが起動しました"));
