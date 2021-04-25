import { ResponsivePie as NivoPie } from "@nivo/pie";

const PieChart: React.FC<{ data: any }> = ({ data }) => {
  const transformedData = Object.keys(data.sentiment).map((sentiment) => {
    return {
      id: sentiment,
      label: sentiment,
      value: data.sentiment[sentiment],
      color: "hsl(271, 70%, 50%)",
    };
  });

  return (
    <NivoPie
      data={transformedData}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      colors={{ scheme: "nivo" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
      radialLabelsSkipAngle={10}
      radialLabelsTextColor="#333333"
      radialLabelsLinkColor={{ from: "color" }}
      sliceLabelsSkipAngle={10}
      sliceLabelsTextColor="#333333"
    />
  );
};

export default PieChart;
