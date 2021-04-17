import { IMessage } from "../types/types";

export const getChatsFromDate = (data: any, date: Date) => {
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

/** Compares month and date and year */
export const isSameDate = (date1: Date, date2: Date) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const extractMessageText = (message: IMessage) => {
  let messageText: string;
  if (message.photo || message.file || message.thumbnail) {
    messageText = "(Non-text message)";
  } else {
    if (message.text.constructor === Array) {
      messageText = message.text[0].text;
    } else {
      messageText = message.text as string;
    }
  }

  return messageText;
};
