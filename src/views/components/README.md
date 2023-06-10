# views/components

## フォルダ構造について

### `base`

component の base になる component をここで管理します。<br />
ここの component は page から直接呼び出さないでください。<br />

### `ui`

domain のない component を管理します。

### `domain`

domain に関連する component を管理します。

## component の命名規則について

`BCD design` (Base-Case-Domain design) を意識するようにしています。

### Base - 基礎 (名詞)

- 基礎的な機能(名詞)そのもの、事実上の “型” を表す単語のことを指します。

### Case - 状況 (動詞/形容詞/名詞)

- 状況(動詞/形容詞)や状態(名詞)を表す単語のことを指します。 #　 Domain - 関心 (名詞)

### Domain - 関心 (名詞)
- 人(ロール)や物(名詞)など "関心の対象" を表す単語のことを指します。

これらをもとに`{Domain}{Case}{Base}` といった命名にしてください。<br />
参考記事：[BCD Design によるコンポーネントの分類](https://qiita.com/misuken/items/19f9f603ab165e228fe1#bcd-design-%E3%81%A8%E3%81%AF)

## 新規コンポーネントの作成時

- 以下のテンプレート構造に従って作成してください。

```
SomeComponent
├── index.ts // ディレクトリの外からimportできるようにここでexportします
├── templates.tsx // View のみを定義したコンポーネント
└── container.tsx // ステートやイベントハンドラーの管理を行うコンポーネント
```
