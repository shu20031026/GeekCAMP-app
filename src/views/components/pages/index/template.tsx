import { NextPage } from 'next';
import { useState } from 'react';
import { usePostApi } from '~/src/hooks/usePostApi';
import MessageEvaluateRequestData from '~/src/server/interfaces/message/evaluate/POST/Request';
import MessageEvaluateResponseData from '~/src/server/interfaces/message/evaluate/POST/Response';
import MessageTranslateRequestData from '~/src/server/interfaces/message/translate/POST/Request';
import MessageTranslateResponseData from '~/src/server/interfaces/message/translate/POST/Response';
import BaseButton from '../../base/BaseButton';
import BaseForm from '../../base/BaseForm';
import { GenerateButton } from '../../domain/GenerateButton/template';
import MessageForm from '../../domain/MessageForm';
import { BaseTemplate } from '../../template/BaseTemplate';

const CASUAL_VALUE = 70;

export const RootPage: NextPage = () => {
  const [evaluatedMessageValue, setEvaluatedMessageValue] = useState<string>('');
  const [messageFormValue, setMessageFormValue] = useState<string>('');

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
      <div>
        <div>{evaluatedMessageValue}</div>
        <MessageForm onChange={(e) => setEvaluatedMessageValue(e)} />
        <GenerateButton type='button' onClick={() => messageEvaluatedHandler()}>
          評価
        </GenerateButton>
        {isEvaluatingMessage && <p>lording...</p>}
        {!isEvaluatingMessage && evaluateValue && <p>{evaluateValue.casualValue}</p>}
      </div>
      <div>
        <div>{messageFormValue}</div>
        <MessageForm onChange={(e) => setMessageFormValue(e)} />
        <GenerateButton type='button' onClick={() => messageGeneratingHandler()}>
          生成
        </GenerateButton>
        {isGeneratingMessage && <p>lording...</p>}
        {!isGeneratingMessage && generatedMessage && <p>{generatedMessage.message}</p>}
      </div>
    </BaseTemplate>
  );
};
