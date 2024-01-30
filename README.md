## 概要

扉や窓の鍵の開閉状態を確認できるアプリです。M5 Stack と磁石を窓に取り付けて、アプリから開閉状態を確認できます

## 試用

### M5の設定

1. m5.inoをArduino IDEのプロジェクトにコピーする
2. ライブラリインストール
3. Wi-FiのSSID等を書き換える
4. 書き込み
5. 磁気センサをG35、G25、GNDにつなぐ

### アプリの設定

1. https://iput-bb.vercel.app にアクセスする
2. email: ababa@ba.ba password: ababababa でログインする
3. /dashboardを開く
4. 追加ボタンを押す
5. m5に表示されているMACアドレスと仮名を入力する

## ホストする

1. リポジトリをクローン

2. `pnpm install`

3. 環境変数を設定する

- NextAuth

  - NEXTAUTH_URL
  - NEXTAUTH_SECRET

- Firebase

  - NEXT_PUBLIC_API_KEY
  - NEXT_PUBLIC_AUTH_DOMAIN
  - NEXT_PUBLIC_PROJECT_ID
  - NEXT_PUBLIC_STORAGE_BUCKET
  - NEXT_PUBLIC_MESSAGING_SENDER_ID
  - NEXT_PUBLIC_APP_ID
  - NEXT_PUBLIC_MEASUREMENT_ID
  - NEXT_PUBLIC_VAPID_KEY

- Firebase Admin

  - FIREBASE_PROJECT_ID
  - FIREBASE_PRIVATE_KEY
  - FIREBASE_CLIENT_EMAIL

3. 実行

```bash
pnpm build; pnpm start
```
