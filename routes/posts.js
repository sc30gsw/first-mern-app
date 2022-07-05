// 投稿機能用のルーティング設定
const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

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

// いいね機能
router.put("/:id/like", async (req, res) => {
	try {
		// いいねする投稿の情報
		const post = await Post.findById(req.params.id);

		// いいねする投稿にいいねが押されていない場合
		if (!post.likes.includes(req.body.userId)) {
			// 投稿のlikes配列に追加する
			await post.updateOne({
				$push: {
					likes: req.body.userId,
				},
			});

			return res.status(200).json("いいねに成功しました");
			// 既にいいねしている場合
		} else {
			// いいねしている投稿のいいねを外す
			await post.updateOne({
				$pull: {
					likes: req.body.userId,
				},
			});
			return res.status(403).json("投稿にいいねを外しました");
		}
	} catch (err) {
		return res.status(500).json(err);
	}
});

// タイムラインの投稿を取得する
router.get("/timeline/all", async (req, res) => {
	try {
		// ログインユーザー取得
		const currentUser = await User.findById(req.body.userId);
		// ログインユーザーに紐づく投稿を取得
		const userPosts = await Post.find({ userId: currentUser._id });
		// ログインユーザーがフォローしているユーザーの投稿を取得
		// currentUserが取得できるまでPromiseで待機させる
		const friendPosts = await Promise.all(
			// ログインユーザーがフォローしているユーザーを1つずつ取り出す
			currentUser.followings.map((friendId) => {
				// ログインユーザーがフォローしているユーザーの投稿をfriendPostに返す
				return Post.find({ userId: friendId });
			})
		);

		// ログインユーザーに紐づく投稿とログインユーザーがフォローしているユーザーの投稿を連結して返却する
		return res.status(200).json(userPosts.concat(...friendPosts));
	} catch (err) {
		return ree.status(500).res(err);
	}
});

// ルーティング設定をexportする
module.exports = router;
