import { NextPage } from 'next';
import { useState } from 'react';
import { usePostApi } from '~/src/hooks/usePostApi';
import MessageEvaluateRequestData from '~/src/server/interfaces/message/evaluate/POST/Request';
import MessageEvaluateResponseData from '~/src/server/interfaces/message/evaluate/POST/Response';
import MessageTranslateRequestData from '~/src/server/interfaces/message/translate/POST/Request';
import MessageTranslateResponseData from '~/src/server/interfaces/message/translate/POST/Response';
import { FaLongArrowAltDown } from 'react-icons/fa';
import { GenerateButton } from '../../domain/GenerateButton/template';
import MessageForm from '../../domain/MessageForm';
import { BaseTemplate } from '../../template/BaseTemplate';
import { Mode, ModeSelect } from '../../template/ModeSelect';
import { BaseTextarea } from '../../base/BaseTextarea';

const CASUAL_VALUE = 70;

const modeList: Mode[] = ['evaluate', 'translate'];

export const RootPage: NextPage = () => {
  const [evaluatedMessageValue, setEvaluatedMessageValue] = useState<string>('');
  const [messageFormValue, setMessageFormValue] = useState<string>('');
  const [currentMode, setCurrentMode] = useState<Mode>(modeList[0]);

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
      <ModeSelect currentMode={currentMode} setCurrentMode={setCurrentMode} modeList={modeList}>
        モードを変更する
      </ModeSelect>
      {currentMode === 'evaluate' && (
        <div className='space-y-[8px] flex items-center justify-center flex-col'>
          <div>{evaluatedMessageValue}</div>
          <BaseTextarea className='h-[160px]' />
          <GenerateButton type='button' onClick={() => messageEvaluatedHandler()}>
            評価
          </GenerateButton>
          <FaLongArrowAltDown className='w-[24px] h-[24px] text-red-500' />
          {isEvaluatingMessage && <p>loading...</p>}
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
          <BaseTextarea className='h-[160px]' />
          <GenerateButton type='button' onClick={() => messageGeneratingHandler()}>
            生成
          </GenerateButton>
          <FaLongArrowAltDown className='w-[24px] h-[24px] text-red-500' />
          {isGeneratingMessage && <p>loading...</p>}
          {!isGeneratingMessage && generatedMessage ? (
            <p className='border-2 border-gray-300 bg-white'>{generatedMessage.message}</p>
          ) : (
            <p>この文章を?%くらいフォーマルにすると?</p>
          )}
        </div>
      )}
    </BaseTemplate>
  );
};
