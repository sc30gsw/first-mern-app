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

// ルーティング設定をexportする
module.exports = router;
