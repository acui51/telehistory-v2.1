import { ResponsiveLine as ResponsiveNivoLine } from "@nivo/line";
import { Line as NormalNivoLine } from "@nivo/line";
import { ChartTooltip } from "../components";

interface IMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

const CustomSymbol = ({
  size,
  color,
  borderWidth,
  borderColor,
}: {
  size: number;
  color: string;
  borderWidth: number;
  borderColor: string;
}) => (
  <g>
    <circle
      fill="#fff"
      r={size / 2}
      strokeWidth={borderWidth}
      stroke={borderColor}
    />
    <circle
      r={size / 5}
      strokeWidth={borderWidth}
      stroke={borderColor}
      fill={color}
      fillOpacity={0.35}
    />
  </g>
);

const LineChart = ({
  data,
  onClick,
  enableGridX = true,
  enableGridY = true,
  showAxisLeft = true,
  showAxisBottom = true,
  enableCrosshair = true,
  customMargin,
  homePage = false,
}: {
  data: any;
  onClick?: (point: any, event: any) => void;
  enableGridX?: boolean;
  enableGridY?: boolean;
  showAxisLeft?: boolean;
  showAxisBottom?: boolean;
  enableCrosshair?: boolean;
  customMargin?: IMargin;
  homePage?: boolean;
}) => {
  return homePage ? (
    // @ts-ignore
    <NormalNivoLine
      width={1300}
      height={300}
      data={data}
      margin={
        customMargin
          ? customMargin
          : { top: 50, right: 110, bottom: 50, left: 60 }
      }
      yScale={{
        type: "linear",
      }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      colors={{ scheme: "category10" }}
      enableCrosshair={enableCrosshair}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      axisTop={null}
      axisRight={null}
      axisBottom={
        showAxisBottom
          ? {
              format: "%b %d",
              tickValues: `every 2 days`,
              legend: "Date",
              legendOffset: 35,
            }
          : false
      }
      axisLeft={
        showAxisLeft
          ? {
              legend: "Messages",
              legendOffset: -45,
            }
          : false
      }
      pointSize={12}
      pointSymbol={CustomSymbol}
      pointColor={{ theme: "background" }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      lineWidth={3}
      useMesh={true}
      onClick={(point, event) => {
        onClick && onClick(point, event);
      }}
      tooltip={({ point }) => {
        return <ChartTooltip point={point} />;
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  ) : (
    // @ts-ignore
    <ResponsiveNivoLine
      data={data}
      margin={
        customMargin
          ? customMargin
          : { top: 50, right: 110, bottom: 50, left: 60 }
      }
      yScale={{
        type: "linear",
      }}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      colors={{ scheme: "category10" }}
      enableCrosshair={enableCrosshair}
      enableGridX={enableGridX}
      enableGridY={enableGridY}
      axisTop={null}
      axisRight={null}
      axisBottom={
        showAxisBottom
          ? {
              format: "%b %d",
              tickValues: `every 2 days`,
              legend: "Date",
              legendOffset: 35,
            }
          : false
      }
      axisLeft={
        showAxisLeft
          ? {
              legend: "Messages",
              legendOffset: -45,
            }
          : false
      }
      pointSize={12}
      pointSymbol={CustomSymbol}
      pointColor={{ theme: "background" }}
      pointBorderWidth={1}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      lineWidth={3}
      useMesh={true}
      onClick={(point, event) => {
        onClick && onClick(point, event);
      }}
      tooltip={({ point }) => {
        return <ChartTooltip point={point} />;
      }}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
