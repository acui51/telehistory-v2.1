import {
  ResponsiveCalendar as NivoCalendar,
  ResponsiveCalendar,
} from "@nivo/calendar";
import React from "react";

const CalendarGraph: React.FC<{
  data: any;
  startDate: string;
  endDate: string;
}> = ({ data, startDate, endDate }) => {
  return (
    <NivoCalendar
      data={data}
      from={startDate}
      to={endDate}
      emptyColor="#eeeeee"
      colors={["#9BE9A8", "#3FC463", "#31A14D", "#216E39"]}
      margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
      yearSpacing={40}
      monthBorderColor="#ffffff"
      dayBorderWidth={2}
      dayBorderColor="#ffffff"
      tooltip={(data) => {
        if (data.value === undefined) return null;
        return (
          <div
            style={{
              backgroundColor: "black",
              padding: "10px",
              borderRadius: 4,
            }}
          >
            <span style={{ color: "white" }}>{data.value} messages</span>{" "}
            <span style={{ color: "gray" }}>on {data.day}</span>
          </div>
        );
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "row",
          translateY: 36,
          itemCount: 4,
          itemWidth: 42,
          itemHeight: 36,
          itemsSpacing: 14,
          itemDirection: "right-to-left",
        },
      ]}
    />
  );
};

export default CalendarGraph;
