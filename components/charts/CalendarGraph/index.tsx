import { ResponsiveCalendar as ResponsiveNivoCalendar } from "@nivo/calendar";
import { Calendar as NormalNivoCalendar } from "@nivo/calendar";
import React from "react";

const CalendarGraph: React.FC<{
  data: any;
  startDate: string;
  endDate: string;
  homePage?: boolean;
  width?: number;
  height?: number;
}> = ({ data, startDate, endDate, homePage = false, width, height }) => {
  return homePage ? (
    <NormalNivoCalendar
      width={900}
      height={300}
      data={data}
      from={startDate}
      to={endDate}
      emptyColor="#eeeeee"
      // colors={["#9BE9A8", "#3FC463", "#31A14D", "#216E39"]}
      colors={["#9ECAE1", "#6BAED6", "#4292C6", "#0088cc"]}
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
    />
  ) : (
    <ResponsiveNivoCalendar
      data={data}
      from={startDate}
      to={endDate}
      emptyColor="#eeeeee"
      colors={["#9ECAE1", "#6BAED6", "#4292C6", "#0088cc"]}
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
    />
  );
};

export default CalendarGraph;
