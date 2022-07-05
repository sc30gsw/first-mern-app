// 投稿情報のモデル
const mongoose = require("mongoose");

// スキーマの作成
const PostSchema = new mongoose.Schema(
	{
		// 投稿に紐づくユーザー
		userId: {
			type: String,
			required: true,
		},
		// 投稿内容
		desc: {
			type: String,
			max: 200,
		},
		// 画像
		img: {
			type: String,
		},
		// 投稿に対するいいね
		likes: {
			type: Array,
			default: [],
		},
	},
	// 作成日時
	{ timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
