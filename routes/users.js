// ユーザー機能のルーティング設定
const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("user router");
});

// ルーティング設定をexportする
module.exports = router;
