// ユーザー機能のルーティング設定
const router = require("express").Router();
// ユーザーモデルの読み込み
const User = require("../models/User");

// ユーザー更新
router.put("/:id", async (req, res) => {
	// リクエストボディとリクエストパラメータのユーザーIDが等しい場合 || 管理者権限がある場合
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			// ユーザー更新実行
			const user = await User.findByIdAndUpdate(req.params.id, {
				// リクエストボディに含まれているパラメータを更新
				$set: req.body,
			});

			return res.status(200).json("ユーザー情報が更新されました");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("自分のアカウントのみ更新できます");
	}
});

// ユーザー削除
router.delete("/:id", async (req, res) => {
	// リクエストボディとリクエストパラメータのユーザーIDが等しい場合 || 管理者権限がある場合
	if (req.body.userId === req.params.id || req.body.isAdmin) {
		try {
			// ユーザー削除実行
			const user = await User.findByIdAndDelete(req.params.id);

			return res.status(200).json("ユーザー情報が削除されました");
		} catch (err) {
			return res.status(500).json(err);
		}
	} else {
		return res.status(403).json("自分のアカウントのみ削除できます");
	}
});

// ユーザー取得
router.get("/:id", async (req, res) => {
	try {
		// ユーザー取得実行
		const user = await User.findById(req.params.id);
		// 取得したユーザー情報から各値を分割
		const { password, updatedAt, ...other } = user._doc;
		if (!user) return res.status(404).json("ユーザーが見つかりませんでした");

		// password, updatedAtを除く値のみ返却する
		return res.status(200).json(other);
	} catch (err) {
		return res.status(500).json(err);
	}
});
// ルーティング設定をexportする
module.exports = router;
