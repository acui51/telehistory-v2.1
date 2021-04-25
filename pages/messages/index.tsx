import React, { useState } from "react";
import Head from "next/head";
import DatePicker from "react-datepicker";
import axios from "axios";
import { IMessage } from "../../types/types";
import {
  LineChart,
  CalendarChart,
  PieChart,
  BubbleChart,
} from "../../components";
import DATA from "../../mockData/result.json";
import transformLineData from "../../helpers/lineGraph/transformData";
import transformCalendarData from "../../helpers/calendarGraph/transformData";
import { getChatsFromDate, extractMessageText } from "../../helpers/helpers";
import "react-datepicker/dist/react-datepicker.css";

const Message = ({ message }: { message: IMessage }) => {
  const dateString = new Date(message.date).toString();
  const messageText = extractMessageText(message);

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
  const [showSentiment, setShowSentiment] = useState({
    visible: false,
    value: {},
  });
  const [showKeyword, setShowKeyword] = useState({ visible: false, value: {} });
  let transformedLineData = transformLineData(copyData);
  let transformedCalendarData = transformCalendarData(copyData);

  /** Fetch a classification data for a certain day when messages selected */
  const fetchData = (endpoint: string) => {
    const concatText = messagesSelected
      .map((message) => extractMessageText(message))
      .join(". ");

    axios
      .post(`/api/${endpoint}`, { text: concatText })
      .then((res) => {
        endpoint === "sentiment"
          ? setShowSentiment({ visible: true, value: res.data })
          : setShowKeyword({ visible: true, value: res.data });
      })
      .catch((err) => console.log(err));
  };

  // Update dates from DatePicker
  const updateDates = () => {
    const newMessages = DATA.messages.filter((message: any) => {
      const messageDate = new Date(message.date);
      if (
        messageDate.getTime() >= startDate.getTime() &&
        messageDate.getTime() <= endDate.getTime()
      ) {
        return message;
      }
    });

    setCopyData({
      ...DATA,
      messages: newMessages,
    });
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
        startDate={new Date(firstMessageDate)}
        endDate={new Date(lastMessageDate)}
      />
      <DatePicker
        selected={endDate}
        selectsEnd
        startDate={new Date(firstMessageDate)}
        endDate={new Date(lastMessageDate)}
        minDate={new Date(firstMessageDate)}
        onChange={(date: Date) => setEndDate(date)} // end Date
      />
      <button onClick={updateDates}>Go</button>

      {/* Line Chart */}
      <div className="h-96">
        <LineChart
          data={transformedLineData}
          onClick={(point, _event) =>
            setMessagesSelected(getChatsFromDate(DATA, point.data.x))
          }
        />
      </div>
      <div className="h-96">
        <CalendarChart
          data={transformedCalendarData}
          startDate={firstMessageDate.split("T")[0]}
          endDate={lastMessageDate.split("T")[0]}
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
          <button onClick={() => fetchData("sentiment")}>Sentiment</button>
          <button onClick={() => fetchData("keyword")}>Keywords</button>

          {showKeyword.visible && (
            <div>
              <BubbleChart />
            </div>
          )}
          {showSentiment.visible && (
            <div className="h-96">
              <PieChart data={showSentiment.value} />
            </div>
          )}

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
