// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const pd = require("paralleldots");

// Be sure to set your API key
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    pd.sentiment('Team performed well overall.', 'en').then((sentiment) => {
      res.status(200).send(JSON.parse(sentiment))
    }).catch(err => {
      res.status(400).send(err)
    })
  }
};


