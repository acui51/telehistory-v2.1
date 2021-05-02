import React from "react";

const ChartTooltip: React.FC<{
  point: any;
}> = ({ point }) => {
  return (
    <div className="flex flex-col items-center bg-gray-50 p-1 rounded-md">
      <div className="flex items-center">
        <div
          style={{ backgroundColor: point.serieColor }}
          className="h-3 mr-1 w-3"
        />
        <div>{`${point.serieId}: ${point.data.y}`}</div>
      </div>
      <div>{point.data.xFormatted}</div>
    </div>
  );
};

export default ChartTooltip;
