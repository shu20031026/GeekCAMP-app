import type { NextApiRequest, NextApiResponse } from 'next';
import { MessageEvaluateRequestDataScheme } from '~/src/server/interfaces/message/evaluate/POST/Request';
import { MessageEvaluateResponseDataScheme } from '~/src/server/interfaces/message/evaluate/POST/Response';
import { GenerateMessageEvaluate } from '~/src/server/libs/ai/messageEvaluate';

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
  const data = MessageEvaluateRequestDataScheme.parse(req.body);
  const fetchData = await GenerateMessageEvaluate(data.message);
  const result = MessageEvaluateResponseDataScheme.parse({ casualValue: fetchData });
  res.status(200).json(result);
}
