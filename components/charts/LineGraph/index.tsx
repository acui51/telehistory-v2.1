import { ResponsiveLine as NivoLine } from "@nivo/line";
import { ChartTooltip } from "../components";

const LineChart = ({
  data,
  onClick,
}: {
  data: any;
  onClick: (point: any, event: any) => void;
}) => (
  <NivoLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    yScale={{
      type: "linear",
      stacked: true,
    }}
    xScale={{
      type: "time",
      format: "%Y-%m-%d",
      useUTC: false,
      precision: "day",
    }}
    xFormat="time:%Y-%m-%d"
    axisTop={null}
    axisRight={null}
    axisBottom={{
      format: "%b %d",
      tickValues: "every 2 days",
      legend: "Date",
      legendOffset: 35,
    }}
    axisLeft={{
      legend: "Messages",
      legendOffset: -45,
    }}
    pointSize={8}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    onClick={(point, event) => {
      onClick(point, event);
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

export default LineChart;
