// 投稿機能用のルーティング設定
const router = require("express").Router();
const Post = require("../models/Post");

// 投稿作成
router.post("/", async (req, res) => {
	// 新規投稿情報を作成
	const newPost = new Post(req.body);
	try {
		// 投稿を保存する
		const savePost = await newPost.save();

		return res.status(200).json(savePost);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// ルーティング設定をexportする
module.exports = router;
