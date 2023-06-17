import { NextPage } from 'next';
import { useState } from 'react';
import { usePostApi } from '~/src/hooks/usePostApi';
import MessageEvaluateRequestData from '~/src/server/interfaces/message/evaluate/POST/Request';
import MessageEvaluateResponseData from '~/src/server/interfaces/message/evaluate/POST/Response';
import { GenerateButton } from '../../domain/GenerateButton/template';
import { BaseTemplate } from '../../template/BaseTemplate';
import { Mode } from '../../template/ModeSelect';
import { BaseTextarea } from '../../base/BaseTextarea';
import * as Slider from '@radix-ui/react-slider';
import BaseForm from '../../base/BaseForm';
import ThreeDotsLoader from '../../domain/ThreeDotsLoader';
import { copyUrl } from '../../utils/CopyUrl';
import { copyText } from '../../utils/copyText';
import { PopupButton } from '../../template/PopupButton';
import BaseButton from '../../base/BaseButton';
import { useScrollToElement } from '~/src/hooks/useScrollToElement';

const modeList: Mode[] = ['evaluate', 'translate'];

export const RootPage: NextPage = () => {
  const [evaluatedMessageValue, setEvaluatedMessageValue] = useState<string>('');
  const [messageFormValue, setMessageFormValue] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<Mode>(modeList[0]);
  const [casualValue, setCasualValue] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');
  const evaluateResultScroll = useScrollToElement<HTMLParagraphElement>();
  const generatedResultScroll = useScrollToElement<HTMLButtonElement>();

  const prompt = `
                   # 命令: 
                   次の文章をビジネスの場で使う想定でもう少しカジュアルに変換してください。

                   # 条件:
                   ・最大限に格式の高いビジネスの場のフォーマル度を100%、一般的な企業の緊張感の業務空間のフォーマル度を50%、長年の親友と話すようなとてもリラックスした空間のフォーマル度を0%として、フォーマル度${casualValue}%の場を想定してください。
                   ・フォーマル度が100%に近いほどカジュアルな言葉を省き、敬語を使った文章を生成してください。
                   ・フォーマル度が0%に近いほど敬語を省き、友達と話す時のようなカジュアルな文章を生成してください。
                   ・もし与えられたフォーマル度が100%なら、入力文を全て敬語に変換して出力してください。
                   ・もし与えられたフォーマル度が0%なら、入力文を全て友達と話すようなタメ口に変換して出力してください。
                   ・出力する文章の中で、制約条件内の「フォーマル度」に関しては触れないでください。
                   ・入力文に記述されていないことは出力文には入れないでください。

                   # 入力文:
                   ${messageFormValue}
                   `;

  // streamでメッセージを変換するハンドラ
  const generateMessageHandler = async () => {
    setGeneratedMessage('');
    setLoading(true);
    const response = await fetch('/api/message/stream/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log('Edge function returned.');

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedMessage((prev) => prev + chunkValue);
    }

    generatedResultScroll.scrollToElement();
    setLoading(false);
  };

  const {
    responseData: evaluateValue,
    isLording: isEvaluatingMessage,
    postApi: postEvaluatedMessage,
  } = usePostApi<MessageEvaluateResponseData, MessageEvaluateRequestData>('/api/message/evaluate');

  const evaluatedBody: MessageEvaluateRequestData = {
    message: evaluatedMessageValue,
  };

  const messageEvaluatedHandler = async () => {
    const res = await postEvaluatedMessage(evaluatedBody);
    if (res?.casualValue) {
      setCasualValue(res.casualValue);
    }
    setTimeout(() => evaluateResultScroll.scrollToElement(), 3000);
    return;
  };

  const casualValueHandler = (e: string) => {
    if (!Number.isNaN(Number(e)) && Number(e) <= 100 && Number(e) >= 0) {
      setCasualValue(Number(e));
    }
  };

  return (
    <div className='flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen'>
      <header className='grid grid-cols-3 items-center px-[20px] w-full h-[70px] text-red-400 font-bold border-b-2 border-red-200'>
        <div className='mr-auto'>
          <h1 className='text-[34px]'>ChatMaster</h1>
        </div>
        <div className='mx-auto'>
          <h2 className='text-[30px]'>{currentMode === 'evaluate' ? '評価モード' : '生成モード'}</h2>
        </div>
        <div
          className='ml-auto pr-[10px] cursor-pointer text-[17px] hover:text-red-600 hover:text-[19px] duration-100'
          onClick={() => copyUrl({ url: 'https://chat-master-app.vercel.app/', text: 'サイトのURLをコピーしました' })}
        >
          サイトをシェア↗︎
        </div>
      </header>
      <div className='pt-[20px]'>
        <h1 className='text-[40px] font-extrabold my-[20px]'>
          <span className='text-[60px] text-green-700 font-bold'>ChatGPT </span>があなたのメッセージを
          <br />
          より良いものに変換します
        </h1>
      </div>

      <BaseTemplate>
        {currentMode === 'evaluate' && (
          <>
            <div className='max-w-xl w-full'>
              <div className='flex w-full items-center my-[15px]'>
                <div className='text-[30px] text-red-400 font-bold mb-3'>使い方</div>
              </div>
              <div className='flex w-full items-center my-[15px]'>
                <div className='flex items-center justify-center w-[30px] h-[30px] mx-2 bg-red-400 rounded-full text-white'>
                  1
                </div>
                <div className='text-[22px] text-gray-900'>受信したメッセージのカジュアル度を評価</div>
              </div>

              <BaseTextarea
                className='w-full h-[160px] rounded-md border-red-300 shadow-sm focus:border-black focus:ring-black my-3'
                onChange={(e) => setEvaluatedMessageValue(e.target.value)}
                value={evaluatedMessageValue}
                placeholder='カジュアル度を判定したいメッセージをここに入力してください'
              />
              <GenerateButton
                type='button'
                className='w-full h-[40px] rounded-full bg-red-400 text-white font-bold text-[20px] mb-14 hover:bg-red-500'
                onClick={() => messageEvaluatedHandler()}
              >
                {!isEvaluatingMessage ? <p>評価</p> : <ThreeDotsLoader />}
              </GenerateButton>

              {!isEvaluatingMessage && evaluateValue && (
                <h2 className='my-10 text-[20px]'>
                  この文章のフォーマル度は
                  <span className='text-[40px] font-bold px-1'>{evaluateValue.casualValue}%</span>
                  です
                </h2>
              )}
              <div className='flex w-full items-center my-[10px]'>
                <div className='flex items-center justify-center w-[30px] h-[30px] mx-2 bg-red-400 rounded-full text-white'>
                  2
                </div>
                <div className='text-[22px] text-gray-900'>
                  送信したいメッセージのカジュアル度を
                  <span onClick={() => setCurrentMode('translate')} className='text-gray-400 hover:text-red-400'>
                    変換
                  </span>
                </div>
              </div>
              <div className='mt-[30px]'>
                <GenerateButton
                  type='button'
                  className='mx-auto mb-4 w-3/5 h-[40px] rounded-full border border-red-300 bg-white text-red-600 font-bold text-[20px] hover:bg-red-400 hover:text-white '
                  onClick={() => setCurrentMode('translate')}
                >
                  生成モードに移動
                </GenerateButton>
              </div>
            </div>
            {!isEvaluatingMessage && evaluateValue && (
              <p ref={evaluateResultScroll.scrollElementRef}>この文章のフォーマル度は{evaluateValue.casualValue}です</p>
            )}
          </>
        )}

        {currentMode === 'translate' && (
          <>
            <div className='max-w-xl w-full'>
              <div className='flex w-full items-center my-[15px]'>
                <div className='flex items-center justify-center w-[30px] h-[30px] mx-2 bg-red-400 rounded-full text-white'>
                  1
                </div>
                <div className='text-[22px] text-gray-700'>送信するメッセージを入力</div>
              </div>
              {evaluatedMessageValue && (
                <>
                  <p className='mb-2 text-gray-500'>受信したメッセージ</p>
                  <div className='flex mb-4'>
                    <div className='w-[40px] min-w-[40px] h-[40px] rounded-full bg-gray-200'></div>

                    <button>
                      <div className='mx-[10px] py-[10px] px-[20px] rounded-tr-xl rounded-b-xl bg-slate-200 text-light hover:bg-slate-300 '>
                        <div>{evaluatedMessageValue}</div>
                      </div>
                    </button>
                  </div>
                </>
              )}
              <p className='my-2 text-gray-500'>送信するメッセージ</p>
              <BaseTextarea
                className='w-full h-[160px] rounded-md border-red-300 shadow-sm focus:border-black focus:ring-black mt-5 mb-12'
                onChange={(e) => setMessageFormValue(e.target.value)}
                value={messageFormValue}
                placeholder='カジュアル度を変換したいメッセージをここに入力してください'
              />

              <div className='flex w-full items-center my-[15px]'>
                <div className='flex items-center justify-center w-[30px] h-[30px] mx-2 bg-red-400 rounded-full text-white'>
                  2
                </div>
                <div className='text-[22px] text-gray-700'>変換したいフォーマル度を設定</div>
              </div>
              <div className='flex items-center justify-between gap-4 my-[30px] px-20'>
                <label htmlFor='casualValue' className='whitespace-nowrap'>
                  フォーマル度
                </label>
                <div>
                  <div className='flex justify-between text-[8px]'>
                    <p>0%</p>
                    <p>100%</p>
                  </div>
                  <Slider.Root
                    className='relative flex items-center w-[200px] h-[20px] text-[40px]'
                    value={[casualValue]}
                    onValueChange={(e) => setCasualValue(e[0])}
                    max={100}
                    step={1}
                  >
                    <Slider.Track className='relative flex-grow rounded-full h-[5px] bg-black'>
                      <Slider.Range className='absolute bg-blue-500 rounded-full h-full' />
                    </Slider.Track>
                    <Slider.Thumb className='block w-[20px] h-[20px] bg-blue-500 rounded-[10px] hover:bg-blue-600 focus:shadow-md' />
                  </Slider.Root>
                </div>
                <BaseForm
                  type='number'
                  id='casualValue'
                  onChange={casualValueHandler}
                  value={String(casualValue)}
                  className='h-[50px] w-[100px] p-2 border-2 rounded-md border-gray-300'
                />
              </div>
              <GenerateButton
                className='w-full h-[40px] rounded-full bg-red-400 text-white font-bold text-[20px] mb-10'
                type='button'
                onClick={() => generateMessageHandler()}
              >
                {!loading ? '生成' : <ThreeDotsLoader />}
              </GenerateButton>
              {generatedMessage && (
                <>
                  <div className='flex flex-col items-center justify-center max-w-xl mx-auto mb-10 py-4'>
                    {generatedMessage
                      .substring(generatedMessage.indexOf('1'))
                      .split('2.')
                      .map((generatedText) => {
                        return (
                          <button
                            key={generatedText}
                            className='bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border'
                            onClick={() => {
                              copyText(generatedText);
                            }}
                            ref={generatedResultScroll.scrollElementRef}
                          >
                            <p>{generatedText}</p>
                          </button>
                        );
                      })}
                  </div>
                </>
              )}
              <div className='mt-[30px]'>
                <GenerateButton
                  type='button'
                  className='mx-auto mb-4 w-3/5 h-[40px] rounded-full border border-red-300 bg-white text-red-600 font-bold text-[20px] hover:bg-red-400 hover:text-white '
                  onClick={() => setCurrentMode('evaluate')}
                >
                  評価モードに移動
                </GenerateButton>
              </div>
            </div>
          </>
        )}
      </BaseTemplate>
    </div>
  );
};
