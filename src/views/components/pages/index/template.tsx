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

  const prompt = `次の文章をビジネスの場で使う想定でもう少しカジュアルに変換してください。 条件:最大限フォーマルな場合を100%として${casualValue}程度で。「${messageFormValue}」`;

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
      evaluateResultScroll.scrollToElement();
    }
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
      <div className='mt-[30px]'>
        {currentMode === 'evaluate' ? (
          <BaseButton
            type='button'
            onClick={() => setCurrentMode('translate')}
            className='flex max-w-fit items-center justify-center space-x-2 rounded-full border border-red-300 bg-white px-4 py-2 text-sm text-red-600 shadow-md transition-colors hover:bg-red-400 hover:text-white  mb-5'
          >
            生成モードに変更
          </BaseButton>
        ) : (
          <BaseButton
            type='button'
            onClick={() => setCurrentMode('evaluate')}
            className='flex max-w-fit items-center justify-center space-x-2 rounded-full border border-red-300 bg-white px-4 py-2 text-sm text-red-600 shadow-md transition-colors hover:bg-red-400 hover:text-white  mb-5'
          >
            評価モードに変更
          </BaseButton>
        )}
      </div>
      <div>
        <h1 className='text-[40px] font-extrabold mb-[20px]'>
          <span className='text-[60px] text-green-700 font-bold'>ChatGPT </span>があなたのメッセージを
          <br />
          より良いものに変換します
        </h1>
        <div className='max-w-xl w-full'>
          <div className='flex w-full items-center my-[15px]'>
            <div className='flex items-center justify-center w-[30px] h-[30px] mx-2 bg-red-400 rounded-full text-white'>
              1
            </div>
            <div className='text-[22px] text-gray-700'>評価モードで会話のフォーマル度をチェック</div>
          </div>
          <div className='flex items-center w-full  my-[15px] '>
            <div className='flex items-center justify-center w-[30px] h-[30px] mx-2 bg-red-400 rounded-full text-white'>
              2
            </div>
            <p className='text-[22px] text-gray-700'>生成モードでメッセージを任意のフォーマル度に変換</p>
          </div>
        </div>
      </div>

      <BaseTemplate>
        {currentMode === 'evaluate' && (
          <>
            <div className='max-w-xl w-full'>
              <BaseTextarea
                className='w-full h-[160px] rounded-md border-red-300 shadow-sm focus:border-black focus:ring-black my-5'
                onChange={(e) => setEvaluatedMessageValue(e.target.value)}
                value={evaluatedMessageValue}
              />

              <GenerateButton
                type='button'
                className='w-full h-[40px] rounded-full bg-red-400 text-white font-bold text-[20px]'
                onClick={() => messageEvaluatedHandler()}
              >
                {!isEvaluatingMessage ? <p>評価</p> : <ThreeDotsLoader />}
              </GenerateButton>
            </div>
            {!isEvaluatingMessage && evaluateValue && (
              <p ref={evaluateResultScroll.scrollElementRef}>この文章のフォーマル度は{evaluateValue.casualValue}です</p>
            )}
          </>
        )}

        {currentMode === 'translate' && (
          <>
            <div className='max-w-xl w-full'>
              <BaseTextarea
                className='w-full h-[160px] rounded-md border-red-300 shadow-sm focus:border-black focus:ring-black my-5'
                onChange={(e) => setMessageFormValue(e.target.value)}
                value={messageFormValue}
              />
              <div className='flex flex-col items-center gap-2 mb-5'>
                <label htmlFor='casualValue' className='whitespace-nowrap'>
                  フォーマル度
                </label>
                <BaseForm
                  id='casualValue'
                  onChange={casualValueHandler}
                  value={String(casualValue)}
                  className='w-[64px] border-2 border-gray-300'
                />
                <Slider.Root
                  className='relative flex items-center w-[200px] h-[20px]'
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
              <GenerateButton
                className='w-full h-[40px] rounded-full bg-red-400 text-white font-bold text-[20px]'
                type='button'
                onClick={() => generateMessageHandler()}
              >
                {!loading ? '生成' : <ThreeDotsLoader />}
              </GenerateButton>
            </div>

            {generatedMessage && (
              <>
                <div className='flex flex-col items-center justify-center max-w-xl mx-auto mb-10'>
                  <h2 className='my-[40px] text-[30px] font-bold text-red-800'>次のメッセージはいかがでしょうか？</h2>
                  {generatedMessage
                    .substring(generatedMessage.indexOf('1'))
                    .split('2.')
                    .map((generatedText) => {
                      return (
                        <PopupButton popupMessage='copied!' key={generatedText}>
                          <button
                            className='bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border'
                            onClick={() => {
                              copyText(generatedText);
                            }}
                            ref={generatedResultScroll.scrollElementRef}
                          >
                            <p>{generatedText}</p>
                          </button>
                        </PopupButton>
                      );
                    })}
                </div>
              </>
            )}
          </>
        )}
      </BaseTemplate>
    </div>
  );
};
