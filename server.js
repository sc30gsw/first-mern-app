// expressの呼び出し
const express = require("express");
const app = express();
const PORT = 3000;

// ローカルサーバーにアクセス
app.get("/", (req, res) => {
	res.send("hello express");
});

// サーバー起動
app.listen(PORT, () => console.log("サーバーが起動しました"));
