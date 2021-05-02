import React, { useEffect, useState } from "react";
import { LineChart, CalendarChart, PieChart } from "@/components/charts";
import calendarData from "../../../mockData/mockHomeCalendar";
import pieData from "../../../mockData/sentimentRes.js";
import transformLineData from "../../../helpers/lineGraph/transformData";
import transformCalendarData from "../../../helpers/calendarGraph/transformData";
import { generateGraphData } from "../../../helpers/helpers";
import { useIsMd } from "../../../helpers/helpers";

const HomeGraphs = () => {
  const [mockLineData, setMockLineData] = useState<any>();
  const [mockCalendarData, setMockCalendarData] = useState<any>();

  useEffect(() => {
    setMockLineData(generateGraphData(20, 20));
    setMockCalendarData(generateGraphData(350, 20));
  }, []);

  return (
    <div
      className="flex flex-col relative md:absolute top-72 md:top-0 z-[-1] md:z-0 no-scrollbar"
      style={
        useIsMd()
          ? {
              left: "55vw",
              width: "45vw",
              height: "100vh",
              overflowX: "hidden",
            }
          : { left: 0 }
      }
    >
      <div className="h-96 md:absolute">
        {mockLineData && (
          <LineChart
            data={transformLineData(mockLineData)}
            homePage={true}
            showAxisLeft={false}
            showAxisBottom={false}
            enableGridX={false}
            enableGridY={false}
            enableCrosshair={false}
            customMargin={{ top: 10, bottom: 0, left: 10, right: 10 }}
          />
        )}
      </div>
      <div className="h-96 md:absolute" style={{ top: "300px" }}>
        {mockCalendarData && (
          <CalendarChart
            data={transformCalendarData(mockCalendarData)}
            homePage={true}
            startDate={calendarData.messages[0].date.split("T")[0]}
            endDate={
              calendarData.messages[
                calendarData.messages.length - 1
              ].date.split("T")[0]
            }
          />
        )}
      </div>
      <div className="h-96 md:absolute" style={{ top: "600px" }}>
        <PieChart data={pieData} homePage={true} />
      </div>
    </div>
  );
};

export default HomeGraphs;
