import Head from "next/head";
import axios from "axios";
import transformData from "../helpers/lineGraph/transformData";
import getChatsFromDate from "../helpers/getChatsFromDate";
import DATA from "../mockData/result.json";
import { LineChart } from "../components";
import { useState } from "react";
import { IMessage } from "../types/types";

const Message = ({ message }: { message: IMessage }) => {
  const dateString = new Date(message.date).toString();
  let messageText: string;
  if (message.photo || message.file || message.thumbnail) {
    messageText = "(Non-text message)";
  } else {
    if (message.text.constructor === Array) {
      messageText = message.text[0].text;
    } else {
      messageText = message.text as string;
    }
  }

  return (
    <div className="mb-5">
      <div className="flex">
        {dateString} {message.from}
      </div>
      {messageText}
    </div>
  );
};

export default function Home() {
  // const testRoute = (e: React.MouseEvent<HTMLElement>) => {
  //   e.preventDefault();
  //   axios
  //     .get("/api/sentiment")
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // };

  const [messagesSelected, setMessagesSelected] = useState<IMessage[]>([]);

  const keywordsRoute = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    axios
      .post("/api/keyword", {
        textArray: messagesSelected.map((message) => {
          if (typeof message.text === "string") {
            return message.text;
          }
        }),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="px-32 py-16">
      <Head>
        <title>Telehistory V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-3xl">Telehistory V2</div>
      {/* <button onClick={(e) => testRoute(e)}>Sentiment</button> */}
      <button onClick={(e) => keywordsRoute(e)}>Keyword</button>
      <div className="h-96">
        <LineChart
          data={transformData(DATA)}
          onClick={(point, _event) =>
            setMessagesSelected(getChatsFromDate(DATA, point.data.x))
          }
        />
      </div>
      <div className="text-2xl mb-5">
        {messagesSelected.length > 0 &&
          `Messages selected from ${new Date(
            messagesSelected[0].date
          ).toString()}`}
      </div>
      {messagesSelected.length > 0 &&
        messagesSelected.map((message: IMessage, i: number) => (
          <Message key={i} message={message} />
        ))}
    </div>
  );
}
