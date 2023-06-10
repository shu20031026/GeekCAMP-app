import type { NextApiRequest, NextApiResponse } from 'next';
import { HelloRequestDataScheme, HelloRequestDataValidate } from '~/src/server/interfaces/hello/POST/Request';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      GET(req, res);
      return;

    case 'POST':
      await POST(req, res);
      return;

    default:
      res.status(404).end(null);
  }
}

function GET(req: NextApiRequest, res: NextApiResponse) {
  const text = `Hello`;
  res.status(200).json({ text });
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const data = HelloRequestDataScheme.parse(req.body);
  HelloRequestDataValidate(data);
  const text = `Hello ${data.name}`;
  res.status(200).json({ text });
}
