// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import keywordRes from "../../mockData/keywordRes";

const pd = require("paralleldots");

// Be sure to set your API key
pd.apiKey = process.env.PARALLEL_DOTS_API_KEY;
const ENV = process.env.ENV;

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (ENV === "DEV") {
      res.status(200).send(keywordRes);
    } else if (ENV === "PROD") {
      pd.keywords(req.body.text)
        .then((keywords: any) => {
          res.status(200).send(JSON.parse(keywords));
        })
        .catch((err: any) => {
          res.status(400).send(err);
        });
    }
  }
};
