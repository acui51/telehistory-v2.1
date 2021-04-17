interface ITransformedDataPoint {
  day: string;
  value: number;
}

const transformCalendarData = (data: any) => {
  let datesToMessages: any = {};
  let transformedData: ITransformedDataPoint[] = [];
  const messages = data.messages;

  for (const message of messages) {
    const date = message.date.split("T")[0];
    if (!datesToMessages[date]) {
      datesToMessages[date] = 0;
    }
    datesToMessages[date] += 1;
  }

  for (const date of Object.keys(datesToMessages)) {
    transformedData.push({
      day: date.split("T")[0],
      value: datesToMessages[date],
    });
  }

  return transformedData;
};

export default transformCalendarData;
