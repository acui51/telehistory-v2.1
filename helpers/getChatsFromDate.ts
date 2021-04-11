import { IMessage } from "../types/types";

const getChatsFromDate = (data: any, date: Date) => {
  const messages = data.messages;
  const chatsFromDate = messages.filter((message: IMessage) => {
    const messageDate = new Date(message.date);
    if (
      messageDate.getMonth() === date.getMonth() &&
      messageDate.getDate() === date.getDate() &&
      messageDate.getFullYear() === date.getFullYear()
    ) {
      return message;
    }
  });

  return chatsFromDate;
};

export default getChatsFromDate;
