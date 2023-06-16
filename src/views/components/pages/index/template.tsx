import { NextPage } from 'next';
import { useState } from 'react';
import { usePostApi } from '~/src/hooks/usePostApi';
import MessageEvaluateRequestData from '~/src/server/interfaces/message/evaluate/POST/Request';
import MessageEvaluateResponseData from '~/src/server/interfaces/message/evaluate/POST/Response';
import { GenerateButton } from '../../domain/GenerateButton/template';
import { BaseTemplate } from '../../template/BaseTemplate';
import { Mode, ModeSelect } from '../../template/ModeSelect';
import { BaseTextarea } from '../../base/BaseTextarea';
import * as Slider from '@radix-ui/react-slider';
import BaseForm from '../../base/BaseForm';
import ThreeDotsLoader from '../../domain/ThreeDotsLoader';
import { copyUrl } from '../../utils/CopyUrl';
import { CopyOrPasteButton } from '../../domain/CopyOrPasteButton';
import { copyText } from '../../utils/copyText';
import { PopupButton } from '../../template/PopupButton';
import { pasteText } from '../../utils/pasteText';

const modeList: Mode[] = ['evaluate', 'translate'];

export const RootPage: NextPage = () => {
  const [evaluatedMessageValue, setEvaluatedMessageValue] = useState<string>('');
  const [messageFormValue, setMessageFormValue] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<Mode>(modeList[0]);
  const [casualValue, setCasualValue] = useState<number>(50);
  const [loading, setLoading] = useState<boolean>(false);
  const [generatedMessage, setGeneratedMessage] = useState<string>('');

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
    await postEvaluatedMessage(evaluatedBody);
    return;
  };

  const casualValueHandler = (e: string) => {
    if (!Number.isNaN(Number(e)) && Number(e) <= 100 && Number(e) >= 0) {
      setCasualValue(Number(e));
    }
  };

  return (
    <>
      <header className='flex items-center justify-center px-[20px] w-full h-[70px] text-gray-600 font-bold'>
        <h1 className='mr-auto text-[34px]'>
          ChatMaster（
          {currentMode === 'evaluate' && '評価モード'}
          {currentMode === 'translate' && '生成モード'}）
        </h1>
        <div
          className='ml-auto pr-[10px] cursor-pointer text-[17px] hover:text-blue-400 hover:text-[19px] duration-100'
          onClick={() => copyUrl({ url: 'https://geek-camp-app.vercel.app/', text: 'サイトのURLをコピーしました' })}
        >
          サイトをシェア↗︎
        </div>
      </header>

      <BaseTemplate>
        <ModeSelect currentMode={currentMode} setCurrentMode={setCurrentMode} modeList={modeList}>
          モードを変更する
        </ModeSelect>
        {currentMode === 'evaluate' && (
          <div className='space-y-[8px] flex items-center justify-center flex-col'>
            <div>{evaluatedMessageValue}</div>
            <div className='w-full'>
              <BaseTextarea
                className='h-[160px]'
                onChange={(e) => setEvaluatedMessageValue(e.target.value)}
                value={evaluatedMessageValue}
              />
            </div>
            <GenerateButton type='button' onClick={() => messageEvaluatedHandler()}>
              評価
            </GenerateButton>
            {isEvaluatingMessage && <ThreeDotsLoader />}
            {!isEvaluatingMessage && evaluateValue && <p>この文章のフォーマル度は{evaluateValue.casualValue}です</p>}
          </div>
        )}
        {currentMode === 'translate' && (
          <div className='space-y-[8px] flex items-center justify-center flex-col'>
            <div>{messageFormValue}</div>
            <div className='w-full'>
              <BaseTextarea
                className='h-[160px]'
                onChange={(e) => setMessageFormValue(e.target.value)}
                value={messageFormValue}
              />
            </div>
            <div className='flex space-x-[8px]'>
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
            <GenerateButton type='button' onClick={() => generateMessageHandler()}>
              生成
            </GenerateButton>

            {loading && <ThreeDotsLoader />}
            {generatedMessage && (
              <>
                <div className='space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto'>
                  {generatedMessage
                    .substring(generatedMessage.indexOf('1'))
                    .split('2.')
                    .map((generatedBio) => {
                      return (
                        <PopupButton popupMessage='copied!' key={generatedBio}>
                          <button
                            className='bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border'
                            onClick={() => {
                              () => copyText(evaluatedMessageValue);
                            }}
                          >
                            <p>{generatedBio}</p>
                          </button>
                        </PopupButton>
                      );
                    })}
                </div>
              </>
            )}
          </div>
        )}
      </BaseTemplate>
    </>
  );
};
