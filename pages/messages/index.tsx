import React, { useState } from "react";
import Head from "next/head";
import DatePicker from "react-datepicker";
import axios from "axios";
import { IMessage, IKeyword } from "../../types/types";
import { LineChart, CalendarChart, PieChart } from "../../components";
import DATA from "../../mockData/result.json";
import transformLineData from "../../helpers/lineGraph/transformData";
import transformCalendarData from "../../helpers/calendarGraph/transformData";
import { getChatsFromDate, extractMessageText } from "../../helpers/helpers";
import { useIsSm } from "../../helpers/helpers";
import { useRouter } from "next/router";
import Button from "@/ui/Button";
import Modal from "@/ui/Modal";
import "react-datepicker/dist/react-datepicker.css";

const dateToString = (date: Date) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return `${days[date.getDay()]} ${
    months[date.getMonth()]
  } ${date.getDate()} ${date.getFullYear()}`;
};

const Message = ({ message, name }: { message: IMessage; name: String }) => {
  const dateObj = new Date(message.date);
  const messageText = extractMessageText(message);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  const strTime = hours + ":" + minutes + " " + ampm;
  const alignment = message.from === name ? "self-end" : "";
  const borderColor =
    message.from === name ? "border-[#0088cc]" : "border-black";
  const boxStyles = `${borderColor} mb-5 border rounded p-4 inline-block`;

  return (
    <div className={alignment}>
      <div className={boxStyles}>
        <div className="flex items-center mb-1">
          <span>{message.from}</span>
          <div
            className="h-1 w-1 bg-black m-1"
            style={{ borderRadius: "50%" }}
          ></div>
          <span className="text-gray-300">{dateToString(dateObj)}</span>
        </div>
        <div className="mb-1">{messageText}</div>
        <div className="float-right text-gray-300">{strTime}</div>
      </div>
    </div>
  );
};

const Messages = () => {
  // Graph information
  const firstMessageDate = DATA.messages[0].date;
  const lastMessageDate = DATA.messages[DATA.messages.length - 1].date;
  const [copyData, setCopyData] = useState<any>(DATA);
  const [messagesSelected, setMessagesSelected] = useState<IMessage[]>([]);
  const [startDate, setStartDate] = useState<Date>(new Date(firstMessageDate));
  const [endDate, setEndDate] = useState<Date>(new Date(lastMessageDate));
  const [name, setName] = useState<string>("John Doe");
  let transformedLineData = transformLineData(copyData);
  let transformedCalendarData = transformCalendarData(copyData);

  // Show/display conditionals
  const [showSentiment, setShowSentiment] = useState({
    visible: false,
    value: {},
  });
  const [showSentimentCard, setShowSentimentCard] = useState<boolean>(true);
  const [showKeyword, setShowKeyword] = useState<{
    visible: boolean;
    value: { keywords: IKeyword[] };
  }>({ visible: false, value: { keywords: [] } });
  const [showCalendar, setShowCalendar] = useState(true);
  const [showModal, setShowModal] = useState(false);

  // Media query hook
  const isSm = useIsSm();

  // Router
  const router = useRouter();

  // Graph selection divs
  const graphSelectionClassname1 = `h-2 w-10 ${
    showCalendar ? "bg-[#0088cc]" : "bg-gray-300"
  } m-1 cursor-pointer transition duration-200 ease-in`;
  const graphSelectionClassname2 = `h-2 w-10 ${
    !showCalendar ? "bg-[#0088cc]" : "bg-gray-300"
  } m-1 cursor-pointer transition duration-200 ease-in`;

  /** Fetch a classification data for a certain day when messages selected */
  const fetchData = (endpoint: string, messagesSelected: any) => {
    const concatText = messagesSelected
      .map((message: any) => extractMessageText(message))
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

  const graphClickHandler = (DATA: any, date: Date) => {
    const messagesSelected = getChatsFromDate(DATA, date);
    setMessagesSelected(messagesSelected);
    fetchData("sentiment", messagesSelected);
    fetchData("keyword", messagesSelected);
  };

  return (
    <>
      <Head>
        <title>Telehistory V2 - Messages</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>

      {/* Hero Navbar */}
      <div className="flex items-center justify-between fixed w-full p-4 z-10 bg-[#0088cc]">
        <div
          className="flex cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          <div className="title-heavy text-white">Telehistory V2</div>
        </div>
        <div className="flex items-center text-white">
          <p className="mr-2">Telegram Name:</p>
          <input
            className="rounded-md px-2 focus:outline-none text-black"
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder={name}
          />
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-16 md:px-32 sm:py-16 flex flex-col">
        <div className="mt-4 mb-2">
          <p className="text-3xl border-2 border-t-0 border-r-0 border-l-0 border-[#0088cc] inline-block">
            Message Frequency
          </p>
        </div>
        {/* Date Picker */}
        <div className="flex items-center">
          <p className="mr-5">Select Dates:</p>
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
          <Button className=" bg-white" onClickButton={updateDates}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#0088CC"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Button>
        </div>

        {/* Line + Calendar Charts */}
        <div className="h-96">
          {showCalendar ? (
            <LineChart
              data={transformedLineData}
              onClick={(point, _event) => graphClickHandler(DATA, point.data.x)}
              increments={isSm ? 20 : 5}
            />
          ) : (
            <CalendarChart
              data={transformedCalendarData}
              startDate={firstMessageDate.split("T")[0]}
              endDate={lastMessageDate.split("T")[0]}
              onClick={(day, _event) =>
                graphClickHandler(DATA, new Date(day.date))
              }
            />
          )}
        </div>
        {/* Bar selectors */}
        <div className="self-center flex items-center">
          <div
            className={graphSelectionClassname1}
            onClick={() => setShowCalendar(true)}
          ></div>
          <div
            className={graphSelectionClassname2}
            onClick={() => setShowCalendar(false)}
          ></div>
        </div>

        {/* Messages from a date */}
        {messagesSelected.length > 0 ? (
          <div className="flex flex-wrap mt-10 justify-center">
            {/* Messages */}
            <div className="w-full md:w-[45%] flex-grow mx-6 border-2 rounded-md p-4">
              <div className="mb-3 flex justify-between items-baseline">
                <p className="text-2xl border-2 border-t-0 border-r-0 border-l-0 border-[#0088cc] inline-block">
                  {`Messages from ${dateToString(
                    new Date(messagesSelected[0].date)
                  )}`}
                </p>
                {!showSentimentCard && (
                  <p
                    className="color-brand cursor-pointer hover:border-2 hover:border-t-0 hover:border-r-0 hover:border-l-0 hover:border-[#0088cc]"
                    onClick={() => setShowSentimentCard(true)}
                  >
                    Show sentiment
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <p className="mb-1">Keywords</p>
                <div className="overflow-auto whitespace-nowrap no-scrollbar mb-3">
                  {showKeyword.visible ? (
                    showKeyword.value.keywords.length > 0 ? (
                      showKeyword.value.keywords.map((keyword, i) => {
                        return (
                          <div
                            key={i}
                            className="inline-block mx-2 px-2 py-1 rounded-xl border cursor-default"
                          >
                            <p>{keyword.keyword}</p>
                          </div>
                        );
                      })
                    ) : (
                      <div>No keywords found</div>
                    )
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
                {messagesSelected.map((message: IMessage, i: number) => (
                  <Message key={i} message={message} name={name} />
                ))}
              </div>
            </div>
            {/* Sentiment + Keywords */}
            <div
              className="w-full mt-10 lg:mt-0 md:w-[45%] mx-6 border-2 rounded-md p-4 "
              style={
                !showSentimentCard ? { display: "none" } : { display: "block" }
              }
            >
              <div className="flex justify-between items-baseline">
                <p className="text-2xl border-2 border-t-0 border-r-0 border-l-0 border-[#0088cc] inline-block">
                  Sentiment Analysis
                </p>
                <p
                  className="color-brand cursor-pointer hover:border-2 hover:border-t-0 hover:border-r-0 hover:border-l-0 hover:border-[#0088cc]"
                  onClick={() => setShowSentimentCard(false)}
                >
                  Hide
                </p>
              </div>
              {showSentiment.visible ? (
                <div className="h-96">
                  <PieChart data={showSentiment.value} />
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </div>
          </div>
        ) : (
          <Button
            onClickButton={() => setShowModal(true)}
            className="mt-10 self-center"
          >
            <p className="title-light self-center m-2">
              Click on a specific date!
            </p>
          </Button>
        )}
      </div>

      {/* Modal */}
      {showModal ? (
        <Modal
          header="How to select a date"
          body={<img src="/demo.gif" alt="select-date-demo" />}
          setModal={setShowModal}
        />
      ) : null}
    </>
  );
};

export default Messages;
