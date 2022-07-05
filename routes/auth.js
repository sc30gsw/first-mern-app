// 認証機能用のルーティング設定
const router = require("express").Router();

router.get("/", (req, res) => {
	res.send("auth router");
});

// ルーティング設定をexportする
module.exports = router;
