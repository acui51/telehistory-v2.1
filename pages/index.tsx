import Head from "next/head";
import Button from "@/ui/Button";
import { LineChart } from "@/components/charts";
import lineData from "../mockData/mockHomeLine";
import transformData from "../helpers/lineGraph/transformData";

export default function Home() {
  return (
    <>
      <div className="p-4 sm:p-8 flex flex-col relative h-screen">
        <Head>
          <title>Telehistory V2</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {/* Hero Navbar */}
        <div className="flex items-center justify-between mb-8 sm:mb-16 md:mb-24">
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            <div className="title-heavy">Telehistory V2</div>
          </div>
          <Button onClickButton={() => console.log("Login")}>
            <p className="text-white text-heavy">Login</p>
          </Button>
        </div>

        {/* Header Box */}
        <div className="flex flex-col items-center self-center elevation-3 rounded-md p-4 sm:p-8 max-w-2xl bg-white">
          <p className="display-heavy text-center mb-8">
            Make the most of your Telegram Chat History
          </p>
          <p className="headline-light text-center mb-8 max-w-md">
            Analyze and chart data from down to a specific day
          </p>
          <Button
            onClickButton={() => console.log("Get Started")}
            className="self-center"
          >
            <div className="flex justify-center items-center">
              <p className="text-white text-heavy">Get Started</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Button>
        </div>
        <div className="h-96 absolute z-[-1] top-2/4 inset-x-0">
          <LineChart
            data={transformData(lineData)}
            showAxisLeft={false}
            showAxisBottom={false}
            enableGridX={false}
            enableGridY={false}
            enableCrosshair={false}
            customMargin={{ top: 0, bottom: 0, left: 0, right: 0 }}
          />
        </div>
      </div>
    </>
  );
}
