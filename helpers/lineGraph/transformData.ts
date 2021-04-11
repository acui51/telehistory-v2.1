// data={[
//             {
//                 id: 'fake corp. A',
//                 data: [
//                     { x: '2018-01-01', y: 7 },
//                     { x: '2018-01-02', y: 5 },
//                     { x: '2018-01-03', y: 11 },
//                     { x: '2018-01-04', y: 9 },
//                     { x: '2018-01-05', y: 12 },
//                     { x: '2018-01-06', y: 16 },
//                     { x: '2018-01-07', y: 13 },
//                     { x: '2018-01-08', y: 13 },
//                 ],
//             },
//             {
//                 id: 'fake corp. B',
//                 data: [
//                     { x: '2018-01-04', y: 14 },
//                     { x: '2018-01-05', y: 14 },
//                     { x: '2018-01-06', y: 15 },
//                     { x: '2018-01-07', y: 11 },
//                     { x: '2018-01-08', y: 10 },
//                     { x: '2018-01-09', y: 12 },
//                     { x: '2018-01-10', y: 9 },
//                     { x: '2018-01-11', y: 7 },
//                 ],
//             },
//         ]}

interface IMessage {
  id: number;
  type: string;
  date: string;
  from: string;
  from_id: number;
  photo?: string;
  width: number;
  height: number;
  text: string;
}

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

const TransformData = (data: any) => {
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

export default TransformData;
