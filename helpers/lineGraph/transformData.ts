import { IMessage } from "../../types/types";

interface IDateDataPoint {
  x: string;
  y: number;
}

interface ITransformedDataPoint {
  id: string;
  data: IDateDataPoint[];
}

interface ITransformedData {
  [from_id: string]: ITransformedDataPoint;
}

const getDateString = (message: IMessage): string => {
  return message.date.split("T")[0];
};

const transformLineData = (data: any) => {
  let usersSeen = new Set(); // track users seen
  let transformedData = <ITransformedData>{};
  const messages = data.messages;

  for (const message of messages) {
    if (!usersSeen.has(message.from_id)) {
      // Init new user in the object
      transformedData[message.from_id] = {
        id: message.from,
        data: [
          {
            x: getDateString(message),
            y: 1,
          },
        ],
      };
      usersSeen.add(message.from_id);
    } else {
      // Seen user
      const user = transformedData[message.from_id];
      const dateString = getDateString(message);
      if (user.data.some((dataPoint) => dataPoint.x === dateString)) {
        // Increment the messages the user has sent that day
        const index = user.data.findIndex((elem) => elem.x === dateString);
        transformedData[message.from_id].data[index].y += 1;
      } else {
        // Add a new value to the array
        transformedData[message.from_id].data.push({
          x: dateString,
          y: 1,
        });
      }
    }
  }

  return Object.keys(transformedData).map((elem) => transformedData[elem]);
};

export default transformLineData;
