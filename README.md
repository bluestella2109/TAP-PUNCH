# TAP//PUNCH

画像をタップ／パンチして30秒間のスコアを競うネタ系ミニゲーム。

## GitHub Pagesで公開する

1. このフォルダをGitHubリポジトリにアップロード
2. `index.html` がルートにあることを確認
3. Settings → Pages → Deploy from branch → `main / root`
4. 数分後に公開URLへアクセス

## Firebaseリアルタイムランキング

1. Firebase Consoleでプロジェクトを作成
2. Webアプリを追加
3. Firestore Databaseを作成
4. `js/firebase.js` の `firebaseConfig` を自分の設定に変更
5. Firestoreに `scores` コレクションが作成されるようゲームからスコア登録

### 開発用Firestoreルール例

公開ランキングとして使う場合は、スコア登録だけ許可するなど、運用に合わせてSecurity Rulesを設定してください。
例として最小構成のルールを用意する場合は、Firebase公式ドキュメントを確認してください。

## ファイル構成

- `index.html` — トップ
- `game.html` — 30秒ゲーム
- `ranking.html` — リアルタイムランキング
- `css/` — 外観・大量のアニメーション
- `js/` — ゲーム/Firebase/ランキング処理

画像はブラウザのlocalStorageに保存するため、現状は画像ファイル自体をFirebase Storageへアップロードしません。
