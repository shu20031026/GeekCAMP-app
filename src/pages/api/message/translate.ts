import type { NextApiRequest, NextApiResponse } from 'next';
import { MessageTranslateRequestDataScheme } from '~/src/server/interfaces/message/translate/POST/Request';
import { MessageTranslateResponseDataScheme } from '~/src/server/interfaces/message/translate/POST/Response';
import { GenerateMessageTranslate } from '~/src/server/libs/ai/messageTranslate';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      await POST(req, res);
      return;

    default:
      res.status(404).end(null);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = MessageTranslateRequestDataScheme.parse(req.body);
  const fetchData = await GenerateMessageTranslate(data.message, data.casualValue);
  const result = MessageTranslateResponseDataScheme.parse({ message: fetchData });
  res.status(200).json(result);
}
