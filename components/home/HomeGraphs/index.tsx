import React from "react";
import { LineChart, CalendarChart, PieChart } from "@/components/charts";
import lineData from "../../../mockData/mockHomeLine";
import calendarData from "../../../mockData/mockHomeCalendar";
import pieData from "../../../mockData/sentimentRes.js";
import transformLineData from "../../../helpers/lineGraph/transformData";
import transformCalendarData from "../../../helpers/calendarGraph/transformData";
import { useIsMd } from "../../../helpers/helpers";

const HomeGraphs = () => {
  return (
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
            calendarData.messages[calendarData.messages.length - 1].date.split(
              "T"
            )[0]
          }
        />
      </div>
      <div className="h-96 md:absolute" style={{ top: "600px" }}>
        <PieChart data={pieData} homePage={true} />
      </div>
    </div>
  );
};

export default HomeGraphs;
