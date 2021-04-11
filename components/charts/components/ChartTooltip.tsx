import React from "react";

const ChartTooltip: React.FC<{
  point: any;
}> = ({ point }) => {
  return (
    <div className="rounded-md flex items-center bg-gray-50 p-1">
      <div
        style={{ backgroundColor: point.serieColor }}
        className="h-3 mr-1 w-3"
      />
      <p>{`${point.serieId}: ${point.data.y}`}</p>
    </div>
  );
};

export default ChartTooltip;
