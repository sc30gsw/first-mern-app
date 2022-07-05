// 投稿機能用のルーティング設定
const router = require("express").Router();
const Post = require("../models/Post");
const { findByIdAndUpdate } = require("../models/User");

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

// 投稿を更新する
router.put("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// 投稿に紐づくユーザーとリクエストボディのユーザーが等しい場合
		if (post.userId === req.body.userId) {
			// 投稿更新を実行
			await post.updateOne({
				// リクエストボディに含まれているパラメータを更新
				$set: req.body,
			});
			return res.status(200).json("投稿の更新に成功しました");
		} else {
			return res.status(403).json("他のユーザーの投稿は編集できません");
		}
	} catch (err) {
		return res.status(403).json(err);
	}
});

// 投稿を削除する
router.delete("/:id", async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);

		// 投稿に紐づくユーザーとリクエストボディのユーザーが等しい場合
		if (post.userId === req.body.userId) {
			// 投稿削除を実行
			await post.deleteOne();
			return res.status(200).json("投稿の削除に成功しました");
		} else {
			return res.status(403).json("他のユーザーの投稿は削除できません");
		}
	} catch (err) {
		return res.status(403).json(err);
	}
});

// 投稿の取得
router.get("/:id", async (req, res) => {
	try {
		// 投稿取得実行
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json("投稿が見つかりませんでした");

		return res.status(200).json(post);
	} catch (err) {
		return res.status(500).json(err);
	}
});

// ルーティング設定をexportする
module.exports = router;
