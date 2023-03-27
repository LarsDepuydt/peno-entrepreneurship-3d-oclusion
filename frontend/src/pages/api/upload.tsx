import type { NextApiRequest, NextApiResponse } from 'next';
import { parseForm, FormidableError } from '../../components/files/parse-form';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{
    data: {
      url: string;
    } | null;
    error: string | null;
  }>
) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({
      data: null,
      error: 'Method Not Allowed',
    });
    return;
  }

  try {
    const { fields, files } = await parseForm(req);

    console.log({ fields, files });

    res.status(200).json({
      data: {
        url: '/uploaded-file-url',
      },
      error: null,
    });
  } catch (e) {
    if (e instanceof FormidableError) {
      res.status(e.httpCode || 400).json({ data: null, error: e.message });
    } else {
      console.error(e);
      res.status(500).json({ data: null, error: 'Internal Server Error' });
    }
  }

  res.status(200).json({
    data: {
      url: '/uploaded-file-url',
    },
    error: null,
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
