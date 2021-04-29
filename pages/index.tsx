import Head from "next/head";
import { LineChart, CalendarChart, PieChart } from "@/components/charts";
import lineData from "../mockData/mockHomeLine";
import calendarData from "../mockData/mockHomeCalendar";
import pieData from "../mockData/sentimentRes.js";
import transformLineData from "../helpers/lineGraph/transformData";
import transformCalendarData from "../helpers/calendarGraph/transformData";
import { useIsMd } from "../helpers/helpers";

export default function Home() {
  return (
    <>
      <Head>
        <title>Telehistory V2</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Hero Blue Ellipse */}
      <div className="relative">
        {useIsMd() ? (
          <div
            className="bg-brand fixed z-[-1]"
            style={{
              width: "100vw",
              height: "100vw",
              borderRadius: "50%",
              left: "50%",
              top: "50%",
              transform: `translate(-97%, -50%)`,
            }}
          ></div>
        ) : (
          <div
            className="bg-brand fixed z-[-1]"
            style={{
              width: "100vw",
              height: "35vh",
            }}
          ></div>
        )}

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
      <div className="flex-col md:flex">
        <div
          className="flex flex-col justify-center items-center"
          style={{
            height: useIsMd() ? "100vh" : "100%",
            width: useIsMd() ? "55vw" : "100%",
          }}
        >
          <div className="flex items-center fixed mt-72 md:mt-0">
            <div style={{ maxWidth: "450px" }}>
              <div className="flex items-center">
                <p className="display-heavy text-white mr-2">
                  Tele
                  <div
                    className="inline-block align-middle bg-white mx-2"
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                    }}
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

        {/* Graphs */}
        <div
          className="flex flex-col relative md:absolute top-72 md:top-0 z-[-1]"
          style={useIsMd() ? { left: "55vw" } : { left: 0 }}
        >
          <div className="h-96 md:absolute">
            <LineChart
              data={transformLineData(lineData)}
              homePage={true}
              showAxisLeft={false}
              showAxisBottom={false}
              enableGridX={false}
              enableGridY={false}
              enableCrosshair={false}
              customMargin={{ top: 10, bottom: 0, left: 10, right: 10 }}
            />
          </div>
          <div className="h-96 md:absolute" style={{ top: "300px" }}>
            <CalendarChart
              data={transformCalendarData(calendarData)}
              homePage={true}
              startDate={calendarData.messages[0].date.split("T")[0]}
              endDate={
                calendarData.messages[
                  calendarData.messages.length - 1
                ].date.split("T")[0]
              }
            />
          </div>
          <div className="h-96 md:absolute" style={{ top: "600px" }}>
            <PieChart data={pieData} homePage={true} />
          </div>
        </div>

        {/* <div className="flex flex-col relative top-72 md:top-0">Hi</div> */}
      </div>
    </>
  );
}
