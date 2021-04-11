// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const pd = require("paralleldots");

// Be sure to set your API key
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const textArray = JSON.stringify(req.body.textArray);
    pd.keywordsBatch(textArray)
      .then((keywords: any) => {
        res.status(200).send(JSON.parse(keywords));
      })
      .catch((err: any) => {
        res.status(400).send(err);
      });
  }
};
