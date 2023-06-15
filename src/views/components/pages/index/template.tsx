import { NextPage } from 'next';
import { useState } from 'react';
import { usePostApi } from '~/src/hooks/usePostApi';
import MessageEvaluateRequestData from '~/src/server/interfaces/message/evaluate/POST/Request';
import MessageEvaluateResponseData from '~/src/server/interfaces/message/evaluate/POST/Response';
import MessageTranslateRequestData from '~/src/server/interfaces/message/translate/POST/Request';
import MessageTranslateResponseData from '~/src/server/interfaces/message/translate/POST/Response';
import { FaLongArrowAltDown, FaCheck } from 'react-icons/fa';
import { HiSelector } from 'react-icons/hi';
import { GenerateButton } from '../../domain/GenerateButton/template';
import MessageForm from '../../domain/MessageForm';
import { BaseTemplate } from '../../template/BaseTemplate';
import { Listbox } from '@headlessui/react';
import clsx from 'clsx';

const CASUAL_VALUE = 70;

export type Mode = 'evaluate' | 'translate';

const ModeList: Mode[] = ['evaluate', 'translate'];

export const RootPage: NextPage = () => {
  const [evaluatedMessageValue, setEvaluatedMessageValue] = useState<string>('');
  const [messageFormValue, setMessageFormValue] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<Mode>(ModeList[0]);

  const {
    responseData: evaluateValue,
    isLording: isEvaluatingMessage,
    postApi: postEvaluatedMessage,
  } = usePostApi<MessageEvaluateResponseData, MessageEvaluateRequestData>('/api/message/evaluate');

  const {
    responseData: generatedMessage,
    isLording: isGeneratingMessage,
    postApi: postGeneratedMessage,
  } = usePostApi<MessageTranslateResponseData, MessageTranslateRequestData>('/api/message/translate');

  const evaluatedBody: MessageEvaluateRequestData = {
    message: evaluatedMessageValue,
  };

  const translatedBody: MessageTranslateRequestData = {
    message: messageFormValue,
    casualValue: CASUAL_VALUE,
  };

  const messageEvaluatedHandler = async () => {
    await postEvaluatedMessage(evaluatedBody);
    return;
  };

  const messageGeneratingHandler = async () => {
    await postGeneratedMessage(translatedBody);
    return;
  };

  return (
    <BaseTemplate>
      <Listbox value={currentMode} onChange={setCurrentMode}>
        <Listbox.Button className='flex bg-red-400 text-white w-fit px-[32px] justify-center items-center'>
          <div className='font-bold text-[24px]'>モードを変更する</div>
          <HiSelector className='w-[32px] h-[32px]' />
        </Listbox.Button>
        <Listbox.Options className='absolute w-fit bg-white m-[4px] p-[8px] rounded-[8px]'>
          {ModeList.map((mode, idx) => (
            <Listbox.Option
              key={idx}
              value={mode}
              className={({ active }) =>
                clsx('cursor-pointer px-[8px]', active ? 'bg-red-100 text-red-900' : 'text-gray-900')
              }
            >
              {({ selected }) => (
                <div className='flex items-center justify-center'>
                  {selected && <FaCheck />}
                  <div className={selected ? 'font-medium' : 'font-normal'}>{mode}</div>
                </div>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
      {currentMode === 'evaluate' && (
        <div className='space-y-[8px] flex items-center justify-center flex-col'>
          <div>{evaluatedMessageValue}</div>
          <MessageForm onChange={(e) => setEvaluatedMessageValue(e)} />
          <GenerateButton type='button' onClick={() => messageEvaluatedHandler()}>
            評価
          </GenerateButton>
          <FaLongArrowAltDown className='w-[24px] h-[24px] text-red-500' />
          {isEvaluatingMessage && <p>lording...</p>}
          {!isEvaluatingMessage && evaluateValue ? (
            <p>この文章のフォーマル度は{evaluateValue.casualValue}です</p>
          ) : (
            <p>この文章のフォーマル度は?</p>
          )}
        </div>
      )}
      {currentMode === 'translate' && (
        <div className='space-y-[8px] flex items-center justify-center flex-col'>
          <div>{messageFormValue}</div>
          <MessageForm onChange={(e) => setMessageFormValue(e)} />
          <GenerateButton type='button' onClick={() => messageGeneratingHandler()}>
            生成
          </GenerateButton>
          <FaLongArrowAltDown className='w-[24px] h-[24px] text-red-500' />
          {isGeneratingMessage && <p>lording...</p>}
          {!isGeneratingMessage && generatedMessage ? (
            <p>{generatedMessage.message}</p>
          ) : (
            <p>この文章を?%くらいフォーマルにすると?</p>
          )}
        </div>
      )}
    </BaseTemplate>
  );
};
