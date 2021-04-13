import React, { useState, useMemo } from "react";
import Head from "next/head";
import DatePicker from "react-datepicker";
import { IMessage } from "../../types/types";
import { LineChart } from "../../components";
import DATA from "../../mockData/result.json";
import transformData from "../../helpers/lineGraph/transformData";
import getChatsFromDate from "../../helpers/getChatsFromDate";

import "react-datepicker/dist/react-datepicker.css";

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

const Messages = () => {
  const firstMessageDate = DATA.messages[0].date;
  const lastMessageDate = DATA.messages[DATA.messages.length - 1].date;
  const [copyData, setCopyData] = useState<any>(DATA);
  const [messagesSelected, setMessagesSelected] = useState<IMessage[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(firstMessageDate));
  const [endDate, setEndDate] = useState<Date>(new Date(lastMessageDate));
  const transformedData = useMemo(() => transformData(copyData), [copyData]);

  const updateDates = () => {
    const newMessages = copyData.messages.filter((message: IMessage) => {
      const messageDate = new Date(message.date);
      if (
        messageDate.getTime() >= startDate.getTime() &&
        messageDate.getTime() <= endDate.getTime()
      ) {
        return message;
      }
    });

    const newCopyData = {
      ...copyData,
      messages: newMessages,
    };

    setCopyData(newCopyData);
  };

  return (
    <div className="px-32 py-16">
      <Head>
        <title>Telehistory V2 - Messages</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Date Picker */}
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
      />
      <DatePicker
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        onChange={(date: Date) => setEndDate(date)}
      />
      <button onClick={updateDates}>Go</button>

      {/* Line Chart */}
      <div className="h-96">
        <LineChart
          data={transformedData}
          onClick={(point, _event) =>
            setMessagesSelected(getChatsFromDate(DATA, point.data.x))
          }
        />
      </div>

      {/* Messages from a date */}
      {messagesSelected.length > 0 && (
        <>
          <div className="text-2xl mb-5">
            {`Messages selected from ${new Date(
              messagesSelected[0].date
            ).toString()}`}
          </div>
          <div>
            {messagesSelected.map((message: IMessage, i: number) => (
              <Message key={i} message={message} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Messages;
