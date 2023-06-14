#

## Getting Started

1. このリポジトリをクローンします.
2. OpenAI にログインして API キーを生成します。[https://platform.openai.com/account/api-keys
3. クローンしたディレクトリの直下に`.env.local`ファイルを作成し以下のように環境変数を設定します。
   ```
   OPENAI_API_KEY=aaaaaaaaaaaaaaaaaaaaaaaaaa
   ```
4. 次のコマンドを入力してパッケージをインストールします。
   `yarn install`
5. 次のコマンドで開発環境のサーバーを立ち上げます.
   `yarn dev`
6. [http://localhost:3000](http://localhost:3000)にブラウザからアクセスします.
7. 次のコマンドで storybook の開発環境を立ち上げます.
   `yarn storybook`
8. [http://localhost:6006](http://localhost:6006)にブラウザからアクセスします。
9. 次のコマンドでテストを実行します.
   `yarn test`
