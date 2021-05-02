import {
  CalendarMouseHandler,
  ResponsiveCalendar as ResponsiveNivoCalendar,
} from "@nivo/calendar";
import { Calendar as NormalNivoCalendar } from "@nivo/calendar";
import React from "react";

const CalendarGraph: React.FC<{
  data: any;
  startDate: string;
  endDate: string;
  homePage?: boolean;
  width?: number;
  height?: number;
  onClick: CalendarMouseHandler;
}> = ({
  data,
  startDate,
  endDate,
  homePage = false,
  width,
  height,
  onClick,
}) => {
  return homePage ? (
    <NormalNivoCalendar
      width={900}
      height={300}
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
          <div className="bg-gray-50 rounded-md p-1">
            <span style={{ color: "black" }}>{data.value} messages</span>{" "}
            <span style={{ color: "gray" }}>on {data.day}</span>
          </div>
        );
      }}
      onClick={onClick}
    />
  );
};

export default CalendarGraph;
