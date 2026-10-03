# TAP//PUNCH v2

30秒間の画像タップ／パンチ・アーケードゲーム。

## v2追加
- 画面外から飛んでくる拳
- ヒットストップ
- ターゲット吹っ飛び
- PC / iPad / スマホで広いランダム出現範囲
- 漫画風集中線・衝撃波・スパーク・デブリ
- CRITICAL / COMBO / FINISHER READY / FINISHER
- 画面シェイク・フラッシュ
- Firebaseリアルタイムランキング
- ニックネーム登録
- 登録完了演出後に自動でホームへ戻る

## Firebase
`js/firebase.js` に指定されたFirebase設定を入れています。Firestore Databaseを有効化し、`scores` コレクションのSecurity Rulesを運用に合わせて設定してください。
