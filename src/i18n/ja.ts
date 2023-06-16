const ja = {
  appName: 'ChatMasters',
  mode: {
    evaluate: {
      name: 'メッセージ判別モード',
      description: '入力されたメッセージから、会話のフォーマル度の目安を0%から100%で判別します',
    },
    translate: {
      name: 'メッセージ変換モード',
      description: '入力されたメッセージを指定したフォーマル度に変換します',
    },
  },
  button: {
    changeMode: 'モードを変更する',
    evaluate: '評価する',
    translate: '変換する',
  },
} as const;

export default ja;
