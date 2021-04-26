import Head from "next/head";
import Image from "next/Image";
import Button from "@/ui/Button";
import { LineChart, CalendarChart, PieChart } from "@/components/charts";
import lineData from "../mockData/mockHomeLine";
import calendarData from "../mockData/mockHomeCalendar";
import pieData from "../mockData/sentimentRes.js";
import transformLineData from "../helpers/lineGraph/transformData";
import transformCalendarData from "../helpers/calendarGraph/transformData";

export default function Home() {
  return (
    <>
      <Head>
        <title>Telehistory V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Hero Blue Ellipse */}
      <div className="relative">
        <div
          className="bg-brand absolute z-[-1]"
          style={{
            width: "100vw",
            height: "100vw",
            borderRadius: "50%",
            right: "40vw",
            top: "-44vh",
          }}
        ></div>

        {/* Hero Navbar */}
        <div className="flex items-center justify-between fixed w-full p-4 z-10">
          <div className="flex">
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
        </div>
      </div>

      {/* Telehistory Definition */}
      <div
        className="flex flex-col justify-center items-center"
        style={{ height: "100vh", width: "50vw" }}
      >
        <div className="flex items-center">
          <div style={{ maxWidth: "450px" }}>
            <div className="flex items-center">
              <p className="display-heavy text-white mr-2">
                Tele
                <div
                  className="inline-block align-middle bg-white mx-2"
                  style={{ width: "10px", height: "10px", borderRadius: "50%" }}
                ></div>
                history
              </p>
              <img
                src="/telehistory.png"
                alt="telehistory"
                width={43}
                height={43}
              />
            </div>
            <p className="text-white italic">noun</p>
            <p className="text-white headline-light">
              an app that analyzes the history of your telegram chats through
              data visualization
            </p>
          </div>
        </div>
      </div>

      {/* Hero Graphs */}
      {/* <div className="h-96 absolute top-2/4 inset-x-0 flex overflow-x-scroll">
        <LineChart
          data={transformLineData(lineData)}
          homePage={true}
          showAxisLeft={false}
          showAxisBottom={false}
          enableGridX={false}
          enableGridY={false}
          enableCrosshair={false}
          customMargin={{ top: 40, bottom: 0, left: 10, right: 10 }}
        />
        <CalendarChart
          data={transformCalendarData(calendarData)}
          homePage={true}
          startDate={calendarData.messages[0].date.split("T")[0]}
          endDate={
            calendarData.messages[calendarData.messages.length - 1].date.split(
              "T"
            )[0]
          }
        />
        <PieChart data={pieData} homePage={true} />
      </div> */}
    </>
  );
}
