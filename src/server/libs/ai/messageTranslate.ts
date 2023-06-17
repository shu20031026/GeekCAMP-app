import { generateText } from './generateText';

export async function GenerateMessageTranslate(message: string, casualValue: number): Promise<string | undefined> {
  const content = `
                   # 命令: 
                   以下を制約条件をもとに、入力文をビジネスの場で使う想定で適切な文に変換して出力してください。

                   # 制約条件:
                   ・最大限に格式の高いビジネスの場のフォーマル度を100%として、フォーマル度${casualValue}%なビジネスの場を想定してください。
                   ・入力文に書いていないことは出力文に加えないでください。
                   ・フォーマル度が上がるほど丁寧な言葉使いになるようにしてください。
                   
                   # 入力文:
                   「${message}」
                   `;
  try {
    const response = await generateText(content);
    return response;
  } catch (error) {
    console.error(error);
    return;
  }
}
