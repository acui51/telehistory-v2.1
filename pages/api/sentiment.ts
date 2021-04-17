// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import sentimentRes from "../../mockData/sentimentRes";

const pd = require("paralleldots");

// Be sure to set your API key
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;
const ENV = process.env.ENV;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (ENV === "DEV") {
      res.status(200).send(sentimentRes);
    } else if (ENV === "PROD") {
      pd.sentiment(req.body.text, "en")
        .then((sentiment: any) => {
          res.status(200).send(JSON.parse(sentiment));
        })
        .catch((err: any) => {
          res.status(400).send(err);
        });
    }
  }
};
