// ユーザー情報のモデル
const mongoose = require("mongoose");

// スキーマの作成
const UserSchema = new mongoose.Schema(
	{
		// ユーザー名
		username: {
			type: String,
			required: true,
			min: 3,
			max: 25,
			unique: true,
		},
		// メールアドレス
		email: {
			type: String,
			required: true,
			max: 50,
			unique: true,
		},
		// パスワード
		password: {
			type: String,
			required: true,
			min: 6,
			max: 50,
		},
		// プロフィール画像
		profilePicture: {
			type: String,
			default: "",
		},
		// 背景画像
		coverPicture: {
			type: String,
			default: "",
		},
		// フォロワーユーザー
		followers: {
			type: Array,
			default: [],
		},
		// フォローユーザー
		followings: {
			type: Array,
			default: [],
		},
		// 認証情報
		isAdmin: {
			type: Boolean,
			default: false,
		},
		// 概要欄の情報
		desc: {
			type: String,
			max: 70,
		},
		// 住んでいる都市
		city: {
			type: String,
			max: 50,
		},
	},
	// 作成日時
	{ timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
