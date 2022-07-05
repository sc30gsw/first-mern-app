// 認証機能用のルーティング設定
const router = require("express").Router();
// ユーザーモデルの読み込み
const User = require("../models/User");

// ユーザー登録
router.post("/register", async (req, res) => {
	try {
		// 新規ユーザーを作成
		const newUser = await new User({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		});

		// ユーザーの保存
		const user = await newUser.save();

		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// ログイン
router.post("/login", async (req, res) => {
	try {
		// ユーザーをメールアドレスで取得
		const user = await User.findOne({ email: req.body.email });

		// ユーザーが取得できない場合
		if (!user) return res.status(404).send("ユーザーが見つかりません");

		// パスワードが一致・不一致検証
		const validPassword = req.body.password === user.password;

		// パスワード不一致の場合
		if (!validPassword)
			return res.status(400).json("パスワードが間違っています");

		return res.status(200).json(user);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// ルーティング設定をexportする
module.exports = router;
